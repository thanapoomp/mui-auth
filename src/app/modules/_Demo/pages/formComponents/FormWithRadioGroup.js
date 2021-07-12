/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikRadioGroup from "../../../Common/components/CustomFormik/FormikRadioGroup";
import FormikRouterPrompt from '../../../Common/components/CustomFormik/FormikRouterPrompt'

function FormWithRadioGroup() {
  const history = useHistory();
  
  // Radio Group จำเป็นต้องให้ values เป็น string (ข้อจำกัดของ HTML)
  const [state] = React.useState({
    gender: [
        { id: "1", name: "Male" },
        { id: "2", name: "Female" },
        { id: "3", name: "Unknown" },
    ]
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

    if (values.genderId === '0') {
      errors.genderId = 'Required'
    }

      return errors;
    },
    initialValues: {
      genderId: "0"
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.setSubmitting(false);
      formik.resetForm()
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikRouterPrompt formik={formik}></FormikRouterPrompt>
      <Grid container spacing={3}>
        {/* Gender */}
        <Grid item xs={12} lg={3}>
          <FormikRadioGroup
            formik={formik}
            name="genderId"
            label="Gender"
            data={state.gender}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.dirty}
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
      <br></br>
      dirty: {JSON.stringify(formik.dirty)}
    </form>
  );
}

export default FormWithRadioGroup;
