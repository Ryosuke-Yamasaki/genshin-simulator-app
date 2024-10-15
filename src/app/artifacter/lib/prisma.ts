import { prisma } from "@/prisma";

export const getArtifactersByUser = async (id: string) => {
  const artifacters = await prisma.artifacter.findMany({
    include: {
      mainOption: true,
      subOptions: true,
    },
    where: { userId: id },
  });

  return artifacters;
};
