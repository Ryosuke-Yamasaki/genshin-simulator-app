type artifact = {
  id: string;
  set: artifactSet;
  type: artifactType;
  nameJp: string;
  nameEn: string;
};

type artifactSet = {
  id: string;
  nameJp: string;
  nameEn: string;
  quality: string;
};

type artifactType = {
  id: string;
  nameJp: string;
  nameEn: string;
};

type artifacter = {
  userId: string;
  artifactId: string;
  mainOptionId: string;
};

type subOption = {
  artifacterId: string;
  subStatusId: string;
  value: number;
};
