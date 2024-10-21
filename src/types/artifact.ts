type SubOption = {
  subStatusId: number;
  value: number;
};

type Artifacter = {
  userId: string;
  artifactId: string;
  mainOptionId: number;
  score: number;
  subOptions: SubOption[];
};
