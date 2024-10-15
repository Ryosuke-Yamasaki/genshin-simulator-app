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

type ImportArtifactData = {
  name: string;
  mainOption: Status;
  subOption1: Status;
  subOption2: Status;
  subOption3: Status;
  subOption4: Status;
  [key: string]: string | Status;
};
