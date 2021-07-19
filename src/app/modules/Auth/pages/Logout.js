/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Icon } from "@material-ui/core";
import { useFormik } from "formik";
import * as authRememberLoginRedux from "../_redux/authRememberLoginRedux";
import FormikCheckBox from "../../Common/components/CustomFormik/FormikCheckBox";

function Logout() {
  const [showLoginSuccess, setShowLoginSuccess] = React.useState(true)
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

  React.useEffect(() => {
    setTimeout(function () {
      setShowLoginSuccess(false)
    }, 3000);
  }, [])

  const logoutRememberPromise = () =>
    new Promise((resolve) => {
      dispatch(authRememberLoginRedux.actions.logoutRemember());
      resolve();
    });

  const logoutPromise = () =>
    new Promise((resolve) => {
      dispatch(auth.actions.logout());
      resolve();
    });

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      return errors;
    },
    initialValues: {
      clearRemember: false,
    },
    onSubmit: (values) => {
      //submit ....
      if (values.clearRemember) {
        try {
          logoutRememberPromise().then(() => {
            logoutPromise();
          });
        } catch (err) {
          alert(err);
        } finally {
        }
      } else {
        logoutPromise();
      }
    },
  });

  return (
    <React.Fragment>
      {showLoginSuccess ? (
        <CircularProgress></CircularProgress>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
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
              <Paper
                elevation={0}
                style={{ marginTop: 60, marginBottom: 60, overflow: "hidden" }}
              >
                <img
                  className={classes.image}
                  alt=""
                  src={process.env.PUBLIC_URL + "/logo192.png"}
                />
              </Paper>
              {loginReducer.remember && (
                <Grid item xs={12} lg={12}>
                  <FormikCheckBox
                    formik={formik}
                    name="clearRemember"
                    label="เคลียร์ข้อมูลผู้ใช้งาน"
                  />
                </Grid>
              )}
              <Grid
                item
                container
                xs={12}
                lg={12}
                direction="column"
                justify="center"
                alignItems="center"
              >
                {authReducer.authToken && (
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
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </React.Fragment>
  );
}

export default Logout;
