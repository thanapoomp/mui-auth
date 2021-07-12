/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import PropTypes from "prop-types";

function AddButton(props) {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      name={props.name}
      disabled={props.disabled}
      label={props.label}
      fullWidth={props.fullWidth}
      startIcon={<AddIcon />}
    >{props.children}</Button>
  );
}

AddButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

AddButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default AddButton;
