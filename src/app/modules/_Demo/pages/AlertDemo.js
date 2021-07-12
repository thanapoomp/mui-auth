/* eslint-disable no-restricted-imports */
import React from "react";
import {
  swalConfirm,
  swalInfo,
  swalError,
  swalSuccess,
} from "../../Common/components/SweetAlert";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function AlertDemo() {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://sweetalert2.github.io/#examples"
      >
        Sweet alert 2 Examples
      </a>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/sweetalert2/sweetalert2"
      >
        Sweet alert 2 (Git hub)
      </a>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/sweetalert2/sweetalert2-react-content"
      >
        Sweet alert 2 React content (git hub)
      </a>
      <Grid item>
        <Button
          onClick={() => {
            swalInfo("Hello this is title", "Hello this is message").then(
              (res) => {
                alert(JSON.stringify(res));
              }
            );
          }}
        >
          Info
        </Button>
        <Button
          onClick={() => {
            swalConfirm("Please confirm", "confirm delete this item?").then(
              (res) => {
                alert(JSON.stringify(res));
              }
            );
          }}
        >
          Confirm
        </Button>
        <Button
          onClick={() => {
            swalSuccess("Yes", "Success!").then((res) => {
              alert(JSON.stringify(res));
            });
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            swalError("Error title", "Error message").then((res) => {
              alert(JSON.stringify(res));
            });
          }}
        >
          Error
        </Button>
      </Grid>
    </Grid>
  );
}

export default AlertDemo;
