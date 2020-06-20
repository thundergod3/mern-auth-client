import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../../../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";
import GoogleLogin from "react-google-login";

import Notification from "../../../components/utils/notification/Notification";

const GoogleForm = () => {
	const dispatch = useDispatch();
	const { signInWithGoogleRequest } = authAction;
	const responseGoogle = (response) => dispatch(signInWithGoogleRequest({ idToken: response.tokenId }));

	return (
		<div className="pb-3">
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="btn btn-danger btn-lg btn-block">
						<i className="fa fa-google pr-2"></i>
						Login with Google
					</button>
				)}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
};

export default GoogleForm;
