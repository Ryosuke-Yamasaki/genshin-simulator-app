"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./ui/data-table-pagination";
import { useState } from "react";
import { DataTableFilterSelector } from "./ui/data-table-filter-selector";
import { Button } from "@/components/ui/button";
import { Artifacter } from "../types/prisma";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "score", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const artifacters = data as Artifacter[];
  const artifactSets = Array.from(
    new Map(
      artifacters.map((artifacter) => [
        artifacter.artifact.setId,
        artifacter.artifact.set,
      ])
    ).values()
  );
  const artifactSetsOption = artifactSets.map(({ nameJp }) => {
    return { value: nameJp, label: nameJp };
  });
  const artifactTypes = Array.from(
    new Map(
      artifacters.map((artifacter) => [
        artifacter.artifact.typeId,
        artifacter.artifact.type,
      ])
    ).values()
  );
  const artifactTypesOption = artifactTypes.map(({ nameJp }) => {
    return { value: nameJp, label: nameJp };
  });
  const artifactMainStatuses = Array.from(
    new Map(
      artifacters.map((artifacter) => [
        artifacter.mainOptionId,
        artifacter.mainOption,
      ])
    ).values()
  );
  const artifactMainStatusesOption = artifactMainStatuses.map(({ nameJp }) => {
    return { value: nameJp, label: nameJp };
  });

  return (
    <div className="space-y-2">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("artifactSet") && (
          <DataTableFilterSelector
            column={table.getColumn("artifactSet")}
            title="セット効果"
            options={artifactSetsOption}
          />
        )}
        {table.getColumn("artifactType") && (
          <DataTableFilterSelector
            column={table.getColumn("artifactType")}
            title="部位"
            options={artifactTypesOption}
          />
        )}
        {table.getColumn("mainOption") && (
          <DataTableFilterSelector
            column={table.getColumn("mainOption")}
            title="メインオプション"
            options={artifactMainStatusesOption}
          />
        )}
        {table.getState().columnFilters.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            リセット
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>#</TableHead>
                {headerGroup.headers
                  .filter((header) => header.column.getCanHide() === true)
                  .map((header) => {
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  <TableCell>{index + 1}</TableCell>
                  {row
                    .getVisibleCells()
                    .filter((cell) => cell.column.getCanHide() === true)
                    .map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
