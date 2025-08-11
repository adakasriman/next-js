import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma"
import * as XLSX from 'xlsx';
import { requireAuth } from '@/lib/requireAuth';
import { parseUpload } from '@/lib/parseUpload';
import { handleApiError } from '@/lib/handleApiError';

export const GET = requireAuth(async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Get total count of users (for pagination metadata)
        const total = await prisma.propertyManagerAssignments.count();

        const data = await prisma.propertyManagerAssignments.findMany({
            skip,
            take: limit,
            include: {
                user: true
            }
        })
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
        })

    } catch (error: any) {
        console.error("API error:", error)
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        )
    }
});

export const POST = requireAuth(async (req: NextRequest) => {

    const { data, error } = await parseUpload(req);

    if (error) {
        return Response.json({ error: error }, { status: 400 });
    }

    try {
        const jsonData = data as any[];

        const createData = jsonData.map((item: any) => {
            if (!item.property_id || !item.user_id) {
                throw new Error('Missing required field: assignment_id or property_id or user_id')
            }
            return item;
        })

        const result = await prisma.propertyManagerAssignments.createMany({
            data: createData
        })

        return Response.json({
            success: true,
            created: result,
        })
    } catch (error) {
        return handleApiError(error, 'Failed to process file');
    }
});

