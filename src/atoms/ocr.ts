import { atom } from "recoil";

export const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});

export const artifactDataState = atom<ImportArtifactData | null>({
  key: "artifactDataState",
  default: null,
});

export const imageState = atom<File | null>({
  key: "imageState",
  default: null,
});
