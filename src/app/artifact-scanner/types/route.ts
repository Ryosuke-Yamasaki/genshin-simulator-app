type Status = {
  attribute: string;
  value: string;
};

type RegisterArtifactData = {
  setId: string;
  quality: string;
  typeId: string;
  mainOption: string;
  subOptions: {
    value: string;
    attribute: string;
  }[];
};
