import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { BaseComponentProps } from '../../types';
import { TextField } from '@mui/material';

interface DatePickerProps extends BaseComponentProps {
  value: Date;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className
}) => {
  return (
    <MuiDatePicker
      label="Activity Date"
      value={value}
      onChange={(newValue) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={className}
          variant="outlined"
          size="small"
        />
      )}
      inputFormat="dd/MM/yyyy"
      mask="__/__/____"
    />
  );
};

export default DatePicker; 