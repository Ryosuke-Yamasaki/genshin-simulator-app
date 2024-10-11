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
import FormWrapper from "./form-wrapper";
import FormLabel from "./ui/form-label";
import ArtifactSetSelector from "./ui/artifact-set-selector";
import {
  artifactTypes,
  mainStatuses,
  subStatuses,
} from "../data/artifact-data";
import { useRecoilState } from "recoil";
import { registerArtifactDataState } from "../state";

interface RegisterArtifactFromProps {
  artifactSets: artifactSet[];
}

const RegisterArtifactFrom: FC<RegisterArtifactFromProps> = ({
  artifactSets,
}) => {
  const [regiterArtifactData, setRegisterArtifactData] = useRecoilState(
    registerArtifactDataState
  );

  console.log(regiterArtifactData);

  const handleSubOptionChange = (
    index: number,
    field: "attribute" | "value",
    value: string
  ) => {
    const newSubOptions = [...regiterArtifactData.subOptions];
    newSubOptions[index] = { ...newSubOptions[index], [field]: value };
    setRegisterArtifactData({
      ...regiterArtifactData,
      subOptions: newSubOptions,
    });
  };

  return (
    <FormWrapper formTitle="聖遺物の登録">
      <form className="space-y-4">
        <div>
          <ArtifactSetSelector artifactSets={artifactSets} />
        </div>
        <div>
          <FormLabel htmlFor="equippedPart" labelName="装備部位" />
          <Select
            onValueChange={(value) =>
              setRegisterArtifactData((prev) => ({
                ...prev,
                ["type"]: value,
              }))
            }
          >
            <SelectTrigger id="equippedPart">
              <SelectValue placeholder="装備部位の選択" />
            </SelectTrigger>
            <SelectContent>
              {artifactTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.nameJp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FormLabel htmlFor="mainAttribute" labelName="メインオプション" />
          <Select
            onValueChange={(value) =>
              setRegisterArtifactData((prev) => ({
                ...prev,
                ["mainOption"]: value,
              }))
            }
          >
            <SelectTrigger id="mainAttribute">
              <SelectValue placeholder="メインオプションの選択" />
            </SelectTrigger>
            <SelectContent>
              {mainStatuses.map((stat) => (
                <SelectItem key={stat.id} value={stat.id}>
                  {stat.nameJp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FormLabel labelName="サブオプション" />
          {regiterArtifactData.subOptions.map((subOption, index) => (
            <div key={index} className="flex space-x-2">
              <Select
                onValueChange={(value) =>
                  handleSubOptionChange(index, "attribute", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="サブオプションの選択" />
                </SelectTrigger>
                <SelectContent>
                  {subStatuses.map((stat) => (
                    <SelectItem key={stat.id} value={stat.id}>
                      {stat.nameJp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="0"
                value={subOption.value}
                onChange={(e) =>
                  handleSubOptionChange(index, "value", e.target.value)
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
