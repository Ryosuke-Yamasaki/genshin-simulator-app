import "server-only";
import { prisma } from "@/lib/db/prisma";
import { artifacterParams } from "./type";

export const findSubStatusId = async (name: string, isPercentage: boolean) => {
  try {
    const subStatus = await prisma.subStatus.findFirst({
      where: { nameEn: name, isPercentage: isPercentage },
    });

    if (!subStatus) {
      throw new Error("SubStatusId not found");
    }

    return subStatus.id;
  } catch (error) {
    throw new Error(`Error fetching SubStatusId:${error}`);
  }
};

export const findMainStatusId = async (
  name: string,
  quality: string,
  typeId: string
) => {
  try {
    const mainStatus = await prisma.mainOption.findFirst({
      where: {
        mainStatus: { nameEn: name, types: { some: { typeId: typeId } } },
        quality: quality,
      },
    });

    if (!mainStatus) {
      throw new Error("MainStatusId not found");
    }

    return mainStatus.id;
  } catch (error) {
    throw new Error(`Error fetching MainStatusId:${error}`);
  }
};

export const findArtifactSet = async (name: string) => {
  try {
    const artifactSet = await prisma.artifactSet.findFirst({
      where: { nameEn: { contains: name } },
    });

    if (!artifactSet) {
      throw new Error("ArtifactSetId not found");
    }

    return artifactSet;
  } catch (error) {
    throw new Error(`Error fetching ArtifactSetId:${error}`);
  }
};

export const findArtifactType = async (name: string) => {
  try {
    const artifactType = await prisma.artifactType.findFirst({
      where: { nameEn: { contains: name } },
    });

    if (!artifactType) {
      throw new Error("ArtifactTypeId not found");
    }

    return artifactType;
  } catch (error) {
    throw new Error(`Error fetching ArtifactTypeId:${error}`);
  }
};

export const postArtifacter = async (importArtifacts: Artifacter[]) => {
  try {
    const artifacters = await prisma.$transaction(
      importArtifacts.map(
        ({ userId, artifactId, mainOptionId, score, subOptions }) =>
          prisma.artifacter.create({
            data: {
              userId,
              artifactId,
              mainOptionId,
              score,
              subOptions: { create: subOptions },
            },
            include: artifacterParams.include,
          })
      )
    );

    if (!artifacters || artifacters.length === 0) {
      throw new Error("No artifacters were created in the transaction.");
    }

    return artifacters;
  } catch (error) {
    throw new Error(`Error fetching Artifacters:${error}`);
  }
};

export const getArtifactersByUser = async (id: string) => {
  const artifacters = await prisma.artifacter.findMany({
    include: artifacterParams.include,
    where: { userId: id },
    orderBy: { score: "desc" },
  });

  return artifacters;
};

export const getSubStatuses = async () => {
  const subStatuses = await prisma.subStatus.findMany();

  return subStatuses;
};
