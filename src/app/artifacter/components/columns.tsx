"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Artfiacter, subOption } from "../types/prisma";
import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export const columns: ColumnDef<Artfiacter>[] = [
  { accessorKey: "id", header: "id" },
  {
    id: "artifact",
    accessorFn: (row) => row.artifact.nameJp,
    header: "名前",
  },
  {
    id: "artifactSet",
    accessorFn: (row) => row.artifact.set.nameJp,
    header: "artifactSet",
  },
  {
    id: "artifactType",
    accessorFn: (row) => row.artifact.type.nameJp,
    header: "部位",
  },
  {
    id: "mainOption",
    accessorFn: (row) => row.mainOption.nameJp,
    header: "メインオプション",
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0"
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
  },
  {
    id: "subOptions",
    accessorFn: (row) => row.subOptions,
    header: "サブオプション",
    cell: ({ row }) => {
      const subOptions = row.getValue("subOptions") as subOption[];
      return (
        <div className="grid grid-cols-4 gap-4">
          {subOptions.map((option) => (
            <div key={option.id} className="flex space-x-1">
              <Image
                src={`https://ayuqpemrfahcziukatay.supabase.co/storage/v1/object/public/image/status/status_${option.subStatusId}.png`}
                alt="statusIcon"
                width={32}
                height={32}
                className="bg-black rounded-sm items-center w-5 h-5"
              />
              <div>
                {option.subStatus.isPercentage
                  ? `${(Number(option.value) * 100).toFixed(1)}%`
                  : option.value.toString()}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
];
