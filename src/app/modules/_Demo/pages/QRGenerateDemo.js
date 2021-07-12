// QRCode ใช้ qrcode.react
// ลิ้งตัวอย่าง: https://github.com/zpao/qrcode.react
// ลิ้งตัวอย่าง: https://zpao.github.io/qrcode.react/

/* eslint-disable no-restricted-imports */
import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
function QRGenerateDemo() {
  var QRCode = require("qrcode.react");

  return (
    <>
      <QRCode
        value={"https://www.siamsmile.co.th/"}
        size={200}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        renderAs={"svg"}
        imageSettings={{
          src:
            "https://image.makewebeasy.net/makeweb/0/NMOB3ab6S/Home/logo.png",
          x: null,
          y: null,
          height: 25,
          width: 25,
          excavate: true,
        }}
      />
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        style={{ marginLeft: 10, marginTop: 10 }}
      >
        <Link
          href="https://github.com/zpao/qrcode.react"
          color="textSecondary"
          target="_blank"
          rel="noopener"
        >
          Gennerate qrcode by qrcode.react content (git hub)
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
          href="https://zpao.github.io/qrcode.react/"
          color="textSecondary"
          target="_blank"
          rel="noopener"
        >
          Examples
        </Link>
      </Grid>
    </>
  );
}

export default QRGenerateDemo;
