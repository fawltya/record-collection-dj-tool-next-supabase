"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditRecord } from "@/components/ui/edit-record";
import { CollectionHeaders } from "./table-header";
import { RecordPagination } from "@/components/record-pagination";
import { useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import RecordCard from "@/components/ui/card-view";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<CollectionHeaders, any>[];
  data: CollectionHeaders[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleSort = (columnKey: string) => {
    const column = table.getColumn(columnKey);
    if (column) {
      setSorting((old) => [
        ...old,
        { id: columnKey, desc: column.getIsSorted() !== "desc" },
      ]);
    }
  };
  useEffect(() => {
    console.log("Current Sorting State: ", sorting); // Debugging line
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (isMobile) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Sort by</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSort("song_title")}>
              Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("bpm")}>
              BPM
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("key")}>
              Key
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("rating")}>
              Rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {data.map((record) => (
          <RecordCard key={record.uuid} data={record} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="text-center">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <EditRecord recordId={row.original.uuid} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <RecordPagination table={table} />
    </div>
  );
}
