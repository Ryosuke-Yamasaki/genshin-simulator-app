import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import FormLabel from "./form-label";

interface ArtifactSetSelectorProps {
  artifactSets: artifactSet[];
}

const ArtifactSetSelector: FC<ArtifactSetSelectorProps> = ({
  artifactSets,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [qualityFilter, setQualityFilter] = useState<string[]>(["5"]);

  return (
    <div>
      <FormLabel htmlFor="artifactSet" labelName="セット効果" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full mt-1 justify-between"
          >
            {value
              ? artifactSets.find((set) => set.id === value)?.nameJp
              : "セット効果の選択"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[398px] p-0">
          <Command>
            <CommandList>
              <div className="px-2 py-1.5">
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  size="sm"
                  defaultValue={["5"]}
                  onValueChange={(value) => setQualityFilter(value)}
                >
                  <ToggleGroupItem value="4" aria-label="Toggle 4">
                    星4
                  </ToggleGroupItem>
                  <ToggleGroupItem value="5" aria-label="Toggle 5">
                    星5
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              {qualityFilter.length === 0 && (
                <CommandEmpty>セット効果がありません</CommandEmpty>
              )}
              {qualityFilter.includes("4") && (
                <CommandGroup heading="星4">
                  {artifactSets
                    .filter((set) => set.quality === 4)
                    .map((set) => (
                      <CommandItem
                        key={set.id}
                        value={set.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {set.nameJp}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === set.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
              <CommandSeparator />
              {qualityFilter.includes("5") && (
                <CommandGroup heading="星5">
                  {artifactSets
                    .filter((set) => set.quality === 5)
                    .map((set) => (
                      <CommandItem
                        key={set.id}
                        value={set.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {set.nameJp}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === set.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ArtifactSetSelector;
