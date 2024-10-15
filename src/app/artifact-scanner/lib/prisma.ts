import { prisma } from "@/prisma";
import "server-only";

export const getArtifactByName = async (name: string) => {
  try {
    const artifact = await prisma.artifact.findFirst({
      select: {
        id: true,
        nameJp: true,
        nameEn: true,
        set: {
          select: {
            quality: true,
          },
        },
      },
      where: { nameEn: name },
    });

    if (!artifact) {
      throw new Error("Artifact not found");
    }

    return artifact;
  } catch (error) {
    throw new Error(`Error fetching artifact:${error}`);
  }
};

export const getArtifactSets = async () => {
  const artifactSets = await prisma.artifactSet.findMany({
    orderBy: [{ quality: "asc" }, { id: "asc" }],
  });

  return artifactSets;
};

export const getArtifacters = async () => {
  const artifacters = await prisma.artifacter.findMany({
    select: {
      artifact: {
        select: {
          nameJp: true,
          set: {
            select: {
              nameJp: true,
            },
          },
        },
      },
      mainOption: {
        select: {
          nameJp: true,
          value: true,
        },
      },
    },
  });

  return artifacters;
};

export const postArtifacter = async (data: artifacter) => {
  const { id } = await prisma.artifacter.create({ data });

  return id;
};

export const postArtifacterSubOptions = async (data: subOption[]) => {
  await prisma.subOption.createMany({ data });
};
