/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikDropdown from "../../../Common/components/CustomFormik/FormikDropdown";
import FormikRouterPrompt from '../../../Common/components/CustomFormik/FormikRouterPrompt'

function FormWithDropdown() {
  const history = useHistory();
  const [state] = React.useState({
    title: [
      { id: 1, name: "Mr." },
      { id: 2, name: "Mrs." },
    ],
    branch: [
        { id: 1, name: "Bangkok" },
        { id: 2, name: "Chiangrai" },
      ],
    selectedTitleId: 0,
    selectedBranchId: 0
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.titleId) {
          errors.titleId='Required'
      }

      return errors;
    },
    initialValues: {
      titleId: state.selectedTitleId,
      branchId: state.selectedBranchId,
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
        {/* Title */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            disableFirstItem
            name="titleId"
            label="Title"
            data={state.title}
            firstItemText="กรุณาเลือก"
          />
        </Grid>

        {/* Branch */}
        <Grid item xs={12} lg={3}>
          <FormikDropdown
            formik={formik}
            disableFirstItem={false}
            name="branchId"
            label="เลือกสาขา"
            data={state.branch}
            firstItemText="ทุกสาขา"
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

export default FormWithDropdown;
