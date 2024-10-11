"use client";

import { FC, useEffect } from "react";
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
import { useRecoilState, useSetRecoilState } from "recoil";
import { artifactSetDataState, registerArtifactDataState } from "../state";

interface RegisterArtifactFromProps {
  artifactSets: artifactSet[];
}

const RegisterArtifactFrom: FC<RegisterArtifactFromProps> = ({
  artifactSets,
}) => {
  const [registerArtifactData, setRegisterArtifactData] = useRecoilState(
    registerArtifactDataState
  );
  const setArtifactSetData = useSetRecoilState(artifactSetDataState);

  useEffect(() => {
    setArtifactSetData(artifactSets);
  }, [artifactSets]);

  const handleSubOptionChange = (
    index: number,
    field: "attribute" | "value",
    value: string
  ) => {
    const newSubOptions = [...registerArtifactData.subOptions];
    newSubOptions[index] = { ...newSubOptions[index], [field]: value };
    setRegisterArtifactData({
      ...registerArtifactData,
      subOptions: newSubOptions,
    });
  };

  console.log(registerArtifactData);

  return (
    <FormWrapper formTitle="聖遺物の登録">
      <form className="space-y-4">
        <div>
          <ArtifactSetSelector />
        </div>
        <div>
          <FormLabel htmlFor="equippedPart" labelName="装備部位" />
          <Select
            onValueChange={(value) =>
              setRegisterArtifactData({
                ...registerArtifactData,
                type: value,
              })
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
              setRegisterArtifactData({
                ...registerArtifactData,
                mainOption: value,
              })
            }
          >
            <SelectTrigger id="mainAttribute">
              <SelectValue placeholder="メインオプションの選択" />
            </SelectTrigger>
            <SelectContent>
              {registerArtifactData.type ? (
                mainStatuses
                  .filter((stat) =>
                    stat.type.includes(registerArtifactData.type)
                  )
                  .map((stat) => (
                    <SelectItem key={stat.id} value={stat.id}>
                      {stat.nameJp}
                    </SelectItem>
                  ))
              ) : (
                <div className="py-6 text-center text-sm">
                  装備部位を選択してください
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <FormLabel labelName="サブオプション" />
          {registerArtifactData.subOptions.map((subOption, index) => (
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
