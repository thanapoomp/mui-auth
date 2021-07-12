/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";


function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function FormikTextMaskCardId(props) {
  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <InputLabel htmlFor={`${props.name}-id`}>{props.label}</InputLabel>
      <Input
        value={props.formik.values[`${props.name}`]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        name={props.name}
        id={`${props.name}-id`}
        disabled={props.disabled}
        required={props.required}
        inputComponent={TextMaskCustom}
      />
      {props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`] && (
            <FormHelperText>
              {props.formik.errors[`${props.name}`]}
            </FormHelperText>
          )}
    </FormControl>
  );
}

FormikTextMaskCardId.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

// Same approach for defaultProps too
FormikTextMaskCardId.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
};

export default FormikTextMaskCardId;
