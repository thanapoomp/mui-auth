/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from "react";
import { Grid } from "@material-ui/core";
import { Chip, Icon } from "@material-ui/core";
import PropTypes from "prop-types";

function ColumnIsActive(props) {
  return (
    <div>
      {(props.value !== null) && (
        <Grid
          style={{ padding: 0, margin: 0 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Chip
            color="primary"
            icon={(props.value)? <Icon>done</Icon> : <Icon style={{ backgroundColor: "#e57373", color: "#fff" }}>cancel</Icon>}
            style={{ color: "#fff" ,backgroundColor: (props.value)? "":"#e57373"}}
            label={(props.value)? props.activeText: props.inActiveText}
          />
        </Grid>
      )}

      {/* {!props.data && (
        <Grid
          style={{ padding: 0, margin: 0 }}
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Chip
            color="primary"
            icon={
              <Icon
                style={{ backgroundColor: "#e57373", color: "#fff" }}
                className="far fa-times-circle"
              ></Icon>
            }
            style={{ backgroundColor: "#e57373", color: "#fff" }}
            label={props.inActiveText}
          />
        </Grid>
      )} */}
    </div>
  );
}

ColumnIsActive.propTypes = {
  value: PropTypes.bool,
  activeText: PropTypes.string,
  inActiveText: PropTypes.string,
};

ColumnIsActive.defaultProps = {
  value: null,
  activeText: "Active",
  inActiveText: "InActive",
};

export default ColumnIsActive;
