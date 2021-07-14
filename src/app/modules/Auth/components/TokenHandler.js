/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as authCrud from "../_redux/authCrud";
import * as authAction from "../_redux/authRedux";
import { useDispatch, useSelector } from "react-redux";
import * as authSSOMessage from '../_redux/authSSOMessage'
var dayjs = require("dayjs");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NewTokenHandler() {
  const dispatch = useDispatch();

  //random renew [min,max] second before expire
  //set random to avoid call api renew in the same time
  const [minMaxSecToRenew] = React.useState({
    min: 10,
    max: 600,
  });
  const authReducer = useSelector(({ auth }) => auth);
  var renewTokenTimer;

  React.useEffect(() => {
    if (authReducer.authToken !== "null" && authReducer.authToken !== "") {
      // get expire
      let tokenExpire = authCrud.getExp(authReducer.authToken);
      let countDownSec = getCountDownSec(tokenExpire);
      renewTokenTimer = setTimeout(() => {
        renew();
      }, countDownSec);
    }else{
      console.log("token-update-logout-(TokenHandler)");
      authSSOMessage.sendEventMessage("token-updated", "");
      dispatch(authAction.actions.logout());
    }
    return () => clearTimeout(renewTokenTimer);
  }, [authReducer.authToken]);

  const renew = () => {
    authCrud
      .renewToken()
      .then((res) => {
        if (res.data.isSuccess) {
          let token = res.data.data;
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

          console.log("token-update-renew-(TokenHandler)");
          authSSOMessage.sendEventMessage("token-updated", token);
          dispatch(authAction.actions.renewToken(loginDetail));
        } else {
          alert(res.data.message);
          console.log("token-update-logout-(TokenHandler)");
          authSSOMessage.sendEventMessage("token-updated", "");
          dispatch(authAction.actions.logout());
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log("token-update-logout-(TokenHandler)");
        authSSOMessage.sendEventMessage("token-updated", "");
        dispatch(authAction.actions.logout());
      });
  };

  const getCountDownSec = (tokenExpire) => {
    let secondBeforeExpire =
      getRandomInt(minMaxSecToRenew.min, minMaxSecToRenew.max) * 1000;
    //calculate next renew time duration from now
    let timeToRenew = tokenExpire.add(secondBeforeExpire * -1, "second");

    let result = dayjs().diff(timeToRenew, "second");

    console.log("time(sec):", result);
    return result;
  };

  return <div>{/* {authReducer.authToken} */}</div>;
}

export default NewTokenHandler;
