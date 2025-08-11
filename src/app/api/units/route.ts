import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma"
import { handleApiError } from '@/lib/handleApiError';
import { requireAuth } from '@/lib/requireAuth';
import { parseUpload } from '@/lib/parseUpload';

export const GET = requireAuth(async (req: Request) => {    
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const total = await prisma.units.count();

        const data = await prisma.units.findMany({
            skip,
            take: limit,
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
            if (!item.owner_id || !item.property_id || !item.unit_number_or_name) {
                throw new Error('Missing required field: owner_id or property_id or unit_number_or_name')
            }
            return item;
        })

        const result = await prisma.units.createMany({
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

