"use server";

import { auth } from "@/auth";
import { getMainOption } from "./lib/utils";

export const registerArtifact = async (
  prevState: string | null,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const session = await auth();

  if (!session?.user?.id) return "error";

  const setId = formData.get("setId") as string;
  const typeId = formData.get("typeId") as string;
  const mainOptionAttribute = formData.get("mainOption") as string;
  const quality = formData.get("quality") as string;

  const artifacter: artifacter = {
    userId: session?.user.id,
    artifactId: setId + typeId,
    mainOptionId: getMainOption(Number(quality), mainOptionAttribute)?.id!,
  };

  console.log(artifacter);
  return "seiko";
};
