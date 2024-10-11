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
  subOption1: string;
  subOption2: string;
  subOption3: string;
  subOption4: string;
};
