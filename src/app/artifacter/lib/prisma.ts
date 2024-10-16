import { prisma } from "@/prisma";
import { artifacterParams } from "../types/prisma";

export const getArtifactersByUser = async (id: string) => {
  const artifacters = await prisma.artifacter.findMany({
    include: artifacterParams.include,
    where: { userId: id },
  });

  return artifacters;
};
