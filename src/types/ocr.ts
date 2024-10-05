type ArtifactImportData = {
  name: string;
  mainOption: string;
  quality: string;
  subOption1: SubOption;
  subOption2: SubOption;
  subOption3: SubOption;
  subOption4: SubOption;
  [key: string]: string | SubOption;
};

type SubOption = {
  attribute: string;
  value: string;
};
