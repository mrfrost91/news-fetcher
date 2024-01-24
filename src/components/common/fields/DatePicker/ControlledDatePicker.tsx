import { FC } from 'react';
import { Controller, useFormContext, UseControllerProps } from 'react-hook-form';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface ControlledDatePickerProps
  extends Omit<MuiDatePickerProps<Dayjs>, 'onChange' | 'onAccept'> {
  name: string;
  rules?: UseControllerProps['rules'];
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  hideTodayBtn?: boolean;
  onAccept?: (value: string | null) => void;
  onChange?: (value: string | null) => void;
}

const ControlledDatePicker: FC<ControlledDatePickerProps> = ({
  name,
  fullWidth,
  disabled,
  rules,
  size,
  onAccept,
  onChange,
  hideTodayBtn,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, onChange: fieldOnChange, value, ...field } }) => (
        <MuiDatePicker
          reduceAnimations
          slotProps={{
            actionBar: {
              actions: hideTodayBtn ? ['accept', 'clear'] : ['accept', 'today', 'clear'],
            },
            field: {
              readOnly: true,
            },
            textField: {
              size: size ?? 'small',
              fullWidth: fullWidth ?? true,
            },
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          disabled={disabled}
          inputRef={ref}
          value={value && dayjs(value)}
          onAccept={(newValue) => {
            const formattedValue = newValue && newValue.format('YYYY-MM-DD');
            if (onAccept) onAccept(formattedValue);
          }}
          onChange={(newValue) => {
            const formattedValue = newValue && newValue.format('YYYY-MM-DD');
            if (onChange) onChange(formattedValue);
            fieldOnChange(formattedValue);
          }}
        />
      )}
    />
  );
};

export default ControlledDatePicker;
