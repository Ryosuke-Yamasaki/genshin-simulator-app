import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormLabel from "./form-label";
import { Input } from "@/components/ui/input";
import { useRecoilState } from "recoil";
import { registerArtifactDataState } from "../../state";
import { subStatuses } from "../../data/artifact-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SubOptionSelector = () => {
  const [registerArtifactData, setRegisterArtifactData] = useRecoilState(
    registerArtifactDataState
  );
  const [isPercentage, setIsPercentage] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleSubOptionChange = (
    index: number,
    field: "attribute" | "value",
    value: string
  ) => {
    const newSubOptions = [...registerArtifactData.subOptions];
    newSubOptions[index] = { ...newSubOptions[index], [field]: value };
    setRegisterArtifactData({
      ...registerArtifactData,
      subOptions: newSubOptions,
    });

    if (field === "attribute") {
      const selectedStatus = subStatuses.find((stat) => stat.id === value);
      const updatedIsPercentage = [...isPercentage];
      updatedIsPercentage[index] = selectedStatus
        ? selectedStatus.isPercentage
        : false;
      setIsPercentage(updatedIsPercentage);
    }
  };

  return (
    <div>
      <FormLabel labelName="サブオプション" />
      {registerArtifactData.subOptions.map((subOption, index) => (
        <div key={index} className="flex space-x-2">
          <Select
            name={`subOptionAttribute${index}`}
            onValueChange={(value) => {
              handleSubOptionChange(index, "attribute", value);
            }}
          >
            <SelectTrigger className="w-[294px]">
              <SelectValue placeholder="サブオプションの選択" />
            </SelectTrigger>
            <SelectContent>
              {subStatuses.map((stat) => (
                <SelectItem key={stat.id} value={stat.id}>
                  {stat.nameJp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            name={`subOptionValue${index}`}
            value={subOption.value}
            onChange={(e) =>
              handleSubOptionChange(index, "value", e.target.value)
            }
            className={cn("w-24 text-center", isPercentage[index] && "w-16")}
          />
          {isPercentage[index] && (
            <div className="mt-1 py-2 text-sm text-gray-500">%</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubOptionSelector;
