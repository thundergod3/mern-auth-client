import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";

import Notification from "../components/utils/notification/Notification";

const ForgotPasswordPage = () => {
	const {
		utilReducer: { loadingList, showToast },
		errorReducer: { errorList },
		authReducer: { isAuthenticated, userInfo },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { forgotPasswordRequest, checkAuthRequest } = authAction;
	let loadingForgotPassword;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "forgotPassword") loadingForgotPassword = loadingList[i];
	}

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	const yupSchema = Yup.object({
		email: Yup.string().required(),
	});

	return (
		isAuthenticated !== null && (
			<>
				<Notification />
				<Formik
					enableReinitialize
					initialValues={{
						email: "",
					}}
					onSubmit={(values, actions) => {
						dispatch(forgotPasswordRequest(values));
						actions.resetForm();
					}}
					validationSchema={yupSchema}>
					{(props) => (
						<div className="col-md-6 offset-md-3">
							<h1 className="p-5 text-center">Forgot Password</h1>
							<div className="form-group">
								<label className="text-muted">Email</label>
								<input
									type="text"
									onChange={props.handleChange("email")}
									onBlur={props.handleBlur("email")}
									className="form-control"
									value={props.values.email}
								/>
								{props.touched.email && <p className="text-danger">{props.errors.email}</p>}
							</div>{" "}
							<div>
								<button className="btn btn-primary" onClick={props.handleSubmit}>
									{!loadingForgotPassword ? "Request password reset link" : "Submitting"}
								</button>
							</div>
						</div>
					)}
				</Formik>
			</>
		)
	);
};

export default ForgotPasswordPage;
