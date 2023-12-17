import { Controller, useFormContext, UseControllerProps } from 'react-hook-form';
import { FC } from 'react';
import Select, { SelectProps } from './Select';

type ControlledSelectProps = {
  name: string;
  rules?: UseControllerProps['rules'];
} & SelectProps;
const ControlledSelect: FC<ControlledSelectProps> = ({
  name,
  fullWidth,
  options,
  rules,
  size,
  onBlur,
  onChange,
  disabled,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      rules={rules}
      render={({ field: { ref, onBlur: fieldOnBlur, onChange: fieldOnChange, ...field } }) => (
        <Select
          fullWidth={fullWidth}
          size={size}
          options={options}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          inputRef={ref}
          onBlur={(event) => {
            if (onBlur) onBlur(event);
            fieldOnBlur();
          }}
          onChange={(event, child) => {
            if (onChange) onChange(event, child);
            fieldOnChange(event);
          }}
        />
      )}
    />
  );
};

export default ControlledSelect;
