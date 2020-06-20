import { takeLatest, call, put, select, takeEvery, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import cookieLocal from "../../helpers/cookieLocal";

import authService from "../../services/authService";

import authAction from "../redux/actions/authAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

function* signIn({ userForm }) {
	yield put(utilAction.loadingData({ name: "signIn", loading: true }));

	try {
		const response = yield authService.login(userForm);
		yield cookieLocal.saveToLocal("userId", response.user._id);
		yield cookieLocal.saveToCookie("token", response.token);
		yield put(authAction.signInSucceeded());
		yield put(utilAction.loadedData("signIn"));
		yield put(errorAction.clearError("signIn"));
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedData("signIn"));
		yield put(errorAction.getError({ name: "signIn", error: error.response.data.error }));
	}
}

function* signInWithGoogle({ idToken }) {
	yield put(utilAction.loadingData({ name: "signInWithGoogle", loading: true }));

	try {
		const response = yield authService.loginWithGoogle(idToken);
		yield cookieLocal.saveToLocal("userId", response.user._id);
		yield cookieLocal.saveToCookie("token", response.token);
		yield put(authAction.signInWithGoogleSucceeded());
		yield put(utilAction.loadedData("signInWithGoogle"));
		yield put(errorAction.clearError("signInWithGoogle"));
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedData("signInWithGoogle"));
		yield put(errorAction.getError({ name: "signInWithGoogle", error: error.response.data.error }));
	}
}

function* signInWithFacebook({ fbForm }) {
	yield put(utilAction.loadingData({ name: "signInWithFacebook", loading: true }));

	try {
		const response = yield authService.loginWithFacebook(fbForm);
		yield cookieLocal.saveToLocal("userId", response.user._id);
		yield cookieLocal.saveToCookie("token", response.token);
		yield put(authAction.signInWithGoogleSucceeded());
		yield put(utilAction.loadedData("signInWithFacebook"));
		yield put(errorAction.clearError("signInWithFacebook"));
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedData("signInWithFacebook"));
		yield put(errorAction.getError({ name: "signInWithFacebook", error: error.response.data.error }));
	}
}

function* signUp({ userForm }) {
	yield put(utilAction.loadingData({ name: "signUp", loading: true }));

	try {
		const response = yield authService.signUp(userForm);
		yield put(utilAction.loadedData("signUp"));
		yield put(errorAction.clearError("signUp"));
		yield put(utilAction.getMessageFromServer(response.message));
		yield put(utilAction.getTypeNameToast("signUp"));
		yield put(utilAction.clearMessageFromServer());
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(utilAction.loadedData("signUp"));
		yield put(errorAction.getError({ name: "signUp", error: error.response.data.error }));
		yield put(utilAction.showToastError(false));
	}
}

function* activateAccount({ token }) {
	yield put(utilAction.loadingData({ name: "activateAccount", loading: true }));

	try {
		const response = yield authService.activateAccount(token);
		yield put(utilAction.loadedData("activateAccount"));
		yield put(errorAction.clearError("activateAccount"));
		yield put(utilAction.getMessageFromServer(response.message));
		yield put(utilAction.getTypeNameToast("activateAccount"));
		yield put(utilAction.clearMessageFromServer());
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(utilAction.loadedData("activateAccount"));
		yield put(errorAction.getError({ name: "activateAccount", error: error.response.data.error }));
		yield put(utilAction.showToastError(false));
	}
}

function* signOut() {
	yield put(authAction.signOutSucceeded());
	yield put(utilAction.getTypeNameToast(""));
	yield cookieLocal.removeFromCookie("token");
	yield cookieLocal.removeFromLocal("userId");
	yield cookieLocal.removeFromLocal("user");
}

function* getUser() {
	yield put(utilAction.loadingData({ name: "getUser", loading: true }));

	try {
		const userId = yield cookieLocal.getFromLocal("userId");
		const token = yield cookieLocal.getFromCookie("token");
		yield authService.attachTokenToHeader(token);
		const response = yield authService.getUser(userId);
		yield cookieLocal.saveToLocal("user", response);

		if (response) {
			if (response.role === "admin") {
				yield put(authAction.checAdminRoleSucceeded());
			}
			yield put(utilAction.loadedData("getUser"));
			yield put(errorAction.clearError("getUser"));

			yield put(authAction.getUserSucceeded(response));
			yield put(authAction.checkAuthSucceeded());
		}
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(utilAction.loadedData("getUser"));
		yield put(errorAction.getError({ name: "getUser", error: error.response.statusText }));
		yield put(utilAction.showToastError(false));

		return error.response.status;
	}
}

function* updateUser({ userInfo }) {
	yield put(utilAction.loadingData({ name: "updateUser", loading: true }));

	try {
		const token = yield cookieLocal.getFromCookie("token");
		yield authService.attachTokenToHeader(token);
		const response = yield authService.updateUser(userInfo);
		yield put(authAction.getUserSucceeded(response));
		yield put(utilAction.loadedData("updateUser"));
		yield put(errorAction.clearError("updateUser"));
		yield put(utilAction.getTypeNameToast("updateUser"));
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getTypeNameToast(""));
		yield put(utilAction.showToastSucceeded(false));
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(errorAction.getError({ name: "updateUser", error }));
		yield put(utilAction.loadedData("updateUser"));
		yield put(utilAction.showToastError(false));
	}
}

function* updateAdmin({ userInfo }) {
	yield put(utilAction.loadingData({ name: "updateAdmin", loading: true }));

	try {
		const token = yield cookieLocal.getFromCookie("token");
		yield authService.attachTokenToHeader(token);
		const response = yield authService.updateAdmin(userInfo);
		yield put(authAction.getUserSucceeded(response));
		yield put(utilAction.loadedData("updateAdmin"));
		yield put(errorAction.clearError("updateAdmin"));
		yield put(utilAction.getTypeNameToast("updateAdmin"));
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getTypeNameToast(""));
		yield put(utilAction.showToastSucceeded(false));
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(errorAction.getError({ name: "updateAdmin", error }));
		yield put(utilAction.loadedData("updateAdmin"));
		yield put(utilAction.showToastError(false));
	}
}

function* forgotPassword({ formForgot }) {
	yield put(utilAction.loadingData({ name: "forgotPassword", loading: true }));
	yield put(utilAction.getTypeNameToast("forgotPassword"));

	try {
		const token = cookieLocal.getFromCookie("token");
		yield authService.attachTokenToHeader(token);
		const response = yield authService.forgotPassword(formForgot);
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getMessageFromServer(response.message));
		yield put(utilAction.loadedData("forgotPassword"));
		yield put(errorAction.clearError("forgotPassword"));
		yield put(utilAction.showToastSucceeded(false));
		yield put(utilAction.clearMessageFromServer());
	} catch (error) {
		yield put(utilAction.showToastError(true));

		console.log(error);
		yield put(utilAction.loadedData("forgotPassword"));
		yield put(errorAction.getError({ name: "forgotPassword", error: error.response.data.error }));
		yield put(utilAction.showToastError(false));
	}
}

function* resetPassword({ formReset }) {
	yield put(utilAction.loadingData({ name: "resetPassword", loading: true }));
	yield put(utilAction.getTypeNameToast("resetPassword"));

	try {
		const token = cookieLocal.getFromCookie("token");
		yield authService.attachTokenToHeader(token);
		const response = yield authService.resetPassword(formReset);
		yield put(utilAction.showToastSucceeded(true));
		yield put(utilAction.getMessageFromServer(response.message));
		yield put(utilAction.loadedData("resetPassword"));
		yield put(errorAction.clearError("resetPassword"));
		yield put(utilAction.showToastSucceeded(false));
		yield put(utilAction.clearMessageFromServer());
	} catch (error) {
		console.log(error);
		yield put(utilAction.showToastError(true));
		yield put(utilAction.loadedData("resetPassword"));
		yield put(errorAction.getError({ name: "resetPassword", error: error.response.data.error }));
		yield put(utilAction.showToastError(false));
	}
}

function* checkAuthentication() {
	const token = yield cookieLocal.getFromCookie("token");

	if (token !== undefined) {
		const status = yield call(getUser);
		yield put(authAction.checkAuthSucceeded());
		if (status === 401) yield call(signOut);
	} else yield put(authAction.checkAuthFailed());
}

export default function* authSaga() {
	yield takeLatest(types.SIGN_IN_REQUEST, signIn);
	yield takeLatest(types.SIGN_IN_WITH_GOOGLE_REQUEST, signInWithGoogle);
	yield takeLatest(types.SIGN_IN_WITH_FACEBOOK_REQUEST, signInWithFacebook);
	yield takeLatest(types.SIGN_UP_REQUEST, signUp);
	yield takeLatest(types.SIGN_OUT_REQUEST, signOut);
	yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
	yield takeLatest(types.UPDATE_ADMIN_REQUEST, updateAdmin);
	yield takeEvery(types.CHECK_AUTH_REQUEST, checkAuthentication);
	yield takeEvery(types.ACTIVATE_ACCOUNT_REQUEST, activateAccount);
	yield takeEvery(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
	yield takeEvery(types.RESET_PASSWORD_REQUEST, resetPassword);
}
