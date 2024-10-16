import {
  unstable_useControl as useControl,
  type FieldMetadata,
} from "@conform-to/react";
import { useRef, type ElementRef, FC } from "react";
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FormLabel from "./form-label";
import { artifactTypes } from "../../../data/artifact-data";

interface ArtifactTypeSelectorProps {
  meta: FieldMetadata<string>;
}

const ArtifactTypeSelector: FC<ArtifactTypeSelectorProps> = ({ meta }) => {
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null);
  const control = useControl(meta);

  return (
    <div>
      <select
        name={meta.name}
        defaultValue={meta.initialValue ?? ""}
        className="sr-only"
        ref={control.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus();
        }}
      >
        <option value="" />
        {artifactTypes.map((type) => (
          <option key={type.id} value={type.id} />
        ))}
      </select>
      <FormLabel htmlFor={meta.id} labelName="装備部位" />
      <Select
        value={control.value ?? ""}
        onValueChange={control.change}
        onOpenChange={(open) => {
          if (!open) {
            control.blur();
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="装備部位の選択" />
        </SelectTrigger>
        <SelectContent>
          {artifactTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.nameJp}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArtifactTypeSelector;
