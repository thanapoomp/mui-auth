/* eslint-disable no-restricted-imports */
import React from "react";
import Button from "@material-ui/core/Button";
import VisibilityIcon from '@material-ui/icons/Visibility';
import purple from '@material-ui/core/colors/purple'
import PropTypes from "prop-types";

function ViewButton(props) {
  return (
    <Button 
      {...props}
      variant="contained"
      style={{backgroundColor:purple[300]}}
      startIcon={<VisibilityIcon />}
    >{props.children}</Button>
  );
}

ViewButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

ViewButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default ViewButton;
