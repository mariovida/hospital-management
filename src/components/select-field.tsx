import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { styled } from "@mui/material/styles";
import customColors from "@src/theme/colors";

type SelectFieldProps = {
  formik: any;
  name: string;
  label: string;
  options?: { label: string; value: any }[];
  defaultOptionLabel?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  onChange?: (selectedOption: any) => void;
};

const helperTextStyle = {
  fontSize: "0.8rem",
  fontWeight: "500",
  color: "#d32f2f",
  marginTop: "3px",
  marginLeft: "14px",
};

const CustomSelectField: React.FC<SelectFieldProps> = ({
  formik,
  name,
  label,
  options,
  defaultOptionLabel = "Select an option",
  multiple = false,
  children,
  onChange,
  ...otherProps
}) => {
  const childrenArray = options
    ? [
        <MenuItem key="default" value="" disabled>
          {defaultOptionLabel}
        </MenuItem>,
        ...options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        )),
      ]
    : React.Children.toArray(children);

  const handleChange = (event: SelectChangeEvent<any>) => {
    formik.handleChange(
      event as unknown as React.ChangeEvent<{ name?: string; value: unknown }>
    );
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={Boolean(formik.touched[name] && formik.errors[name])}
      sx={{
        "@media screen and (max-width:900px)": {
          marginBottom: "16px",
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple={multiple}
        name={name}
        onBlur={formik.handleBlur}
        onChange={handleChange}
        value={multiple ? formik.values[name] || [] : formik.values[name]}
        label={label}
        inputProps={{
          style: {
            fontSize: "22rem",
          },
        }}
        {...otherProps}
      >
        {childrenArray}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <div style={helperTextStyle}>{formik.errors[name]}</div>
      )}
    </FormControl>
  );
};

export default CustomSelectField;
