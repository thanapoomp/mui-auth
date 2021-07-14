import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


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
  { storage, key: "auth", whitelist: ["user", "authToken", "exp", "roles", "source"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      //login
      case actionTypes.Login: {
        return {
          ...state,
          source: initialAuthState.source,
          user: action.payload.user,
          authToken: action.payload.authToken,
          exp: action.payload.exp,
          roles: [...action.payload.roles],
        };
      }

      case actionTypes.Logout: {
        return {initialAuthState};
      }

      case actionTypes.RenewToken: {
        return {
          ...state,
          source: initialAuthState.source,
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

