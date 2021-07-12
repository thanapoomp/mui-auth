/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikCheckBoxGroup from "../../../Common/components/CustomFormik/FormikCheckBoxGroup";
import FormikRouterPrompt from "../../../Common/components/CustomFormik/FormikRouterPrompt";

function FormWithCheckboxGroup() {
  const history = useHistory();
  const [state] = React.useState({
    hobbyList: [
      { id: 1, name: "Games" },
      { id: 2, name: "Shopping" },
      { id: 3, name: "Jogging" },
    ],
    selectedHobbies: [1, 2],
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (values.selectedHobbies.length === 0) {
        errors.selectedHobbies = "Please choose at least 1 hobby";
      }

      return errors;
    },
    initialValues: {
      selectedHobbies: state.selectedHobbies,
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
        {/* Hobby */}
        <Grid item xs={12} lg={6}>
          <FormikCheckBoxGroup
            formik={formik}
            name="selectedHobbies"
            label="Hobbies"
            data={state.hobbyList}
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

export default FormWithCheckboxGroup;
