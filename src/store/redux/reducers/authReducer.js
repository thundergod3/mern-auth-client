import * as types from "../../../constants/types";

const initalState = {
	isAuthenticated: null,
	authenticated: false,
	signUpMessage: "",
	activateAccountMessage: "",
	userInfo: {},
	adminRole: false,
};

const authReducer = (state = initalState, action) => {
	switch (action.type) {
		case types.SIGN_IN_WITH_GOOGLE_SUCCEEDED:
		case types.SIGN_IN_WITH_FACEBOOK_SUCCEEDED:
		case types.SIGN_IN_SUCCEEDED: {
			return {
				...state,
				isAuthenticated: true,
				authenticated: true,
			};
		}

		case types.SIGN_UP_SUCCEEDED: {
			return {
				...state,
				isAuthenticated: true,
				authenticated: true,
			};
		}

		case types.SIGN_OUT_SUCCEEDED: {
			return {
				...state,
				isAuthenticated: false,
				authenticated: false,
				signUpMessage: "",
				userInfo: {},
				adminRole: false,
			};
		}

		case types.CHECK_AUTH_SUCCEEDED: {
			return {
				...state,
				isAuthenticated: true,
				authenticated: true,
			};
		}
		case types.CHECK_AUTH_FAILED: {
			return {
				...state,
				isAuthenticated: false,
				authenticated: false,
			};
		}

		case types.CHECK_ADMIN_ROLE_SUCCEEDED: {
			return {
				...state,
				adminRole: true,
			};
		}
		case types.CHECK_ADMIN_ROLE_SUCCEEDED: {
			return {
				...state,
				adminRole: false,
			};
		}

		case types.ACTIVATE_ACCOUNT_SUCCEEDED: {
			return {
				...state,
				isAuthenticated: true,
				authenticated: true,
			};
		}

		case types.GET_USER_SUCCEEDED: {
			return {
				...state,
				userInfo: action.userInfo,
			};
		}

		default: {
			return state;
		}
	}
};

export default authReducer;
