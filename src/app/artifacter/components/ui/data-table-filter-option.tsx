import { Table } from "@tanstack/react-table";
import { DataTableFilterSelector } from "./data-table-filter-selector";
import { Artifacter } from "../../types/prisma";
import { Button } from "@/components/ui/button";

interface DataTableFilterOptionProps<TData> {
  table: Table<TData>;
  data: TData[];
}

const DataTableFilterOption = <TData,>({
  table,
  data,
}: DataTableFilterOptionProps<TData>) => {
  const artifacters = data as Artifacter[];
  const artifactSets = Array.from(
    new Map(
      artifacters.map((artifacter) => [
        artifacter.artifact.setId,
        artifacter.artifact.set,
      ])
    ).values()
  );
  const artifactSetsOption = artifactSets
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map(({ nameJp }) => {
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
  const artifactTypesOption = artifactTypes
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map(({ nameJp }) => {
      return { value: nameJp, label: nameJp };
    });
  const artifactMainStatuses = Array.from(
    new Map(
      artifacters.map((artifacter) => [
        artifacter.mainOptionId,
        artifacter.mainOption.mainStatus,
      ])
    ).values()
  );
  const artifactMainStatusesOption = artifactMainStatuses
    .sort((a, b) => a.id - b.id)
    .map(({ nameJp }) => {
      return { value: nameJp, label: nameJp };
    });

  return (
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
  );
};

export default DataTableFilterOption;
