import { prisma } from "@/prisma";
import "server-only";

export const fetchArtifacts = async () => {
  const artifacts = await prisma.artifact.findMany({
    select: {
      id: true,
      nameJp: true,
      nameEn: true,
      set: true,
      type: true,
    },
  });

  return artifacts;
};

export const fetchArtifactSets = async () => {
  const artifactSets = await prisma.artifactSet.findMany({
    orderBy: [{ quality: "asc" }, { id: "asc" }],
  });

  return artifactSets;
};
