import React from "react";
import { useDispatch } from "react-redux";
import * as auth from "../_redux/authRedux";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as CONST from "../../../../Constant";

function Logout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(auth.actions.logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Helmet>
        <title>Logged out:{CONST.APP_INFO.name}</title>
      </Helmet>
      <Redirect to="/auth/login" />
    </div>
  );
}

export default Logout;
