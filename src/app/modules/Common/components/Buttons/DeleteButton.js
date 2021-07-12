/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(red[400]),
        backgroundColor: red[400],
        '&:hover': {
          backgroundColor: red[700],
        },
      },
  }));

function DeleteButton(props) {
    const classes = useStyles();
  return (
    <Button 
      {...props}
      variant="contained"
      color="secondary"
      className={classes.root}
      startIcon={<DeleteIcon />}
    >{props.children}</Button>
  );
}

DeleteButton.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

DeleteButton.defaultProps = {
  name: 'please-set-name',
  disabled: false,
  label: 'please-set-label',
  fullWidth: true
};

export default DeleteButton;
