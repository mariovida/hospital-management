import React from 'react';
import TextField from '@mui/material/TextField';

type CustomTextFieldProps = {
  formik?: any;
  name: string;
  label: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  usedWithDateTimePicker?: boolean;
};

const helperTextStyle = {
  fontSize: '0.8rem',
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  formik,
  name,
  label,
  value,
  onChange,
  isError,
  usedWithDateTimePicker,
  ...otherProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    formik?.handleChange(e);
  };

  const isTouched = formik?.touched[name];
  const error = usedWithDateTimePicker
    ? undefined
    : isError !== undefined
    ? isError
    : isTouched && formik?.errors[name];

  return (
    <TextField
      fullWidth
      error={Boolean(error)}
      helperText={error && <span style={helperTextStyle}>{error}</span>}
      label={label}
      name={name}
      onBlur={formik?.handleBlur}
      onChange={handleChange}
      value={value ?? formik?.values[name]}
      inputProps={{
        style: {
          fontSize: '1rem',
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: '1rem',
        },
      }}
      {...otherProps}
    />
  );
};

export default CustomTextField;
