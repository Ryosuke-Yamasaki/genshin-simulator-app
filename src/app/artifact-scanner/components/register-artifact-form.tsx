"use client";

import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
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
import { artifactTypes, mainStatuses } from "../data/artifact-data";
import { useRecoilState, useSetRecoilState } from "recoil";
import { artifactSetDataState, registerArtifactDataState } from "../state";
import SubOptionSelector from "./ui/sub-option-selector";

interface RegisterArtifactFormProps {
  artifactSets: artifactSet[];
}

const RegisterArtifactForm: FC<RegisterArtifactFormProps> = ({
  artifactSets,
}) => {
  const [registerArtifactData, setRegisterArtifactData] = useRecoilState(
    registerArtifactDataState
  );
  const setArtifactSetData = useSetRecoilState(artifactSetDataState);

  useEffect(() => {
    setArtifactSetData(artifactSets);
  }, [artifactSets]);

  return (
    <FormWrapper formTitle="聖遺物の登録">
      <form className="space-y-4">
        <ArtifactSetSelector />
        <div>
          <FormLabel htmlFor="equippedPart" labelName="装備部位" />
          <Select
            onValueChange={(value) =>
              setRegisterArtifactData({
                ...registerArtifactData,
                type: value,
                mainOption: "",
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
                    <SelectItem key={stat.id} value={stat.nameJp}>
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
        <SubOptionSelector />
        <CardFooter className="px-0 pt-6">
          <Button type="submit" className="w-full">
            Register Artifact
          </Button>
        </CardFooter>
      </form>
    </FormWrapper>
  );
};

export default RegisterArtifactForm;
