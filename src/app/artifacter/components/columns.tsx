"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Artfiacter } from "../types/prisma";

export const columns: ColumnDef<Artfiacter>[] = [
  { accessorKey: "id", header: "id" },
  { accessorKey: "score", header: "score" },
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
];
