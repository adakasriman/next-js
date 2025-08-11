import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma"
import { requireAuth } from '@/lib/requireAuth';
import { handleApiError } from '@/lib/handleApiError';
import { parseUpload } from '@/lib/parseUpload';

export const GET = requireAuth(async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const total = await prisma.properties.count();
        const data = await prisma.properties.findMany({
            skip,
            take: limit,
        })
        const serializedProperties = data.map(property => ({
            ...property,
            total_documents_size_bytes: property.total_documents_size_bytes.toString(),
            allowed_documents_size_bytes: property.allowed_documents_size_bytes.toString()
        }));
        return NextResponse.json({
            success: true,
            data: serializedProperties,
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
            if (!item.name || !item.city || !item.state || !item.pincode) {
                throw new Error('Missing required field: name or city or state or pincode')
            }
            return item;
        })

        const result = await prisma.properties.createMany({
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

