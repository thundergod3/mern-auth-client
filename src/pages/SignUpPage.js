import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";

import Notification from "../components/utils/notification/Notification";

const SignUpPage = () => {
	const {
		utilReducer: { loadingList },
		errorReducer: { errorList },
		authReducer: { isAuthenticated },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { signUpRequest, checkAuthRequest } = authAction;
	let loadingSignUp;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "signUp") loadingSignUp = loadingList[i];
	}

	const yupSchema = Yup.object({
		name: Yup.string().required(),
		email: Yup.string().required(),
		password: Yup.string().required().min(6, "Password must have less 6 characters"),
	});

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	if (isAuthenticated) return <Redirect to="/" />;

	console.log(isAuthenticated !== null);

	return (
		isAuthenticated !== null && (
			<>
				<Notification />
				<Formik
					initialValues={{
						name: "",
						email: "",
						password: "",
					}}
					onSubmit={(values, actions) => {
						dispatch(signUpRequest(values));
						actions.resetForm();
					}}
					validationSchema={yupSchema}>
					{(props) => (
						<div className="col-md-6 offset-md-3">
							<h1 className="p-5 text-center">Sign Up</h1>
							<div className="form-group">
								<label className="text-muted">Name</label>
								<input
									type="text"
									onChange={props.handleChange("name")}
									onBlur={props.handleBlur("name")}
									className="form-control"
									value={props.values.name}
								/>
								{props.touched.name && <p className="text-danger">{props.errors.name}</p>}
							</div>
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
							<div className="form-group">
								<label className="text-muted">Password</label>
								<input
									type="password"
									onChange={props.handleChange("password")}
									onBlur={props.handleBlur("password")}
									className="form-control"
									value={props.values.password}
								/>
								{props.touched.password && <p className="text-danger">{props.errors.password}</p>}
							</div>
							<div>
								<button className="btn btn-primary" onClick={props.handleSubmit}>
									{!loadingSignUp ? "Submit" : "Submitting"}
								</button>
							</div>
						</div>
					)}
				</Formik>
			</>
		)
	);
};

export default SignUpPage;
