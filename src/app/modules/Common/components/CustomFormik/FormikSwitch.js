/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from 'prop-types'
import Switch from "@material-ui/core/Switch";
import FormControlLabel from '@material-ui/core/FormControlLabel'

function FormikSwitch(props) {
  return (
    <FormControlLabel
      control={
        <Switch
          name={props.name}
          checked={props.formik.values[`${props.name}`]}
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
          color={props.color}
          inputProps={{ "aria-label": "primary checkbox" }}
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
}

FormikSwitch.propTypes = {
    formik: PropTypes.object,
    color: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
}

FormikSwitch.defaultProps = {
    formik: {},
    color: 'primary',
    name:'Do not forget to set name',
    label: 'Do not forget to set label',
    disabled: false
}

export default FormikSwitch;
