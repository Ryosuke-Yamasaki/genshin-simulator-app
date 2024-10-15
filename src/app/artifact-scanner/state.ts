import { ArtifactSet } from "@prisma/client";
import { atom, selector } from "recoil";

export const previewState = atom<string | null>({
  key: "previewState",
  default: null,
});

export const imageState = atom<File | null>({
  key: "imageState",
  default: null,
});

export const qualityFilterState = atom<string[]>({
  key: "qualityFilterState",
  default: ["5"],
});

export const artifactSetDataState = atom<ArtifactSet[]>({
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
