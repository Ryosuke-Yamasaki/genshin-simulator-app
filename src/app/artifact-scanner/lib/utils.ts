import {
  mainOptions,
  multipliers,
  subStatuses,
} from "../../data/artifact-data";

export const getMainOptionId = (quality: string, name: string) => {
  const option = mainOptions.find(
    (stat) => stat.quality === quality && stat.nameEn === name
  );

  if (!option) {
    throw new Error(
      `No main option found for quality: ${quality}, name: ${name}`
    );
  }

  return option.id;
};

export const transformSubOptions = (subOptions: string[]) => {
  return subOptions.map((stat) => {
    const [attribute, value] = stat.split("+").map((item) => item.trim());
    const isPercentage = value.includes("%");
    const subOption = subStatuses.find(
      (stat) => stat.nameEn === attribute && stat.isPercentage === isPercentage
    );

    if (!subOption) {
      throw new Error(
        `Error: Attribute "${attribute}" not found in subStatuses.`
      );
    }

    const formattedValue = isPercentage
      ? (parseFloat(value) / 100).toFixed(3)
      : value;

    return { attribute: subOption.id, value: formattedValue };
  });
};

export const calculateScore = (subOptions: Status[]) => {
  return subOptions
    .filter((stat) => Object.keys(multipliers).includes(stat.attribute))
    .map((stat) => Number(stat.value) * multipliers[stat.attribute])
    .reduce((a, b) => a + b, 0);
};

export const formatSubOptions = (subOptions: Status[], id: string) => {
  return subOptions.map(({ attribute, value, ...rest }) => {
    const formattedValue = ["1", "3", "5", "7"].includes(attribute)
      ? value
      : (Number(value) / 100).toFixed(3);

    return {
      ...rest,
      subStatusId: attribute,
      value: formattedValue,
      artifacterId: id,
    };
  });
};
