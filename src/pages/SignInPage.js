import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../store/redux/actions/authAction";

import { Formik } from "formik";
import * as Yup from "yup";

import Notification from "../components/utils/notification/Notification";
import GoogleForm from "../components/utils/googleForm/GoogleForm";
import FacebookForm from "../components/utils/facebookForm/FacebookForm";

const SignInPage = () => {
	let [countShowToast, setCountShowToast] = useState(0);
	const {
		utilReducer: { loadingList, showToast },
		errorReducer: { errorList },
		authReducer: { isAuthenticated },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { signInRequest, checkAuthRequest } = authAction;
	let loadingSignIn;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "signIn") loadingSignIn = loadingList[i];
	}

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	useEffect(() => {
		setCountShowToast((countShowToast = countShowToast + 1));
	}, [showToast]);

	const yupSchema = Yup.object({
		email: Yup.string().required(),
		password: Yup.string().required(),
	});

	if (isAuthenticated) return <Redirect to="/" />;

	return (
		isAuthenticated !== null && (
			<>
				<Notification />
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={(values, actions) => {
						dispatch(signInRequest(values));
						actions.resetForm();
					}}
					validationSchema={yupSchema}>
					{(props) => (
						<div className="col-md-6 offset-md-3">
							<h1 className="p-5 text-center">Sign In</h1>
							<GoogleForm />
							<FacebookForm />
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
									{!loadingSignIn ? "Submit" : "Submitting"}
								</button>
							</div>
							<hr />
							<Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
								Forgot Password
							</Link>
						</div>
					)}
				</Formik>
			</>
		)
	);
};

export default SignInPage;
