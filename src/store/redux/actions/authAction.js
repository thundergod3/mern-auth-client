import * as types from "../../../constants/types";

class authAction {
	signInRequest = (userForm) => {
		return {
			type: types.SIGN_IN_REQUEST,
			userForm,
		};
	};
	signInSucceeded = () => {
		return {
			type: types.SIGN_IN_SUCCEEDED,
		};
	};

	signInWithGoogleRequest = (idToken) => {
		return {
			type: types.SIGN_IN_WITH_GOOGLE_REQUEST,
			idToken,
		};
	};
	signInWithGoogleSucceeded = () => {
		return {
			type: types.SIGN_IN_WITH_GOOGLE_SUCCEEDED,
		};
	};

	signInWithFacebookRequest = (fbForm) => {
		return {
			type: types.SIGN_IN_WITH_FACEBOOK_REQUEST,
			fbForm,
		};
	};
	signInWithFacebookSucceeded = () => {
		return {
			type: types.SIGN_IN_WITH_FACEBOOK_SUCCEEDED,
		};
	};

	signUpRequest = (userForm) => {
		return {
			type: types.SIGN_UP_REQUEST,
			userForm,
		};
	};

	signOutRequest = () => {
		return {
			type: types.SIGN_OUT_REQUEST,
		};
	};
	signOutSucceeded = () => {
		return {
			type: types.SIGN_OUT_SUCCEEDED,
		};
	};

	avtivateAccountRequest = (token) => {
		return {
			type: types.ACTIVATE_ACCOUNT_REQUEST,
			token,
		};
	};

	checkAuthRequest = () => {
		return {
			type: types.CHECK_AUTH_REQUEST,
		};
	};
	checkAuthSucceeded = () => {
		return {
			type: types.CHECK_AUTH_SUCCEEDED,
		};
	};
	checkAuthFailed = () => {
		return {
			type: types.CHECK_AUTH_FAILED,
		};
	};

	checAdminRoleSucceeded = () => {
		return {
			type: types.CHECK_ADMIN_ROLE_SUCCEEDED,
		};
	};
	checAdminRoleFailed = () => {
		return {
			type: types.CHECK_ADMIN_ROLE_FALSE,
		};
	};

	getUserSucceeded = (userInfo) => {
		return {
			type: types.GET_USER_SUCCEEDED,
			userInfo,
		};
	};

	updateUserRequest = (userInfo) => {
		return {
			type: types.UPDATE_USER_REQUEST,
			userInfo,
		};
	};

	updateAdminRequest = (userInfo) => {
		return {
			type: types.UPDATE_ADMIN_REQUEST,
			userInfo,
		};
	};

	forgotPasswordRequest = (formForgot) => {
		return {
			type: types.FORGOT_PASSWORD_REQUEST,
			formForgot,
		};
	};

	resetPasswordRequest = (formReset) => {
		return {
			type: types.RESET_PASSWORD_REQUEST,
			formReset,
		};
	};
}

export default new authAction();
