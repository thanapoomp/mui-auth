/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { useFormik } from "formik";
import { Grid, Button } from "@material-ui/core/";
import { useHistory } from "react-router";
import FormikTimePIcker from "../../../Common/components/CustomFormik/FormikTimePicker";
import FormikRouterPrompt from '../../../Common/components/CustomFormik/FormikRouterPrompt'

// import set นี้ เมื่อใช้ datepicker ทุกครั้ง
// datepicker ในฝั่ง front จะอยู่ใน UTC FormattedDate ต้องแปลงเป็น Local ก่อนยิง API
require("dayjs/locale/th");
var utc = require("dayjs/plugin/utc");
var dayjs = require("dayjs");
dayjs.locale("th");
dayjs.extend(utc);


function FormWithTimePicker() {
  const history = useHistory();
  const [state] = React.useState({
    appointmentTime: dayjs().startOf('day')
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.appointmentTime) {
        errors.appointmentTime = "Required";
      }

      return errors;
    },
    initialValues: {
      birthDate: state.birthDate,
      appointmentTime: state.appointmentDate
    },
    onSubmit: (values) => {
      //แปลงกลับให้เป็น Local DateTime
      let appointmentTime = dayjs(values.appointmentDate).local().format();
      values = {...values,appointmentDate: appointmentTime}
      alert(JSON.stringify(values, null, 2));
      formik.setSubmitting(false);
      formik.resetForm()
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormikRouterPrompt formik={formik}></FormikRouterPrompt>
      <Grid container spacing={3}>

        {/* Start appointmentDate */}
        <Grid item xs={12} lg={3}>
          <FormikTimePIcker
            autoOk
            disablePast
            formik={formik}
            name="appointmentTime"
            label="AppointmentDate"
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

export default FormWithTimePicker;
