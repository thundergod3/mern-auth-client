import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";

import Notification from "../components/utils/notification/Notification";

const ResetPasswordPage = ({
	match: {
		params: { token },
	},
	history,
}) => {
	const {
		utilReducer: { loadingList, showToast },
		errorReducer: { errorList },
		authReducer: { isAuthenticated, userInfo },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { resetPasswordRequest, checkAuthRequest } = authAction;
	let loadingResetPassword;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "resetPassword") loadingResetPassword = loadingList[i];
	}

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	const yupSchema = Yup.object({
		newPassword: Yup.string().required().min(6, "Password must have less 6 characters"),
	});

	if (isAuthenticated === false) return <Redirect to="/signin" />;

	return (
		isAuthenticated !== null && (
			<>
				<Notification />
				<Formik
					enableReinitialize
					initialValues={{
						name: token ? jwt.decode(token).name : "",
						newPassword: "",
					}}
					onSubmit={(values, actions) => {
						dispatch(resetPasswordRequest({ newPassword: values.newPassword, resetPasswordLink: token }));
						actions.resetForm();
						history.push("/");
					}}
					validationSchema={yupSchema}>
					{(props) => (
						<div className="col-md-6 offset-md-3">
							<h1 className="p-5 text-center">Hey {props.values.name}, Type your new password</h1>
							<div className="form-group">
								<label className="text-muted">New Password</label>
								<input
									type="password"
									onChange={props.handleChange("newPassword")}
									onBlur={props.handleBlur("newPassword")}
									className="form-control"
									value={props.values.newPassword}
									placeholder="Type new password"
								/>
								{props.touched.newPassword && <p className="text-danger">{props.errors.newPassword}</p>}
							</div>
							<div>
								<button className="btn btn-primary" onClick={props.handleSubmit}>
									{!loadingResetPassword ? "Reset password" : "Submitting"}
								</button>
							</div>
						</div>
					)}
				</Formik>
			</>
		)
	);
};

export default ResetPasswordPage;
