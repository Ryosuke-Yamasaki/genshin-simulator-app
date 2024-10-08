import Tesseract from "tesseract.js";

const cropImage = (
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  ctx?.drawImage(image, x, y, width, height, 0, 0, width, height);

  return canvas;
};

const parseSubOption = (text: string) => {
  const regex = /(.+?)\s*\+([\d.]+%?)/;
  const match = text.match(regex);

  if (match) {
    const attribute = match[1].trim();
    if (match[2].includes("%")) {
      match[2] = (parseFloat(match[2]) / 100).toFixed(3).toString();
    }
    const value = match[2];
    return { attribute, value };
  }

  return null;
};

export const importArtifactData = async (imagePath: string) => {
  const regions = {
    name: { x: 1307, y: 120, width: 593, height: 58 },
    mainOptionAttribute: { x: 1307, y: 267, width: 273, height: 30 },
    mainOptionValue: { x: 1307, y: 297, width: 273, height: 53 },
    subOption1: { x: 1355, y: 475, width: 445, height: 39 },
    subOption2: { x: 1355, y: 514, width: 445, height: 39 },
    subOption3: { x: 1355, y: 553, width: 445, height: 39 },
    subOption4: { x: 1355, y: 592, width: 445, height: 39 },
  };

  const image = new Image();
  image.src = imagePath;

  return new Promise((resolve, reject) => {
    image.onload = async () => {
      const artifactData = {} as ImportArtifactData;

      for (const [key, region] of Object.entries(regions)) {
        const croppedCanvas = cropImage(
          image,
          region.x,
          region.y,
          region.width,
          region.height
        );
        const croppedImageSrc = croppedCanvas.toDataURL();
        const result = await Tesseract.recognize(croppedImageSrc, "eng");
        const text = result.data.text.trim();

        if (key.startsWith("subOption")) {
          const parsedSubOption = parseSubOption(text);
          if (parsedSubOption) {
            artifactData[key] = parsedSubOption;
          } else {
            artifactData[key] = { attribute: text, value: "" };
          }
        } else if (key === "mainOptionAttribute") {
          artifactData.mainOption = { attribute: text, value: "" };
        } else if (key === "mainOptionValue") {
          artifactData.mainOption.value = text;
        } else {
          artifactData[key] = text;
        }
      }

      resolve(artifactData);
    };

    image.onerror = (error) => reject(error);
  });
};
