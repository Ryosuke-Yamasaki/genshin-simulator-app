import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTableSubStatusSortOptionProps<TData> {
  table: Table<TData>;
}

const DataTableSubStatusSortOption = <TData,>({
  table,
}: DataTableSubStatusSortOptionProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-0 py-0">
          サブオプション
          <CaretDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" &&
              column.getCanSort() &&
              !(column.id === "score")
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              onCheckedChange={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
              onSelect={(e) => e.preventDefault()}
              className="flex justify-between p-2"
            >
              <div>{column.id}</div>
              <div>
                {column.getIsSorted() === "desc" ? (
                  <CaretDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                  <CaretUpIcon className="ml-2 h-4 w-4" />
                ) : (
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                )}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableSubStatusSortOption;
