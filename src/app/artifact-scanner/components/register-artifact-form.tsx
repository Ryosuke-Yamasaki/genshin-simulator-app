"use client";

import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import FormWrapper from "./form-wrapper";
import ArtifactSetSelector from "./ui/artifact-set-selector";
import { useSetRecoilState } from "recoil";
import { artifactSetDataState } from "../state";
import SubOptionSelector from "./ui/sub-option-selector";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { registerArtifact } from "../actions";
import { postArtifacterSchema } from "../schema";
import ArtifactTypeSelector from "./ui/artifact-type-selector";
import ArtifactMainOptionSelector from "./ui/artifact-main-option-selector";
import FormLabel from "./ui/form-label";
import { ArtifactSet } from "@prisma/client";

interface RegisterArtifactFormProps {
  artifactSets: ArtifactSet[];
}

const RegisterArtifactForm: FC<RegisterArtifactFormProps> = ({
  artifactSets,
}) => {
  const setArtifactSetData = useSetRecoilState(artifactSetDataState);

  useEffect(() => {
    setArtifactSetData(artifactSets);
  }, [artifactSets]);

  const [lastResult, formAction] = useFormState(registerArtifact, null);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postArtifacterSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      subOptions: [
        { attribute: "", value: "" },
        { attribute: "", value: "" },
        { attribute: "", value: "" },
        { attribute: "", value: "" },
      ],
    },
  });
  const subOptionFields = fields.subOptions.getFieldList();

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
          metaSetId={fields.setId}
          metaQuality={fields.quality}
        />
        <ArtifactTypeSelector meta={fields.typeId} />
        <ArtifactMainOptionSelector
          meta={fields.mainOption}
          typeId={fields.typeId.value}
        />
        <div>
          <FormLabel labelName="サブオプション" />
          {subOptionFields.map((field) => (
            <SubOptionSelector key={field.key} meta={field} />
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

export default RegisterArtifactForm;
