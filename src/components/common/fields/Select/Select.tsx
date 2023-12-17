import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FC } from 'react';

type Option = { label: string; value: string } | number;
export interface SelectProps extends MuiSelectProps {
  name: string;
  options: Readonly<Option[]>;
}

export const NONE_LABEL = 'None';

const mapOptions = (item: Option) => {
  if (typeof item === 'number') {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  }
  const { label: optionLabel, value: optionValue } = item;

  return (
    <MenuItem key={optionValue} value={optionValue}>
      {optionLabel === NONE_LABEL ? <em>{optionLabel}</em> : optionLabel}
    </MenuItem>
  );
};

const Select: FC<SelectProps> = ({
  disabled,
  label,
  name,
  fullWidth,
  size,
  options,
  value,
  variant,
  margin,
  ...rest
}) => {
  return (
    <FormControl
      fullWidth={fullWidth ?? true}
      size={size ?? 'small'}
      variant={variant}
      margin={margin}
      disabled={disabled}
    >
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-select-label`}
        id={`${name}-simple-select`}
        name={name}
        value={value ?? ''}
        label={label}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      >
        {options.map(mapOptions)}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
