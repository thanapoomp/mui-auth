/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as authCrud from "../_redux/authCrud";
import * as authAction from "../_redux/authRedux";
import { useDispatch, useSelector } from "react-redux";
import * as authSSOMessage from '../_redux/authSSOMessage'

function SSOAuth(props) {
  const authReducer = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("token-update-init(SSOAuth)");
    authSSOMessage.sendEventMessage("token-updated", authReducer.authToken);
    // catch local storage event from other page
    // logout listener
    window.addEventListener("storage", handleUpdateToken);
    return () => {
      window.removeEventListener("storage", handleUpdateToken);
    };
  }, []);

  const handleUpdateToken = (e) => {
    //get local storage 'token'
    if (e.key === "persist:auth") {
      let authLocalStorage = JSON.parse(localStorage.getItem("persist:auth"));
      if (authLocalStorage.authToken) {
        let token = authLocalStorage.authToken.replaceAll('"', "");
        if (token !== authReducer.authToken) {
          // debugger
          let loginDetail = {};

          //get token
          loginDetail.authToken = token;

          //get user
          loginDetail.user = authCrud.getUserByToken(token);

          // get exp
          let exp = authCrud.getExp(token);
          loginDetail.exp = exp;

          //get roles
          loginDetail.roles = authCrud.getRoles(token);
          console.log("token-update-renew(SSOAuth)");
          authSSOMessage.sendEventMessage("token-updated", token);
          dispatch(authAction.actions.renewToken(loginDetail));
        }
      } else {
        console.log("token-update-logout(SSOAuth)");
        authSSOMessage.sendEventMessage("token-updated", "");
        dispatch(authAction.actions.logout());
      }
    }
  };

  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

export default SSOAuth;
