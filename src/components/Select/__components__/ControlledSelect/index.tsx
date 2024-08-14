import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ISelectProps } from "../../types";
import Select from "../..";

interface IControlledSelectProps<T extends FieldValues> extends ISelectProps {
  name: Path<T>;
  control: Control<T>;
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  ...props
}: IControlledSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Select {...field} {...props} />
          {error && <small style={{ color: "#ff0000" }}>{error?.message}</small>}
        </div>
      )}
    />
  );
};
