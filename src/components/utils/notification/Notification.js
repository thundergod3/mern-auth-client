import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { useSelector } from "react-redux";

const Notification = () => {
	let [showCountToastSucceeded, setShowCountToastSucceeded] = useState(0);
	let [showCountToastError, setShowCountToastError] = useState(0);
	const {
		errorReducer: { errorList },
		authReducer: { userInfo, isAuthenticated },
		utilReducer: { typeName, showToastSucceeded, showToastError, message },
	} = useSelector((state) => state);

	useEffect(() => setShowCountToastSucceeded((showCountToastSucceeded = showCountToastSucceeded + 1)), [
		showToastSucceeded,
	]);

	useEffect(() => setShowCountToastError((showCountToastError = showCountToastError + 1)), [showToastError]);

	if (typeName === "signUp" && showCountToastSucceeded === 2) {
		setShowCountToastSucceeded(0);
		toast.success(message);
	}

	if (
		typeName === "updateUser" &&
		Object.keys(userInfo).length !== 0 &&
		isAuthenticated &&
		showCountToastSucceeded === 2
	) {
		setShowCountToastSucceeded(0);
		toast.success("Profile updated successfully");
	}

	if (
		typeName === "updateAdmin" &&
		Object.keys(userInfo).length !== 0 &&
		isAuthenticated &&
		showCountToastSucceeded === 2
	) {
		setShowCountToastSucceeded(0);
		toast.success("Profile admin updated successfully");
	}

	if (
		typeName === "forgotPassword" &&
		Object.keys(userInfo).length !== 0 &&
		isAuthenticated &&
		showCountToastSucceeded === 2
	) {
		setShowCountToastSucceeded(0);
		toast.success(message);
	}

	if (
		typeName === "resetPassword" &&
		Object.keys(userInfo).length !== 0 &&
		isAuthenticated &&
		showCountToastSucceeded === 2
	) {
		setShowCountToastSucceeded(0);
		toast.success(message);
	}

	if (typeName === "activateAccount" && showCountToastSucceeded === 2) {
		setShowCountToastSucceeded(0);
		toast.success(message);
	}

	if (errorList.length !== 0) {
		for (var i = 0; i < errorList.length; i++) {
			if (errorList[i].name === typeName && showCountToastError === 2) {
				setShowCountToastError(0);
				toast.error(errorList[i].error);
			}
		}
	}

	return (
		<>
			<ToastContainer />
		</>
	);
};

export default Notification;
