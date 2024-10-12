"use server";

import { auth } from "@/auth";
import { getMainOption } from "./lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { postArtifacterSchema } from "./schema";
import { redirect } from "next/navigation";

export const registerArtifact = async (
  prevState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, { schema: postArtifacterSchema });

  if (submission.status !== "success") return submission.reply();

  const data = Object.fromEntries(formData);
  const session = await auth();

  const setId = formData.get("setId") as string;
  const typeId = formData.get("typeId") as string;
  const mainOptionAttribute = formData.get("mainOption") as string;
  const quality = formData.get("quality") as string;

  const artifacter: artifacter = {
    userId: session?.user?.id!,
    artifactId: setId + typeId,
    mainOptionId: getMainOption(Number(quality), mainOptionAttribute)?.id!,
  };

  console.log(artifacter);
  redirect("/artifact-scanner");
};
