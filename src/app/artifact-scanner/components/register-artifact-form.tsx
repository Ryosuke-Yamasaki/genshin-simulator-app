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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { registerArtifact } from "../actions";
import { postArtifacterSchema } from "../schema";
import ArtifactTypeSelector from "./ui/artifact-type-selector";
import ArtifactMainOptionSelector from "./ui/artifact-main-option-selector";

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

  const [lastResult, formAction] = useFormState(registerArtifact, null);
  const [form, field] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postArtifacterSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <FormWrapper formTitle="聖遺物の登録">
      <form
        className="space-y-4"
        id={form.id}
        onSubmit={form.onSubmit}
        action={formAction}
        noValidate
      >
        <ArtifactSetSelector
          metaSetId={field.setId}
          metaQuality={field.quality}
        />
        <ArtifactTypeSelector meta={field.typeId} />
        <ArtifactMainOptionSelector
          meta={field.mainOption}
          typeId={field.typeId.value}
        />
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
