import { atom } from "recoil";

export const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});

export const uploadStatusState = atom<string | null>({
  key: "uploadStatusState",
  default: null,
});
