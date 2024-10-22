import "server-only";
import sharp from "sharp";
import { createScheduler, createWorker, PSM } from "tesseract.js";
import { findSubStatusId } from "./prisma";

export const extractTextFromImage = async (buffer: Buffer) => {
  const preprocessImage = await sharp(buffer)
    .grayscale()
    .median(3)
    .sharpen()
    .toBuffer();

  const scheduler = createScheduler();
  const worker1 = await createWorker("eng", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });
  const worker2 = await createWorker("eng", 1, {
    workerPath: "./node_modules/tesseract.js/src/worker-script/node/index.js",
  });
  await worker1.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_LINE,
    tessedit_char_whitelist:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+.% '",
    preserve_interword_spaces: "1",
  });
  await worker2.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_LINE,
    tessedit_char_whitelist:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+.% '",
    preserve_interword_spaces: "1",
  });
  const rectangles = [
    { left: 1335, top: 635, width: 440, height: 30 }, //セット効果
    { left: 1335, top: 190, width: 220, height: 30 }, //部位
    { left: 1335, top: 267, width: 273, height: 30 }, //メインオプション
    { left: 1355, top: 475, width: 445, height: 39 }, //サブオプション1
    { left: 1355, top: 514, width: 445, height: 39 }, //サブオプション2
    { left: 1355, top: 553, width: 445, height: 39 }, //サブオプション3
    { left: 1355, top: 592, width: 445, height: 39 }, //サブオプション4
  ];

  scheduler.addWorker(worker1);
  scheduler.addWorker(worker2);

  const results = await Promise.all(
    rectangles.map((rectangle) =>
      scheduler.addJob("recognize", preprocessImage, { rectangle })
    )
  );

  await scheduler.terminate();
  return results.map((result) =>
    result.data.text.replace(/HP\s*re/g, "HP").trim()
  );
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
