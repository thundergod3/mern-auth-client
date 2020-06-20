import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../store/redux/actions/authAction";
import Notification from "../components/utils/notification/Notification";

import { Formik } from "formik";
import * as Yup from "yup";

const UpdateAdminPage = () => {
	const {
		utilReducer: { loadingList },
		errorReducer: { errorList },
		authReducer: { isAuthenticated, adminRole, userInfo },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { checkAuthRequest, updateAdminRequest } = authAction;

	let updateAdminPageLoading;
	const yupSchema = Yup.object({
		name: Yup.string().required(),
		email: Yup.string().required(),
		password: Yup.string().required().min(6, "Password must have less 6 characters"),
	});

	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "signIn") updateAdminPageLoading = loadingList[i];
	}

	useEffect(() => {
		dispatch(checkAuthRequest());
	}, [isAuthenticated]);

	if (isAuthenticated === false) return <Redirect to="/signin" />;

	console.log(adminRole);

	if (isAuthenticated === true && !adminRole) return <Redirect to="/" />;

	return (
		isAuthenticated !== null && (
			<>
				<Notification />
				<Formik
					enableReinitialize
					initialValues={{
						role: userInfo ? userInfo.role : "",
						name: userInfo ? userInfo.name : "",
						email: userInfo ? userInfo.email : "",
						password: "",
					}}
					onSubmit={(values, actions) => {
						dispatch(updateAdminRequest({ name: values.name, password: values.password }));
						actions.resetForm();
					}}
					validationSchema={yupSchema}>
					{(props) => (
						<div className="col-md-6 offset-md-3">
							<h1 className="p-5 text-center">Admin Update</h1>
							<div className="form-group">
								<label className="text-muted">Role</label>
								<input
									type="text"
									// onChange={props.handleChange("role")}
									// onBlur={props.handleBlur("role")}
									className="form-control"
									value={props.values.role}
									disabled
								/>
								{/* {props.touched.role && <p className="text-danger">{props.errors.role}</p>} */}
							</div>
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
									// onChange={props.handleChange("email")}
									// onBlur={props.handleBlur("email")}
									className="form-control"
									value={props.values.email}
									disabled
								/>
								{/* {props.touched.email && <p className="text-danger">{props.errors.email}</p>} */}
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
									{!updateAdminPageLoading ? "Submit" : "Submitting"}
								</button>
							</div>
						</div>
					)}
				</Formik>
			</>
		)
	);
};

export default UpdateAdminPage;
