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
import { mainStatuses } from "../../data/artifact-data";

interface ArtifactMainOptionSelectorProps {
  meta: FieldMetadata<string>;
  typeId: string | undefined;
}

const ArtifactMainOptionSelector: FC<ArtifactMainOptionSelectorProps> = ({
  meta,
  typeId,
}) => {
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
        {mainStatuses.map((stat) => (
          <option key={stat.id} value={stat.nameJp} />
        ))}
      </select>
      <FormLabel htmlFor={meta.id} labelName="メインオプション" />
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
          <SelectValue placeholder="メインオプションの選択" />
        </SelectTrigger>
        <SelectContent>
          {typeId ? (
            mainStatuses
              .filter((stat) => stat.type.includes(typeId))
              .map((stat) => (
                <SelectItem key={stat.id} value={stat.nameJp}>
                  {stat.nameJp}
                </SelectItem>
              ))
          ) : (
            <div className="py-6 text-center text-sm">
              装備部位を選択してください
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArtifactMainOptionSelector;
