import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma"
import { requireAuth } from '@/lib/requireAuth';
import { parseUpload } from '@/lib/parseUpload';
import { handleApiError } from '@/lib/handleApiError';

export const GET = requireAuth(async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const total = await prisma.users.count();

    const data = await prisma.users.findMany({
      skip,
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: data,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      }
    });

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
});

export const POST = requireAuth(async (req: Request, user: any) => {
  const { data, error } = await parseUpload(req);

  if (error) {
    return Response.json({ error: error }, { status: 400 });
  }

  try {
    const jsonData = data as any[];

    const emailCountMap = new Map<string, number>();
    const fileDuplicates: string[] = [];

    jsonData.forEach((item: any) => {
      if (item.email) {
        const count = emailCountMap.get(item.email) || 0;
        emailCountMap.set(item.email, count + 1);
        if (count > 0) {
          fileDuplicates.push(item.email);
        }
      }
    });

    if (fileDuplicates.length > 0) {
      return Response.json(
        {
          error: 'Duplicate emails found in uploaded file',
          duplicates: [...new Set(fileDuplicates)],
        },
        { status: 400 }
      );
    }

    const emailsToCheck = jsonData
      .map((item: any) => item.email)
      .filter(Boolean);

    const existingUsers = await prisma.users.findMany({
      where: {
        email: { in: emailsToCheck },
      },
      select: { email: true },
    });

    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map(user => user.email);
      return Response.json(
        {
          error: 'Some emails are already exist',
          existingEmails,
        },
        { status: 409 }
      );
    }

    const createData = jsonData.map((item: any) => {
      if (!item.email) {
        throw new Error('Missing required field: email');
      }
      item.phone_number = item.phone_number ? item.phone_number.toString() : null;
      item.secondary_phone_number = item.secondary_phone_number ? item.secondary_phone_number.toString() : null;
      return item;
    });

    const result = await prisma.users.createMany({
      data: createData,
    });

    return Response.json({
      success: true,
      created: result.count,
      skipped: jsonData.length - result.count,
    });
  } catch (error) {
    return handleApiError(error, 'Failed to process file');
  }
});

