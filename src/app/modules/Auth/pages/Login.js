/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Grid, Button, Box, Icon, Paper } from "@material-ui/core/";
import { useDispatch } from "react-redux";
import FormikTextField from "../../Common/components/CustomFormik/FormikTextField";
import FormikCheckBox from "../../Common/components/CustomFormik/FormikCheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import * as swal from "../../Common/components/SweetAlert";
import { useSelector } from "react-redux";
import * as authRedux from "../_redux/authRedux";
import * as authRememberLoginRedux from "../_redux/authRememberLoginRedux";
import * as authCrud from "../_redux/authCrud";

var CryptoJS = require("crypto-js");

function Login() {
  const loginReducer = useSelector(({ loginRemember }) => loginRemember);
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
  });
  const [pass, setpass] = React.useState("")

  //decrypt pass
  React.useEffect(() => {
    if (loginReducer.password !== null) {
      var bytes = CryptoJS.AES.decrypt(loginReducer.password, 'key');
      setpass(bytes.toString(CryptoJS.enc.Utf8));
    }
  }, [])

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
      username: (loginReducer.remember ? loginReducer.user : ""),
      password: (loginReducer.remember ? pass : ""),
      source: state.source,
      remember: (loginReducer.remember === null ? false : loginReducer.remember)
    },
    onSubmit: (values) => {
      //submit ....
      authCrud
        .login(values.username, values.password, values.source)
        .then((res) => {
          if (res.data.isSuccess) {
            let loginDetail = {};
            let loginRemember = {};

            //set remember password
            //encrypt pass
            let ciphertext = CryptoJS.AES.encrypt(
              values.password,
              "key"
            ).toString();
            loginRemember.user = values.username;
            loginRemember.password = ciphertext;
            loginRemember.remember = values.remember;
            //remember
            dispatch(authRememberLoginRedux.actions.loginRemember(loginRemember));
            //set remember password end


            //set login
            loginDetail.authToken = res.data.data;
            loginDetail.user = authCrud.getUserByToken(res.data.data);
            loginDetail.exp = authCrud.getExp(res.data.data);
            loginDetail.roles = authCrud.getRoles(res.data.data);
            dispatch(authRedux.actions.login(loginDetail));
            //set login end

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

          <Grid item xs={12} lg={12}>
            <FormikCheckBox formik={formik} name="remember" label="Remember me" />
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
