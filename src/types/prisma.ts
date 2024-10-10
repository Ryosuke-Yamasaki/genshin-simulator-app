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
  quality: number;
};

type artifactType = {
  id: string;
  nameJp: string;
  nameEn: string;
};
