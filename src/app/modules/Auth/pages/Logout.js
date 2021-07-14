/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Icon } from "@material-ui/core";
import { useFormik } from "formik";
import * as authRememberLoginRedux from "../_redux/authRememberLoginRedux";
import FormikCheckBox from "../../Common/components/CustomFormik/FormikCheckBox";

function Logout() {

  const loginReducer = useSelector(({ loginRemember }) => loginRemember);
  const authReducer = useSelector(({ auth }) => auth);

  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(auth.actions.logout());

  //   const timeoutID = window.setTimeout(() => {
  //     window.close();
  //   }, 1000);

  //   return () => window.clearTimeout(timeoutID);

  // }, []);

  React.useEffect(() => {
    if (!authReducer.authToken) {
      // window.close();
    }
  }, [authReducer.authToken])

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      //todo

      return errors;
    },
    initialValues: {
      clearRemember: false
    },
    onSubmit: (values) => {
      //submit ....
      if (values.clearRemember) {
        try {

          dispatch(authRememberLoginRedux.actions.logoutRemember());
        } catch (err) {
          alert(err);
        } finally {

          dispatch(auth.actions.logout());
        }
      } else {

        dispatch(auth.actions.logout());
      }
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Helmet>
          <title>Logged out:{CONST.APP_INFO.name}</title>
        </Helmet>
        <Grid container spacing={3}>
          {/* logo */}
          <Grid
            container
            item
            xs={12}
            lg={12}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper elevation={0} style={{ marginTop: 50, padding: 5 }}>
              <img
                className={classes.image}
                alt=""
                src={process.env.PUBLIC_URL + "/logo192.png"}
              />
            </Paper>
            <Typography variant="h5" gutterBottom>LOGOUT</Typography>
            {loginReducer.remember && (
              <Grid item xs={12} lg={12}>
                <FormikCheckBox formik={formik} name="clearRemember" label="เคลียร์ข้อมูลผู้ใช้งาน" />
              </Grid>
            )}
            <Grid
              item
              container
              xs={6}
              lg={6}
              direction="column"
              justify="center"
              alignItems="center"
              style={{ marginTop: 80 }}
            >
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                fullWidth
                color="primary"
                startIcon={<Icon>logout</Icon>}
                variant="contained"
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

export default Logout;
