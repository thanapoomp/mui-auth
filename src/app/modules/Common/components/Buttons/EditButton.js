/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from "prop-types";

function EditButton(props) {
  return (
    <Button 
      {...props}
      variant="contained"
      color="secondary"
      startIcon={<EditIcon />}
    >{props.children}</Button>
  );
}


EditButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

EditButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default EditButton;
