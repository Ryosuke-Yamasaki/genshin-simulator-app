import { prisma } from "@/prisma";
import { Artifacter } from "@prisma/client";
import "server-only";

export const getArtifactSets = async () => {
  const artifactSets = await prisma.artifactSet.findMany({
    orderBy: [{ quality: "asc" }, { id: "asc" }],
  });

  return artifactSets;
};

export const postArtifacter = async (data: Artifacter) => {
  const { id } = await prisma.artifacter.create({ data });

  return id;
};

export const postArtifacterSubOptions = async (data: subOption[]) => {
  await prisma.subOption.createMany({ data });
};
