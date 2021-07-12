import React from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router";

function FormikRouterPrompt(props) {
  return (
    <Prompt
      when={props.formik.dirty}
      message={props.message}
    />
  );
}

FormikRouterPrompt.propTypes = {
  formik: PropTypes.object,
  message: PropTypes.string,
};

FormikRouterPrompt.defaultProps = {
  formik: {},
  message: "ฟอร์มมีการแก้ไข ยืนยันที่จะออกจากหน้านี้หรือไม่?",
};

export default FormikRouterPrompt;
