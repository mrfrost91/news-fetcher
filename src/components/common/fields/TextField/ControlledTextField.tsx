import TextField, {
  TextFieldProps as MuiTextFieldProps,
  TextFieldVariants,
} from '@mui/material/TextField';
import { Controller, useFormContext, UseControllerProps } from 'react-hook-form';
import { FC } from 'react';

interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  name: string;
  rules?: UseControllerProps['rules'];
  variant?: TextFieldVariants;
}

const ControlledTextField: FC<TextFieldProps> = ({
  name,
  fullWidth,
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
      rules={rules}
      render={({ field: { ref, onBlur: fieldOnBlur, onChange: fieldOnChange, ...field } }) => (
        <TextField
          size={size ?? 'small'}
          fullWidth={fullWidth ?? true}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          disabled={disabled}
          inputRef={ref}
          onBlur={(event) => {
            if (onBlur) onBlur(event);
            fieldOnBlur();
          }}
          onChange={(event) => {
            if (onChange) onChange(event);
            fieldOnChange(event);
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
