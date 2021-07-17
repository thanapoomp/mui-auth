import { put, takeLatest } from "redux-saga/effects";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as authSSOMessage from "../_redux/authSSOMessage";
export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  RenewToken: "[Renew Token] Action",
};

const initialAuthState = {
  source: "SiamSmile.Dev",
  user: null,
  authToken: null,
  exp: null,
  roles: [],
};

export const reducer = persistReducer(
  { storage, key: "auth", whitelist: ["user", "authToken", "exp", "roles"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      //login
      case actionTypes.Login: {
        authSSOMessage.sendEventMessage(
          "token-updated",
          action.payload.authToken
        );
        return {
          ...state,
          user: action.payload.user,
          authToken: action.payload.authToken,
          exp: action.payload.exp,
          roles: [...action.payload.roles],
        };
      }

      case actionTypes.Logout: {
        return  initialAuthState ;
      }

      case actionTypes.RenewToken: {
        authSSOMessage.sendEventMessage(
          "token-updated",
          action.payload.authToken
        );
        return {
          ...state,
          user: action.payload.user,
          authToken: action.payload.authToken,
          exp: action.payload.exp,
          roles: [...action.payload.roles],
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (payload) => ({ type: actionTypes.Login, payload }),
  logout: () => ({ type: actionTypes.Logout }),
  renewToken: (payload) => ({ type: actionTypes.RenewToken, payload }),
};

export function* saga() {
  // yield takeLatest(actionTypes.ACTIONTYPE, function* actionNameSaga() {
  //   yield put(actions.actionToExecute());
  // });

  yield takeLatest(actionTypes.Logout, function* logoutSaga() {
    yield put(() => {authSSOMessage.sendEventMessage("token-updated", "")});
  });

}