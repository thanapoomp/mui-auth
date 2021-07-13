/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as authCrud from "../_redux/authCrud";
import * as authAction from "../_redux/authRedux";
import * as authSSOMessage from "../_redux/authSSOMessage";
import Hoc from '../../Common/components/Hoc'
import { useDispatch } from "react-redux";

export default function SSOAuth(props) {
  const dispatch = useDispatch();
  const getToken = () => {
    let authLocalStorage = {}
    let token = ''
    try {
      authLocalStorage = JSON.parse(localStorage.getItem("persist:auth"));
      token = authLocalStorage.authToken.replaceAll('"', "");
    } catch (error) {
      
    }
    return token;
  };
  const handleUpdateLogin = (e) => {
    if (e.key === "persist:auth") {
      //get local storage 'token'
      let token = getToken();
      if (token !== "null") {
        let loginDetail = {};
        //get token
        loginDetail.authToken = token;

        //get user
        loginDetail.user = authCrud.getUserByToken(token);

        // get exp
        loginDetail.exp = authCrud.getExp(token);

        //get roles
        loginDetail.roles = authCrud.getRoles(token);

        dispatch(authAction.actions.login(loginDetail));
      }
    }
  };

  React.useEffect(() => {

    //get initial to message SSO
    let token = getToken();
    token = token === "null" ? "" : token;
    authSSOMessage.sendEventMessage("token-updated", token);

    window.addEventListener("storage", handleUpdateLogin);
    return () => {
      window.removeEventListener("storage", handleUpdateLogin);
    };
  }, []);

  return <Hoc>{props.children}</Hoc>;
}
