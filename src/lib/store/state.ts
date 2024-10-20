import { atom } from "recoil";

export const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});
