import { Prisma } from "@prisma/client";

export const artifactParams = Prisma.validator<Prisma.ArtifactDefaultArgs>()({
  include: { set: true, type: true },
});

export type Artifact = Prisma.ArtifactGetPayload<typeof artifactParams>;

export const subOptionParams = Prisma.validator<Prisma.SubOptionDefaultArgs>()({
  include: { subStatus: true },
});

export type subOption = Prisma.SubOptionGetPayload<typeof subOptionParams>;

export const artifacterParams =
  Prisma.validator<Prisma.ArtifacterDefaultArgs>()({
    include: {
      artifact: { include: artifactParams.include },
      mainOption: true,
      subOptions: {
        include: subOptionParams.include,
      },
    },
  });

export type Artfiacter = Prisma.ArtifacterGetPayload<typeof artifacterParams>;
