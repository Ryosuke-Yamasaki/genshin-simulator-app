import { prisma } from "@/prisma";
import "server-only";

export const fetchArtifacts = async () => {
  const artifacts = await prisma.artifact.findMany({
    select: {
      id: true,
      nameJp: true,
      nameEn: true,
      set: { select: { id: true, nameJp: true, nameEn: true } },
    },
  });

  return artifacts;
};
