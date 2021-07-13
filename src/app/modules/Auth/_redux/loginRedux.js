import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
	LoginRemember: "[LoginRemember] Action",
	LogoutRemember: "[LogoutRemember] Action",
};

const initialAuthState = {
	user: null,
	password: null,
	remember: null,
};

export const reducer = persistReducer(
	{ storage, key: "login-remember", whitelist: ["user", "remember", "password"] },
	(state = initialAuthState, action) => {
		switch (action.type) {
			//login
			case actionTypes.LoginRemember: {
				debugger
				return {
					...state,
					user: action.payload.user,
					password: action.payload.password,
					remember: action.payload.remember,
				};
			}

			case actionTypes.LogoutRemember: {
				return {
					...state,
					user: null,
					password: null,
					remember: null,
				};
			}

			default:
				return state;
		}
	}
);

export const actions = {
	loginRemember: (payload) => ({ type: actionTypes.LoginRemember, payload }),
	logoutRemember: () => ({ type: actionTypes.LogoutRemember }),
};

