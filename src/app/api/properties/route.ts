import { NextResponse, NextRequest } from 'next/server'
import { withAuth } from "@workos-inc/authkit-nextjs"
import { prisma } from "@/lib/prisma"
import * as XLSX from 'xlsx';

export async function GET(req: Request) {
    try {
        const { user } = await withAuth({ ensureSignedIn: true })
        console.log("Authenticated user:", user)

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const data = await prisma.property.findMany()
        return NextResponse.json({
            success: true,
            data: data
        })

    } catch (error: any) {
        console.error("API error:", error)
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        )
    }
}
// Maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {

    const { user } = await withAuth({ ensureSignedIn: true })
    console.log("Authenticated user:", user)

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
        return Response.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv', // .csv
    ]

    if (!allowedTypes.includes(file.type)) {
        return Response.json(
            { error: 'Invalid file type. Please upload .xlsx, .xls, or .csv' },
            { status: 400 }
        )
    }


    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        return Response.json(
            { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
            { status: 400 }
        )
    }

    try {
        // Parse file
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const workbook = XLSX.read(buffer, { type: 'buffer' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(sheet)

        // Validate and transform data
        const createData = jsonData.map((item: any) => {
            // Basic validation - customize based on your schema
            if (!item.unit_number) {
                throw new Error('Missing required field: unit_number')
            }
            return item;
        })

        // Insert data
        const result = await prisma.property.createMany({
            data: createData
        })

        return Response.json({
            success: true,
            created: result,
        })
    } catch (error) {
        console.error('File processing error:', error)

        let errorMessage = 'Failed to process file'
        if (error instanceof Error) {
            errorMessage = error.message
        }

        return Response.json(
            { error: errorMessage },
            { status: error instanceof Error && error.message.includes('Missing required field') ? 400 : 500 }
        )
    }
}

