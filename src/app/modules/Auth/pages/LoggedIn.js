/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Helmet } from "react-helmet";
import Typography from "@material-ui/core/Typography";
import * as CONST from "../../../../Constant";

function LoggedIn() {
  const useStyle = makeStyles((theme) => ({
    image: {
      width: 100,
      height: 100,
    },
  }));
  const classes = useStyle();
  const [second, setSecond] = React.useState(3);
  React.useEffect(() => {
    // setTimeout(()=>{  }, 5000);

    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (second > 1) {
        setSecond(second - 1);
      } else {
        setSecond(0);
        window.close();
      }
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, [second]);

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
            คุณสามารถปิดหน้านี้ได้ {second > 0 && `(${second})`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoggedIn;
