/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as authCrud from "../_redux/authCrud";
import * as authAction from "../_redux/authRedux";
import * as CONST from '../../../../Constant'
import { useDispatch, useSelector } from "react-redux";

function NewTokenHandler() {
  const dispatch = useDispatch();
  const authReducer = useSelector(({ auth }) => auth);

  const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout;
  
    const runInterval = () => {
      const timeoutFunction = () => {
        intervalFunction();
        runInterval();
      };
  
      const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  
      timeout = setTimeout(timeoutFunction, delay);
    };
  
    runInterval();
  
    return {
      clear() { clearTimeout(timeout) },
    };
  };

  React.useEffect(() => {
    const interval = setRandomInterval(
      () => {
        if (
          authReducer.authToken !== "null" &&
          authReducer.authToken !== "" &&
          authReducer.authToken !== null
        ) {
          renew();
        } else {
          dispatch(authAction.actions.logout());
        }
      },
      CONST.RENEW_TOKEN_MS.min,
      CONST.RENEW_TOKEN_MS.max
    );

    // Clear when dispose
    return () => interval.clear();
  }, []);

  const renew = () => {
    authCrud
      .renewToken()
      .then((res) => {
        // debugger
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

          dispatch(authAction.actions.renewToken(loginDetail));
        } else {
          alert(res.data.message);
          dispatch(authAction.actions.logout());
        }
      })
      .catch((error) => {
        // debugger
          alert(error.message);
          dispatch(authAction.actions.logout());
      });
  };

  return <React.Fragment></React.Fragment>;
}

export default NewTokenHandler;
