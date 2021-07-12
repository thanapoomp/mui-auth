/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import { DropzoneArea } from "material-ui-dropzone";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

function FormikUploader(props) {
  // formik need these properties to connect with material ui
  // onBlur
  // onChange
  // value
  // error
  // helperText

  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={props.formik.errors[`${props.name}`]}
    >
      <DropzoneArea
        acceptedFiles={props.acceptedFiles}
        filesLimit={1}
        maxFileSize={props.maxFileSize}
        showPreviewsInDropzone
        disabled={props.disabled}
        dropzoneText={props.label}
        onChange={(files) => {
          props.formik.setFieldValue(props.name, files[0]);
        }}
        onDelete={() => {
          props.formik.setFieldValue(props.name, null);
        }}
      />
      {props.formik.errors[`${props.name}`] && (
        <FormHelperText style={{fontSize:"18px"}}>{props.formik.errors[`${props.name}`]}</FormHelperText>
      )}
    </FormControl>
  );
}

FormikUploader.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  maxFileSize: PropTypes.number,
  acceptedFiles: PropTypes.array,
};

// Same approach for defaultProps too
FormikUploader.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  maxFileSize: 5000000,
  acceptedFiles: [], //ตัวอย่าง {[".jpg",".png"",".xlsx"]}
};

export default FormikUploader;
