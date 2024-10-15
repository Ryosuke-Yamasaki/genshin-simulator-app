"use server";

import { auth } from "@/auth";
import {
  calculateScore,
  getMainOptionId,
  transformSubOptions,
} from "./lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { parseFormData } from "parse-nested-form-data";
import { postArtifacterSchema } from "./schema";
import { redirect } from "next/navigation";
import {
  getArtifactByName,
  postArtifacter,
  postArtifacterSubOptions,
} from "./lib/prisma";
import sharp from "sharp";
import { createWorker } from "tesseract.js";

const extractTextFromImage = async (
  buffer: Buffer,
  region: { left: number; top: number; width: number; height: number }
) => {
  try {
    const croppedImage = await sharp(buffer).extract(region).toBuffer();
    const worker = await createWorker("eng", 1, {
      workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
    });

    const result = await worker.recognize(croppedImage);
    return result.data.text.replace(/’/g, "'").trim();
  } catch (error) {
    throw new Error(`Failed to extract text from image.:${error}`);
  }
};

export const insertArtifacter = async (
  subOptions: Status[],
  artifactId: string,
  quality: string,
  mainOption: string
) => {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/");
  const score = calculateScore(subOptions);

  const artifacter = {
    userId: session.user.id,
    artifactId,
    mainOptionId: getMainOptionId(quality, mainOption),
    score,
  };

  const id = await postArtifacter(artifacter);

  const formattedData = subOptions.map(({ attribute, value, ...rest }) => ({
    ...rest,
    subStatusId: Number(attribute),
    value,
    artifacterId: id,
  }));

  await postArtifacterSubOptions(formattedData);
};

export const registerArtifact = async (
  prevState: unknown,
  formData: FormData
) => {
  const submission = parseWithZod(formData, { schema: postArtifacterSchema });

  if (submission.status !== "success") return submission.reply();

  const data = parseFormData(formData) as RegisterArtifactData;
  const subOptions = data.subOptions;
  const artifactId = data.setId + data.typeId;

  await insertArtifacter(subOptions, artifactId, data.quality, data.mainOption);

  redirect("/artifact-scanner");
};

export const importArtifact = async (
  prevState: unknown,
  formData: FormData
) => {
  const image = formData.get("file") as File;
  const data = await image.arrayBuffer();
  const buffer = Buffer.from(data);

  const regions = {
    name: { left: 1307, top: 120, width: 593, height: 58 },
    mainOption: { left: 1307, top: 267, width: 273, height: 30 },
    subOptions: [
      { left: 1355, top: 475, width: 445, height: 39 },
      { left: 1355, top: 514, width: 445, height: 39 },
      { left: 1355, top: 553, width: 445, height: 39 },
      { left: 1355, top: 592, width: 445, height: 39 },
    ],
  };

  const [name, mainOption, ...subOptions] = await Promise.all([
    extractTextFromImage(buffer, regions.name),
    extractTextFromImage(buffer, regions.mainOption),
    ...regions.subOptions.map((region) => extractTextFromImage(buffer, region)),
  ]);

  const artifact = await getArtifactByName(name);

  const formattedSubOptions = transformSubOptions([...subOptions]);

  await insertArtifacter(
    formattedSubOptions,
    artifact.id,
    artifact.set.quality,
    mainOption
  );

  redirect("/artifact-scanner");
};
