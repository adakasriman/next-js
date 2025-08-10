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
  currentPage: number
  onPageChange: (newPage: number) => void
}

export function DataTable<T extends Record<string, any>>({
  headers,
  items,
  pageSize,
  currentPage,
  onPageChange,
}: DataTableProps<T>) {
  const totalPages = Math.ceil(items.length / pageSize)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = items.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    onPageChange(Math.max(currentPage - 1, 0))
  }

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages - 1))
  }

  const handleFirstPage = () => {
    onPageChange(0)
  }

  const handleLastPage = () => {
    onPageChange(totalPages - 1)
  }

  return (
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
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, idx) => (
                <TableRow key={startIndex + idx}>
                  {headers.map(({ accessorKey }) => (
                    <TableCell key={`${startIndex + idx}-${accessorKey}`}>
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

      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Showing {items.length === 0 ? 0 : startIndex + 1}-
          {Math.min(endIndex, items.length)} of {items.length} items
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFirstPage}
            disabled={currentPage === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLastPage}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
