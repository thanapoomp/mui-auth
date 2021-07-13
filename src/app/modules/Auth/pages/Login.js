/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Grid, Button, Box, Icon, Paper } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import FormikTextField from "../../Common/components/CustomFormik/FormikTextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import * as swal from "../../Common/components/SweetAlert";
import * as authRedux from "../_redux/authRedux";
import * as authCrud from "../_redux/authCrud";

function Login() {
  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();
  const dispatch = useDispatch();
  const [state] = React.useState({
    source: "SiamSmile.Dev",
    username: "test01",
    password: "string",
  });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    initialValues: {
      username: state.username,
      password: state.password,
      source: state.source
    },
    onSubmit: (values) => {
      //submit ....
      authCrud
        .login(values.username, values.password, values.source)
        .then((res) => {
          if (res.data.isSuccess) {
            // debugger
            let loginDetail = {};

            //get token
            loginDetail.authToken = res.data.data;

            //get user
            loginDetail.user = authCrud.getUserByToken(res.data.data);

            // get exp
            loginDetail.exp = authCrud.getExp(res.data.data);

            //get roles
            loginDetail.roles = authCrud.getRoles(res.data.data);

            dispatch(authRedux.actions.login(loginDetail));
          } else {
            //Failed
            swal.swalError("Login failed", res.data.message).then((res) => {
              formik.setSubmitting(false);
            });
          }
        })
        .catch((error) => {
          //Failed
          swal.swalError("Login failed", error.message).then((res) => {
            formik.setSubmitting(false);
            formik.resetForm();
          });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Helmet>
        <title>Login:{CONST.APP_INFO.name}</title>
      </Helmet>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Grid container spacing={3}>
          {/* logo */}
          <Grid
            container
            item
            xs={12}
            lg={12}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Paper elevation={0} style={{ marginTop: 60, padding: 5 }}>
              <img
                className={classes.image}
                alt=""
                src={process.env.PUBLIC_URL + "/logo192.png"}
              />
            </Paper>
          </Grid>

          {/* Start username */}
          <Grid item xs={12} lg={12}>
            <FormikTextField formik={formik} name="username" label="Username" />
          </Grid>

          {/* Start password */}
          <Grid item xs={12} lg={12}>
            <FormikTextField
              formik={formik}
              name="password"
              label="Password"
              password
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            lg={12}
            direction="column"
            justify="center"
            alignItems="center"
          >
            {!formik.isSubmitting && (
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                fullWidth
                color="primary"
                startIcon={<Icon>login</Icon>}
                variant="contained"
              >
                Login
              </Button>
            )}

            {formik.isSubmitting && <CircularProgress size={24} />}
          </Grid>
        </Grid>
      </Box>
      {/* <br></br>
      values: {JSON.stringify(formik.values)}
      <br></br>
      error: {JSON.stringify(formik.errors)}
      <br></br>
      touched: {JSON.stringify(formik.touched)}
      <br></br>
      dirty: {JSON.stringify(formik.dirty)} */}
    </form>
  );
}

export default Login;
