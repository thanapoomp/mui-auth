/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ColumnDateTime(props) {
  return (
    <Grid
      style={{ padding: 0, margin: 0 }}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      {props.value && dayjs(props.value).format(props.format)}
      {!props.value && props.nullValueText}
    </Grid>
  );
}

ColumnDateTime.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string,
  nullValueText: PropTypes.string
};

ColumnDateTime.defaultProps = {
  value: null,
  format: "DD/MM/YYYY HH:mm:ss",
  nullValueText: ""
};

export default ColumnDateTime;
