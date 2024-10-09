import { Label } from "@/components/ui/label";
import { FC } from "react";

interface FormLabelProps {
  htmlFor?: string;
  labelName: string;
}

const FormLabel: FC<FormLabelProps> = ({ htmlFor, labelName }) => {
  return (
    <Label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {labelName}
    </Label>
  );
};

export default FormLabel;
