import { atom } from "recoil";

export const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});

export const importArtifactDataState = atom<ImportArtifactData | null>({
  key: "importArtifactDataState",
  default: null,
});

export const imageState = atom<File | null>({
  key: "imageState",
  default: null,
});
