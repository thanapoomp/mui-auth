/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import {  useSelector } from "react-redux";
import * as CONST from "../../../../Constant";

function LoggedIn() {
  const authReducer = useSelector(({ auth }) => auth);

  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();

  React.useEffect(() => {
    if (authReducer.authToken) {
      window.close();
    }
  }, [authReducer.authToken])

  return (
    <div>
      <Helmet>
        <title>Logged in:{CONST.APP_INFO.name}</title>
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
          <Typography variant="body1">Log in สำเร็จ</Typography>
          <Typography variant="body1">
            {/* คุณสามารถปิดหน้านี้ได้ {second > 0 && `(${second})`} */}
            คุณสามารถปิดหน้านี้ได้
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoggedIn;
