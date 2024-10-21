import "server-only";
import sharp from "sharp";
import { createWorker } from "tesseract.js";
import { findSubStatusId } from "./prisma";

export const extractTextFromImage = async (
  buffer: Buffer,
  region: { left: number; top: number; width: number; height: number }
) => {
  try {
    const croppedImage = await sharp(buffer).extract(region).toBuffer();
    const worker = await createWorker("eng", 1, {
      workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
    });

    const result = await worker.recognize(croppedImage);

    return result.data.text
      .replace(/’/g, "'")
      .replace(" |", "")
      .replace(/:/g, "")
      .trim();
  } catch (error) {
    throw new Error(`Failed to extract text from image.:${error}`);
  }
};

export const transformSubOptions = async (
  subOptions: string[]
): Promise<SubOption[]> => {
  const formattedSubOptions = await Promise.all(
    subOptions.map(async (stat) => {
      const [attribute, value] = stat.split("+").map((item) => item.trim());
      const isPercentage = value.includes("%");
      const subStatusId = await findSubStatusId(attribute, isPercentage);

      const formattedValue = isPercentage
        ? (parseFloat(value) / 100).toFixed(3)
        : value;

      return { subStatusId, value: Number(formattedValue) };
    })
  );
  return formattedSubOptions;
};

export const calculateScore = (subOptions: SubOption[]) => {
  const multipliers: { [key: string]: number } = {
    "9": 200,
    "10": 100,
  };

  return subOptions
    .filter((stat) =>
      Object.keys(multipliers).includes(stat.subStatusId.toString())
    )
    .map((stat) => stat.value * multipliers[stat.subStatusId])
    .reduce((a, b) => a + b, 0);
};
