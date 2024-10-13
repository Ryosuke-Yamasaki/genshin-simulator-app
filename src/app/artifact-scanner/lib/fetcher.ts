import { prisma } from "@/prisma";
import "server-only";

export const getArtifactSets = async () => {
  const artifactSets = await prisma.artifactSet.findMany({
    orderBy: [{ quality: "asc" }, { id: "asc" }],
  });

  return artifactSets;
};

export const postArtifacter = async (data: artifacter) => {
  const { id } = await prisma.artifacter.create({ data });

  return id;
};

export const postArtifacterSubOptions = async (data: subOption[]) => {
  await prisma.subOption.createMany({ data });
};
