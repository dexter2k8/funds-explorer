import IMask, { FactoryArg } from "imask";
import { useCallback, useMemo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Input, { IInputProps } from "../Input";

interface IControlledInputProps<T extends FieldValues> extends Omit<IInputProps, "onChange"> {
  name: Path<T>;
  control: Control<T>;
  mask?: FactoryArg;
  rawValue?: (value: string) => void;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  mask,
  rawValue,
  ...props
}: IControlledInputProps<T>) => {
  const masked = useMemo(() => {
    const maskOptions: FactoryArg = mask ?? { mask: "" };
    return IMask.createMask(maskOptions);
  }, [mask]);

  const maskedValue = useCallback(
    (value: string) => {
      if (!value || !mask) return value;
      masked.resolve(value);
      rawValue?.(masked.unmaskedValue);
      return masked.value;
    },
    [masked, rawValue, mask]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          {...props}
          message={error?.message}
          status={error ? "error" : undefined}
          onChange={(e) => field.onChange(maskedValue(e.target.value))}
          value={field.value ?? ""}
        />
      )}
    />
  );
};
