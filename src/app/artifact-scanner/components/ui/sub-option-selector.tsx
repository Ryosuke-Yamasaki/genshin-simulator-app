import {
  getInputProps,
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
import { subStatuses } from "../../data/artifact-data";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SubOptionSelectorProps {
  meta: FieldMetadata<{ attribute: string; value: string }>;
}

const SubOptionSelector: FC<SubOptionSelectorProps> = ({ meta }) => {
  const metaField = meta.getFieldset();
  const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null);
  const controlAttribute = useControl(metaField.attribute);

  const selectedStatus = subStatuses.find(
    (stat) => stat.id === metaField.attribute.value
  );

  return (
    <div key={meta.key} className="flex">
      <select
        name={metaField.attribute.name}
        defaultValue={metaField.attribute.initialValue ?? ""}
        className="sr-only"
        ref={controlAttribute.register}
        aria-hidden
        tabIndex={-1}
        onFocus={() => {
          selectRef.current?.focus();
        }}
      >
        <option value="" />
        {subStatuses.map((type) => (
          <option key={type.id} value={type.id} />
        ))}
      </select>
      <Select
        value={controlAttribute.value ?? ""}
        onValueChange={controlAttribute.change}
        onOpenChange={(open) => {
          if (!open) {
            controlAttribute.blur();
          }
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
        className={cn(
          "w-24 text-center ml-2",
          selectedStatus?.isPercentage && "w-16"
        )}
        {...getInputProps(metaField.value, {
          type: "text",
          ariaAttributes: true,
        })}
        key={metaField.value.key}
      />
      {selectedStatus?.isPercentage && (
        <div className="mt-1 ml-2 py-2 text-sm text-gray-500">%</div>
      )}
    </div>
  );
};

export default SubOptionSelector;
