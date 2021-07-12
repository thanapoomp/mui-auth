/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React, { useState, useRef } from "react";
import QrReader from "react-qr-reader";
import {
  makeStyles,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import * as swal from "../../Common/components/SweetAlert";
import Link from "@material-ui/core/Link";
import { useFormik } from "formik";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";


const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

function QRReaderDemo(props) {
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const classes = useStyles();
  const qrRef = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};

      return errors;
    },
    initialValues: {
      ddlfacingMode: "environment",
    },
    onSubmit: (values) => {
      formik.setSubmitting(false);
    },
  });

  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  React.useEffect(() => {
    return () => {
      // cleanup
    }
  }, [])

  React.useEffect(() => {
    if (scanResultFile !== "") {
      swal.swalSuccess("Success", scanResultFile);
      setScanResultFile("");
    }
  }, [scanResultFile]);

  React.useEffect(() => {
    if (scanResultWebCam !== "") {
      swal.swalSuccess("Success", scanResultWebCam);
      setScanResultWebCam("");
    }
  }, [scanResultWebCam]);

  return (
    <div>
      <h3>QR Reader</h3>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <h3>Qr Code Scan by Image</h3>
          <QrReader
            ref={qrRef}
            delay={500}
            style={{ width: "100%" }}
            onError={handleErrorFile}
            onScan={handleScanFile}
            legacyMode
            resolution={1000}
          />
          <Button
            className={classes.btn}
            variant="contained"
            color="secondary"
            onClick={onScanFile}
          >
            Scan Qr Code
          </Button>
        </Grid>

        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <h3>Qr Code Scan by Web Cam</h3>
          <TextField
            name="ddlfacingMode"
            label="ประเภทกล้อง"
            fullWidth
            select
            value={formik.values.ddlfacingMode}
            onChange={formik.handleChange}
            style={{ paddingBottom: "10px" }}
          >
            <MenuItem value="environment">environment</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </TextField>

          <QrReader
            delay={300}
            style={{ width: "100%" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
            facingMode={formik.values.ddlfacingMode}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginLeft: 10, marginTop: 20 }}
        >
          <Link
            href={toAbsoluteUrl("/media/images/QRCode_S.png")}
            target="_blank"
            color="textSecondary"
            download
          >
            QR Code
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginLeft: 10, marginTop: 20 }}
        >
          <Link
            href="https://github.com/JodusNodus/react-qr-reader"
            target="_blank"
            color="textSecondary"
            rel="noopener"
          >
            QR Reader React content (git hub)
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          style={{ marginLeft: 10, marginTop: 10 }}
        >
          <Link
            href="https://www.thomasbilliet.com/react-qr-reader/"
            color="textSecondary"
            target="_blank"
            rel="noopener"
          >
            QR Reader React Demo
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default QRReaderDemo;
