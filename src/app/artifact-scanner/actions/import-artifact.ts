"use server";

import { redirect } from "next/navigation";
import {
  calculateScore,
  extractTextFromImage,
  transformSubOptions,
} from "@/lib/db/artifact/functions";
import {
  findArtifactSet,
  findArtifactType,
  findMainStatusId,
  postArtifacter,
} from "@/lib/db/artifact/prisma";
import { auth } from "@/lib/db/auth";
import { revalidatePath } from "next/cache";

export const importArtifact = async (
  prevState: unknown,
  formData: FormData
) => {
  const files = formData.getAll("file") as File[];

  const formattedArtifacter = await Promise.all(
    files.map(async (file) => {
      const data = await file.arrayBuffer();
      const buffer = Buffer.from(data);

      const textData = (await extractTextFromImage(buffer)) as string[];

      const artifactSet = await findArtifactSet(textData[0]);
      const artifactType = await findArtifactType(textData[1]);

      const formattedSubOptions = await transformSubOptions([
        textData[3],
        textData[4],
        textData[5],
        textData[6],
      ]);

      const session = await auth();
      if (!session || !session.user?.id) redirect("/");
      const score = calculateScore(formattedSubOptions);

      const mainOptionId = await findMainStatusId(
        textData[2],
        artifactSet.quality,
        artifactType.id
      );

      const importArtifacts: Artifacter = {
        userId: session.user.id,
        artifactId: artifactSet.id + artifactType.id,
        mainOptionId,
        score,
        subOptions: formattedSubOptions,
      };

      return importArtifacts;
    })
  );

  const result = await postArtifacter(formattedArtifacter);

  revalidatePath("/artifact-scanner");

  return result;
};
