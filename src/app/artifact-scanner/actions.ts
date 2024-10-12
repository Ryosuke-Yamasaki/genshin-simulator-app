"use server";

import { auth } from "@/auth";

export const registerArtifact = async (
  prevState: string | null,
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const session = await auth();
  console.log(session);
  return "seiko";
};
