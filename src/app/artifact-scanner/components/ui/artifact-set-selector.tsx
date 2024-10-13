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
import { FC, useRef } from "react";
import FormLabel from "./form-label";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  artifactSetDataState,
  filteredArtifactSetsState,
  qualityFilterState,
} from "../../state";
import { Input } from "@/components/ui/input";
import {
  FieldMetadata,
  unstable_useControl as useControl,
} from "@conform-to/react";

interface ArtifactSetSelectorProps {
  metaSetId: FieldMetadata<string>;
  metaQuality: FieldMetadata<string>;
}

const ArtifactSetSelector: FC<ArtifactSetSelectorProps> = ({
  metaSetId,
  metaQuality,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const controlSetId = useControl(metaSetId);
  const controlQuality = useControl(metaQuality);

  const [qualityFilter, setQualityFilter] = useRecoilState(qualityFilterState);

  const artifactSets = useRecoilValue(artifactSetDataState);
  const filteredArtifactSets = useRecoilValue(filteredArtifactSetsState);

  return (
    <div>
      <Input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        ref={controlSetId.register}
        name={metaSetId.name}
        defaultValue={metaSetId.initialValue}
        onFocus={() => {
          triggerRef.current?.focus();
        }}
      />
      <Input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        ref={controlQuality.register}
        name={metaQuality.name}
        defaultValue={metaQuality.initialValue}
        onFocus={() => {
          triggerRef.current?.focus();
        }}
      />
      <FormLabel htmlFor={metaSetId.id} labelName="セット効果" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            className="w-full mt-1 justify-between"
          >
            {controlSetId.value
              ? artifactSets.find((set) => set.id === controlSetId.value)
                  ?.nameJp
              : "セット効果の選択"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[398px] p-0">
          <Command>
            <CommandList className="overscroll-none">
              <div className="px-2 py-1.5">
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  size="sm"
                  value={qualityFilter}
                  onValueChange={setQualityFilter}
                >
                  <ToggleGroupItem value="4" aria-label="Toggle 4">
                    星4
                  </ToggleGroupItem>
                  <ToggleGroupItem value="5" aria-label="Toggle 5">
                    星5
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <CommandSeparator />
              {filteredArtifactSets.length === 0 && (
                <CommandEmpty>セット効果がありません</CommandEmpty>
              )}
              {["4", "5"].map(
                (quality) =>
                  qualityFilter.includes(quality) && (
                    <CommandGroup key={quality} heading={`星${quality}`}>
                      {filteredArtifactSets
                        .filter((set) => set.quality === quality)
                        .map((set) => (
                          <CommandItem
                            key={set.id}
                            value={set.id}
                            onSelect={() => {
                              controlSetId.change(set.id);
                              controlQuality.change(set.quality);
                            }}
                          >
                            {set.nameJp}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                controlSetId.value === set.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ArtifactSetSelector;
