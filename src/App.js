import React, { useEffect } from "react";

import { Switch, Route, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import authAction from "./store/redux/actions/authAction";

import Header from "./components/layouts/header/Header";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ActivateAccountPage from "./pages/ActivateAccountPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import UpdateAdminPage from "./pages/UpdateAdminPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
	const {
		authReducer: { isAuthenticated },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { checkAuthRequest } = authAction;

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	return (
		<>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/signin" component={SignInPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/auth/activate/:token" component={ActivateAccountPage} />
					<Route path="/update-user" component={UpdateUserPage} />
					<Route path="/update-admin" component={UpdateAdminPage} />
					<Route path="/auth/password/forgot" component={ForgotPasswordPage} />
					<Route path="/auth/password/reset/:token" component={ResetPasswordPage} />
				</Switch>
			</div>
		</>
	);
};

export default withRouter(App);
