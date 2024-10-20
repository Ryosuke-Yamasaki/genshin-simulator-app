"use client";

import { ColumnDef, FilterFnOption } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import DataTableSubStatusSortOption from "./data-table-sub-status-sort-option";
import { cn } from "@/lib/utils";
import { subStatuses } from "@/app/constants/artifact";
import { Artifacter, SubOption } from "@/lib/db/artifact/type";

const multiSelectFilter: FilterFnOption<Artifacter> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue.length) return true;
  const rowValue = row.getValue(columnId);
  return !!filterValue.find((option) => option === rowValue);
};

export const columns: ColumnDef<Artifacter>[] = [
  {
    accessorKey: "id",
    header: "artifacterId",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "artifact",
    accessorFn: (row) => row.artifact.nameJp,
    header: "名前",
    enableSorting: false,
  },
  {
    id: "artifactSet",
    accessorFn: (row) => row.artifact.set.nameJp,
    header: "artifactSet",
    enableSorting: false,
    enableHiding: false,
    filterFn: multiSelectFilter,
  },
  {
    id: "artifactType",
    accessorFn: (row) => row.artifact.type.nameJp,
    header: "部位",
    enableSorting: false,
    filterFn: multiSelectFilter,
  },
  {
    id: "mainOption",
    accessorFn: (row) => row.mainOption.mainStatus.nameJp,
    header: "メインオプション",
    enableSorting: false,
    filterFn: multiSelectFilter,
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="pl-0 py-0"
      >
        スコア
        {column.getIsSorted() === "desc" ? (
          <CaretDownIcon className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <CaretUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const score = parseFloat(row.getValue("score"));

      return <div>{score.toFixed(1)}</div>;
    },
  },
  {
    id: "subOptions",
    accessorFn: (row) => row.subOptions,
    header: ({ table }) => <DataTableSubStatusSortOption table={table} />,
    cell: ({ row, table }) => {
      const subOptions = row.getValue("subOptions") as SubOption[];
      const cleanedSubOptions = subOptions.map((option) => ({
        ...option,
        value: option.subStatus.isPercentage
          ? `${(option.value * 100).toFixed(1)}%`
          : option.value,
      }));

      return (
        <div className="grid grid-cols-4 gap-4">
          {cleanedSubOptions.map((option) => (
            <div key={option.id} className="flex space-x-1">
              <Image
                src={`https://ayuqpemrfahcziukatay.supabase.co/storage/v1/object/public/image/status/status_${option.subStatusId}.png`}
                alt="statusIcon"
                width={32}
                height={32}
                className="bg-black rounded-sm items-center w-5 h-5"
              />
              <div
                className={cn(
                  table
                    .getState()
                    .sorting.find((sort) =>
                      sort.id.includes(option.subStatus.nameJp)
                    ) && "font-semibold underline"
                )}
              >
                {option.value}
              </div>
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  ...subStatuses.map((stat) => ({
    id: stat.nameJp,
    accessorFn: (row: Artifacter) => {
      const subOption = row.subOptions.find(
        (option) => option.subStatusId === Number(stat.id)
      );

      return subOption ? subOption.value : 0;
    },
    header: stat.nameJp,
    enableHiding: false,
  })),
];
