import { mainOptions, subStatuses } from "../data/artifact-data";

export const getMainOptionByJp = (quality: string, name: string) => {
  return mainOptions.find(
    (stat) => stat.quality === quality && stat.nameJp === name
  )?.id;
};
export const getMainOptionByEn = (quality: string, name: string) => {
  return mainOptions.find(
    (stat) => stat.quality === quality && stat.nameEn === name
  )?.id;
};

export const transformSubOptions = (subOptions: string[]) => {
  return subOptions.map((stat) => {
    const [attribute, value] = stat.split("+");
    const subStatusId = subStatuses.find(
      (stat) => stat.nameEn === attribute
    )?.id;
    const formattedValue = value.includes("%")
      ? (parseFloat(value.replace("%", "")) / 100).toFixed(3)
      : value;
    return { subStatusId, formattedValue };
  });
};
