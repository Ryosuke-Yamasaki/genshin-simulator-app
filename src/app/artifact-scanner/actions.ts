"use server";

import { auth } from "@/auth";
import { getMainOption } from "./lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { parseFormData } from "parse-nested-form-data";
import { postArtifacterSchema } from "./schema";
import { redirect } from "next/navigation";
import { postArtifacter, postArtifacterSubOptions } from "./lib/fetcher";

export const registerArtifact = async (
  prevState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, { schema: postArtifacterSchema });

  if (submission.status !== "success") return submission.reply();

  const session = await auth();

  const data = parseFormData(formData);

  const artifacter: artifacter = {
    userId: session?.user?.id!,
    artifactId: ((data.setId as string) + data.typeId) as string,
    mainOptionId: getMainOption(
      data.quality as string,
      data.mainOption as string
    )?.id!,
  };

  const id = postArtifacter(artifacter);

  const artifacterId = await id;

  const subOptions = data.subOptions as Status[];
  const formattedData = subOptions.map(({ attribute, value, ...rest }) => {
    const formattedValue = ["1", "3", "5", "7"].includes(attribute)
      ? value
      : Number(value) * 0.01;

    return {
      ...rest,
      subStatusId: attribute,
      value: formattedValue as number,
      artifacterId,
    };
  });

  postArtifacterSubOptions(formattedData);

  redirect("/artifact-scanner");
};
