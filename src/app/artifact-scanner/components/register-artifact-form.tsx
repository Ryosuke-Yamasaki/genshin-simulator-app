"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import FormWrapper from "./form-wrapper";
import FormLabel from "./ui/form-label";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ArtifactSetSelector from "./ui/artifact-set-selector";

interface RegisterArtifactFromProps {
  artifactSets: artifactSet[];
}

const RegisterArtifactFrom: FC<RegisterArtifactFromProps> = ({
  artifactSets,
}) => {
  console.log(artifactSets);

  const equippedParts = ["Flower", "Plume", "Sands", "Goblet", "Circlet"];
  const attributes = [
    "HP",
    "ATK",
    "DEF",
    "Elemental Mastery",
    "Energy Recharge",
    "CRIT Rate",
    "CRIT DMG",
  ];

  const [subStats, setSubStats] = useState(
    Array(4).fill({ attribute: "", value: "" })
  );

  const handleSubStatChange = (
    index: number,
    field: "attribute" | "value",
    value: string | number
  ) => {
    const newSubStats = [...subStats];
    newSubStats[index] = { ...newSubStats[index], [field]: value };
    setSubStats(newSubStats);
  };

  return (
    <FormWrapper formTitle="聖遺物の登録">
      <form className="space-y-4">
        <div>
          <ArtifactSetSelector artifactSets={artifactSets} />
        </div>
        <div>
          <FormLabel htmlFor="equippedPart" labelName="装備部位" />
          <Select>
            <SelectTrigger id="equippedPart">
              <SelectValue placeholder="Select equipped part" />
            </SelectTrigger>
            <SelectContent>
              {equippedParts.map((part) => (
                <SelectItem key={part} value={part}>
                  {part}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FormLabel htmlFor="mainAttribute" labelName="メインオプション" />
          <Select>
            <SelectTrigger id="mainAttribute">
              <SelectValue placeholder="Select main attribute" />
            </SelectTrigger>
            <SelectContent>
              {attributes.map((attr) => (
                <SelectItem key={attr} value={attr}>
                  {attr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FormLabel labelName="サブオプション" />
          {subStats.map((subStat, index) => (
            <div key={index} className="flex space-x-2">
              <Select
                onValueChange={(value) =>
                  handleSubStatChange(index, "attribute", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Sub Attribute ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {attributes.map((attr) => (
                    <SelectItem key={attr} value={attr}>
                      {attr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Value"
                value={subStat.value}
                onChange={(e) =>
                  handleSubStatChange(index, "value", e.target.value)
                }
                className="w-24"
              />
            </div>
          ))}
        </div>
        <CardFooter className="px-0 pt-6">
          <Button type="submit" className="w-full">
            Register Artifact
          </Button>
        </CardFooter>
      </form>
    </FormWrapper>
  );
};

export default RegisterArtifactFrom;
