/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch } from "react-redux";
import * as auth from "../_redux/authRedux";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

function Logout() {
  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth.actions.logout());

    const timeoutID = window.setTimeout(() => {
      window.close();
    }, 1000);

    return () => window.clearTimeout(timeoutID);
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
            {/* คุณสามารถปิดหน้านี้ได้ {second > 0 && `(${second})`} */}
            คุณสามารถปิดหน้านี้ได้
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Logout;
