import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../../../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Notification from "../../../components/utils/notification/Notification";

const FacebookForm = () => {
	const dispatch = useDispatch();
	const { signInWithFacebookRequest } = authAction;
	const responseFacebook = (response) =>
		dispatch(signInWithFacebookRequest({ userID: response.userID, accessToken: response.accessToken }));

	return (
		<div className="pb-3">
			<FacebookLogin
				appId={process.env.REACT_APP_FACEBOOK_APP_ID}
				autoLoad={false}
				callback={responseFacebook}
				render={(renderProps) => (
					<button onClick={renderProps.onClick} className="btn btn-primary btn-lg btn-block">
						<i className="fa fa-facebook pr-2"></i>
						Login with Facebook
					</button>
				)}
			/>
		</div>
	);
};

export default FacebookForm;
