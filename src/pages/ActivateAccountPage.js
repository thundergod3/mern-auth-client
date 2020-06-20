import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import authAction from "../store/redux/actions/authAction";

import jwt from "jsonwebtoken";

import Notification from "../components/utils/notification/Notification";

const ActivateAccountPage = ({
	match: {
		params: { token },
	},
}) => {
	const [state, setState] = useState({
		name: "",
		token: "",
		show: true,
	});
	const {
		utilReducer: { loadingList },
		errorReducer: { errorList },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { avtivateAccountRequest } = authAction;
	let loadingActivate;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "activateAccount") loadingActivate = loadingList[i];
	}

	const handleSubmit = () => {
		dispatch(avtivateAccountRequest(state.token));
		setState({ ...state, show: false });
	};

	useEffect(() => {
		let { name } = jwt.decode(token);

		if (token) {
			setState({ ...state, name, token });
		}
	}, []);

	return (
		<div className="col-md-6 offset-md-3">
			<Notification typeName={"activateAccount"} />
			<div className="text-center">
				<h1 className="p-5">Hey {state.name}, Ready to activate your account?</h1>
				<button className="btn btn-outline-primary" onClick={() => handleSubmit()}>
					Activate Account
				</button>
			</div>
		</div>
	);
};

export default ActivateAccountPage;
