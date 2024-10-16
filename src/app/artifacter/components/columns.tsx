"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Artfiacter } from "../types/prisma";

export const columns: ColumnDef<Artfiacter>[] = [
  { accessorKey: "id", header: "id" },
  { accessorKey: "score", header: "score" },
  { accessorFn: (row) => row.artifact.nameJp, header: "artifact" },
  { accessorFn: (row) => row.artifact.set.nameJp, header: "artifactType" },
  { accessorFn: (row) => row.mainOption.nameJp, header: "mainOption" },
  { accessorFn: (row) => row.subOptions, header: "subOptions" },
];
