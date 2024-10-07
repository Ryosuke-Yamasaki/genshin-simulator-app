import { prisma } from "@/prisma";
import "server-only";

export const fetchArtifacts = async () => {
  const artifacts = await prisma.artifact.findMany({
    include: {
      set: true,
      type: true,
    },
  });

  return artifacts;
};
