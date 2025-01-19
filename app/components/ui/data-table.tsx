"use client";

import { ReactNode, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Column<T> {
  header: string | JSX.Element | (() => JSX.Element);
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  rowClassName?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeOptions?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  rowClassName,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  showPageSizeOptions = true,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {typeof column.header === "function" ? column.header() : column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={`${rowClassName || ""} ${onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.className}>
                      {column.cell ? column.cell(item) : column.accessorKey ? String((item[column.accessorKey] as string | number) || "-") : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">페이지당 행:</p>
            {showPageSizeOptions && (
              <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-sm font-medium">{`${startIndex + 1}-${Math.min(endIndex, data.length)} / ${data.length}`}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => goToPage(1)} disabled={currentPage === 1}>
            <span className="sr-only">첫 페이지로 이동</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <span className="sr-only">이전 페이지로 이동</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <span className="sr-only">다음 페이지로 이동</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
            <span className="sr-only">마지막 페이지로 이동</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
