"use server";

import { auth } from "@/auth";
import {
  getMainOptionByEn,
  getMainOptionByJp,
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
  const croppedImage = await sharp(buffer).extract(region).toBuffer();
  const worker = await createWorker("eng", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });
  const result = await worker
    .recognize(croppedImage)
    .then(({ data: { text } }) => {
      return text.replace(/’/g, "'");
    });
  return result.trim();
};

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
    mainOptionId: getMainOptionByJp(
      data.quality as string,
      data.mainOption as string
    )!,
  };

  const id = await postArtifacter(artifacter);

  const subOptions = data.subOptions as Status[];
  const formattedData = subOptions.map(({ attribute, value, ...rest }) => {
    const formattedValue = ["1", "3", "5", "7"].includes(attribute)
      ? value
      : (Number(value) / 100).toFixed(3);

    return {
      ...rest,
      subStatusId: attribute,
      value: formattedValue,
      artifacterId: id,
    };
  });

  postArtifacterSubOptions(formattedData);

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
    mainOptionAttribute: { left: 1307, top: 267, width: 273, height: 30 },
    subOptions: [
      { left: 1355, top: 475, width: 445, height: 39 },
      { left: 1355, top: 514, width: 445, height: 39 },
      { left: 1355, top: 553, width: 445, height: 39 },
      { left: 1355, top: 592, width: 445, height: 39 },
    ],
  };

  const [name, mainOptionAttribute, ...subOptions] = await Promise.all([
    extractTextFromImage(buffer, regions.name),
    extractTextFromImage(buffer, regions.mainOptionAttribute),
    ...regions.subOptions.map((region) => extractTextFromImage(buffer, region)),
  ]);

  const session = await auth();
  const artifact = await getArtifactByName(name);

  const artifacter: artifacter = {
    userId: session?.user?.id!,
    artifactId: artifact?.id!,
    mainOptionId: getMainOptionByEn(
      artifact?.set.quality!,
      mainOptionAttribute
    )!,
  };

  const id = await postArtifacter(artifacter);
  const formattedsubOptions = transformSubOptions([...subOptions]);

  const formattedData = formattedsubOptions.map(
    ({ subStatusId, formattedValue, ...rest }) => ({
      ...rest,
      subStatusId: subStatusId!,
      value: formattedValue,
      artifacterId: id,
    })
  );

  postArtifacterSubOptions(formattedData);

  redirect("/artifact-scanner");
};
