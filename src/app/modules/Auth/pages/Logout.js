/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as auth from "../_redux/authRedux";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Swal from "sweetalert2";
import * as loginRedux from "../_redux/loginRedux";

function Logout() {
  const loginReducer = useSelector(({ loginRemember }) => loginRemember);
  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();
  const dispatch = useDispatch();
  const [second, setSecond] = React.useState(3);

  React.useEffect(() => {
    if (loginReducer.remember) {
      Swal.fire({
        title: 'Log out สำเร็จ',
        text: "Delete Remember ด้วยหรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            dispatch(loginRedux.actions.logoutRemember());
            Swal.fire(
              'Delete success!',
              '',
              'success'
            )
          } catch (error) {
            alert(error);
          } finally {
            dispatch(auth.actions.logout());
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          //todo
          dispatch(auth.actions.logout());
        }
      })
    } else {
      dispatch(auth.actions.logout());
    }

  }, []);

  return (
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
          <Paper elevation={0} style={{ marginTop: 60, padding: 5 }}>
            <img
              className={classes.image}
              alt=""
              src={process.env.PUBLIC_URL + "/logo192.png"}
            />
          </Paper>
          <Typography variant="body1">Log out สำเร็จ</Typography>
          <Typography variant="body1">
            คุณสามารถปิดหน้านี้ได้ {second > 0 && `(${second})`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Logout;
