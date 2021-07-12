/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormikTextNumber(props) {
  return (
    <TextField
      name={props.name}
      label={props.label}
      fullWidth
      required={props.required}
      onBlur={props.formik.handleBlur}
      onChange={props.formik.handleChange}
      value={props.formik.values[`${props.name}`]}
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
      helperText={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] &&
        props.formik.errors[`${props.name}`]
      }
      disabled={props.disabled}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}

FormikTextNumber.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

// Same approach for defaultProps too
FormikTextNumber.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
};
