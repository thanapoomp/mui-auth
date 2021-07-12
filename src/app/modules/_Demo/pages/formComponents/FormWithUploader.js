/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikUploader from "../../../Common/components/CustomFormik/FormikUploader";
import * as demoAxios from "../../_redux/demoAxios";

function FormWithUploader() {
  const history = useHistory();
  const [state] = React.useState({
    imageFile: null,
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.imageFile) {
        errors.imageFile = "กรุณาเลือกไฟล์";
      }

      return errors;
    },
    initialValues: {
      imageFile: state.imageFile,
    },
    onSubmit: (values) => {
      demoAxios
        .postFile(values.imageFile)
        .then((res) => {
          alert(JSON.stringify(res.data, null, 2));
          formik.setSubmitting(false);
        })
        .catch((err) => {
          alert(JSON.stringify(err.message, null, 2));
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          ใช้{" "}
          <a
            href="https://yuvaleros.github.io/material-ui-dropzone/"
            target="_blank"
            rel="noopener noreferrer"
          >
            materialui dropzone
          </a>
        </Grid>
        {/* Start Uploader Image */}
        <Grid item xs={12} lg={3}>
          <FormikUploader
            formik={formik}
            name="imageFile"
            label="วางไฟล์ (jpg/png)"
            required
            acceptedFiles={[".jpg", ".png"]}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            fullWidth
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            fullWidth
            onClick={() => {
              history.push("/demo/formDemo");
            }}
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}      
    </form>
  );
}

export default FormWithUploader;
