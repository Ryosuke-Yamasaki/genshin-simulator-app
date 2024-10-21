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

      const regions = {
        set: { left: 1335, top: 635, width: 440, height: 30 },
        type: { left: 1335, top: 190, width: 220, height: 30 },
        mainOption: { left: 1335, top: 267, width: 273, height: 30 },
        subOptions: [
          { left: 1355, top: 475, width: 445, height: 39 },
          { left: 1355, top: 514, width: 445, height: 39 },
          { left: 1355, top: 553, width: 445, height: 39 },
          { left: 1355, top: 592, width: 445, height: 39 },
        ],
      };

      const [set, type, mainOption, ...subOptions] = await Promise.all([
        extractTextFromImage(buffer, regions.set),
        extractTextFromImage(buffer, regions.type),
        extractTextFromImage(buffer, regions.mainOption),
        ...regions.subOptions.map((region) =>
          extractTextFromImage(buffer, region)
        ),
      ]);

      const artifactSet = await findArtifactSet(set);
      const artifactType = await findArtifactType(type);

      const formattedSubOptions = await transformSubOptions([...subOptions]);

      const session = await auth();
      if (!session || !session.user?.id) redirect("/");
      const score = calculateScore(formattedSubOptions);

      const mainOptionId = await findMainStatusId(
        mainOption,
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return importArtifacts;
    })
  );

  const result = await postArtifacter(formattedArtifacter);

  revalidatePath("/artifact-scanner");

  return result;
};
