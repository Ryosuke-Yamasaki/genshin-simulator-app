"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Artfiacter } from "../types/prisma";
import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";

export const columns: ColumnDef<Artfiacter>[] = [
  { accessorKey: "id", header: "id" },
  {
    id: "artifact",
    accessorFn: (row) => row.artifact.nameJp,
    header: "artifact",
  },
  {
    id: "artifactSet",
    accessorFn: (row) => row.artifact.set.nameJp,
    header: "artifactSet",
  },
  {
    id: "artifactType",
    accessorFn: (row) => row.artifact.type.nameJp,
    header: "artifactType",
  },
  {
    id: "mainOption",
    accessorFn: (row) => row.mainOption.nameJp,
    header: "mainOption",
  },
  {
    id: "subOptions",
    accessorFn: (row) =>
      row.subOptions
        .map((option) => {
          const attribute = ["%", "実数"].some((keyword) =>
            option.subStatus.nameJp.includes(keyword)
          )
            ? option.subStatus.nameJp.replace(/%|実数/g, "").trim()
            : option.subStatus.nameJp;

          const value = option.subStatus.isPercentage
            ? `${(Number(option.value) * 100).toFixed(1)}%`
            : option.value;

          return `${attribute}+${value}`;
        })
        .join(", "),
    header: "subOptions",
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        score
        {column.getIsSorted() === "desc" ? (
          <CaretDownIcon className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <CaretUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
  },
];
