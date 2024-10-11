type Status = {
  attribute: string;
  value: string;
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

type RegisterArtifactData = {
  set: string;
  type: string;
  mainOption: string;
  subOptions: Status[];
};
