/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function FormikRating(props) {
  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={
        props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`]
      }
    >
      <FormLabel component="legend">{props.label}</FormLabel>
      <Rating
        name="simple-controlled"
        onBlur={() => {
          props.formik.setFieldTouched([`${props.name}`], true, true);
        }}
        onChange={(event, value) => {
          props.formik.setFieldValue(props.name, value);
        }}
        value={props.formik.values[`${props.name}`]}
        disabled={props.disabled}
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

FormikRating.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

FormikRating.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
};

export default FormikRating;
