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

const SubOptionSelector = () => {
  const [registerArtifactData, setRegisterArtifactData] = useRecoilState(
    registerArtifactDataState
  );

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
  };

  return (
    <div>
      <FormLabel labelName="サブオプション" />
      {registerArtifactData.subOptions.map((subOption, index) => (
        <div key={index} className="flex space-x-2">
          <Select
            onValueChange={(value) =>
              handleSubOptionChange(index, "attribute", value)
            }
          >
            <SelectTrigger>
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
            placeholder="0"
            value={subOption.value}
            onChange={(e) =>
              handleSubOptionChange(index, "value", e.target.value)
            }
            className="w-24"
          />
        </div>
      ))}
    </div>
  );
};

export default SubOptionSelector;
