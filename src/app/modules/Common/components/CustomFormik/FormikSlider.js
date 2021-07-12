/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
function FormikSlider(props) {
  const [marks, setMarks] = React.useState([
    {
      value: 0,
      label: "0",
    },
  ]);

  React.useEffect(() => {
    if (props.max) {
      let marksToSet = [];
      marksToSet.push({ value: props.min, label: props.min.toString() });

      let half = props.max / 2;
      if (Number.isInteger(half)) {
        marksToSet.push({ value: half, label: half.toString() });
      }

      marksToSet.push({ value: props.max, label: props.max.toString() });

      setMarks(marksToSet);
    }
  }, []);

  return (
    <>
      <FormControl
        fullWidth
        component="fieldset"
        error={
          props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`]
        }
      >
        <FormLabel component="legend">{props.label}</FormLabel>
        <Slider
          name={props.name}
          onBlur={() => {
            props.formik.setFieldTouched([`${props.name}`], true, true);
          }}
          onChange={(event, value) => {
            props.formik.setFieldValue(props.name, value);
          }}
          value={props.formik.values[`${props.name}`]}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={props.step}
          marks={marks}
          min={props.min}
          max={props.max}
          disabled={props.disabled}
        />
        {props.formik.errors[`${props.name}`] &&
          props.formik.touched[`${props.name}`] && (
            <FormHelperText>
              {props.formik.errors[`${props.name}`]}
            </FormHelperText>
          )}
      </FormControl>
    </>
  );
}

FormikSlider.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  marks: PropTypes.array,
};

FormikSlider.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  step: 1,
  min: 0,
  max: 10,
  disabled: false,
};

export default FormikSlider;
