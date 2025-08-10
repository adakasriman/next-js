"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

interface Header {
    header: string
    accessorKey: string
}

interface DataTableProps<T> {
    headers: Header[]
    items: T[]
    pageSize: number
    totalCount: number
    totalPages: number
    currentPage: number
    onPageChange: (newPage: number) => void
}

export function DataTable<T extends Record<string, any>>({
    headers,
    items,
    pageSize,
    totalPages,
    totalCount,
    currentPage,
    onPageChange,
}: DataTableProps<T>) {

    const handlePreviousPage = () => {
        onPageChange(currentPage - 1)
    }

    const handleNextPage = () => {
        onPageChange(currentPage + 1)
    }

    const handleFirstPage = () => {
        onPageChange(1)
    }

    const handleLastPage = () => {
        onPageChange(totalPages)
    }

    return (
        <div>
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {headers.map(({ header }) => (
                                    <TableHead key={header}>{header}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length > 0 ? (
                                items.map((item, idx) => (
                                    <TableRow key={idx}>
                                        {headers.map(({ accessorKey }) => (
                                            <TableCell key={`${idx}-${accessorKey}`}>
                                                {item[accessorKey] ?? "-"}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={headers.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-between px-4 py-2">
                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * pageSize + 1}-
                    {(currentPage - 1) * pageSize + items.length} of {totalCount} items
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
