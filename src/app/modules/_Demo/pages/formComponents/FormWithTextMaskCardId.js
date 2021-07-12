/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { Grid, Button } from "@material-ui/core/";
import {  } from "react-router";
import { validateThaiCitizenID } from '../../../Common/functions/CommonValidators'
import FormikTextMaskCardId from "../../../Common/components/CustomFormik/FormikTextMaskCardId";
import FormikRouterPrompt from '../../../Common/components/CustomFormik/FormikRouterPrompt'


function FormWithTextMaskCardId() {
  const history = useHistory();
  const [state] = React.useState({
    cardId: "1111111111111",
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!validateThaiCitizenID(values.cardId)) {
        errors.cardId = "invalid card id";
      }

      return errors;
    },
    initialValues: {
      cardId: state.cardId,
    },
    onSubmit: (values) => {
      let cardId = values.cardId.replaceAll("-", "").trim();
      values = {...values,cardId: cardId }
      alert(JSON.stringify(values, null, 2));
      formik.setSubmitting(false);
      formik.resetForm()
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikRouterPrompt formik={formik}></FormikRouterPrompt>
      <Grid container spacing={3}>
        {/* Start cardId */}
        <Grid item xs={12} lg={3}>
          <FormikTextMaskCardId
            formik={formik}
            name="cardId"
            label="Card Id"
            required
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

export default FormWithTextMaskCardId;
