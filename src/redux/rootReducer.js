import {combineReducers} from "redux";
// import {all} from "redux-saga/effects";

import * as auth from "../app/modules/Auth/_redux/authRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
});

export function* rootSaga() {
  // yield all([demo.saga()]);
}
