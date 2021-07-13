import { combineReducers } from "redux";
// import {all} from "redux-saga/effects";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as loginRemember from "../app/modules/Auth/_redux/loginRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  loginRemember: loginRemember.reducer
});

export function* rootSaga() {
  // yield all([demo.saga()]);
}
