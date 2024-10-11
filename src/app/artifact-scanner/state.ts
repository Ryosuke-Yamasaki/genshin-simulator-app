import { atom, selector } from "recoil";

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

export const registerArtifactDataState = atom<RegisterArtifactData>({
  key: "registerArtifactDataState",
  default: {
    set: "",
    type: "",
    mainOption: "",
    subOptions: Array(4).fill({ attribute: "", value: "" }),
  },
});

export const qualityFilterState = atom<string[]>({
  key: "qualityFilterState",
  default: ["5"],
});

export const artifactSetDataState = atom<artifactSet[]>({
  key: "artifactSetDataState",
  default: [],
});

export const filteredArtifactSetsState = selector({
  key: "filteredArtifactSetsState",
  get: ({ get }) => {
    const qualityFilter = get(qualityFilterState);
    const artifactSets = get(artifactSetDataState);

    return artifactSets.filter((set) => qualityFilter.includes(set.quality));
  },
});
