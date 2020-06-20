import * as types from "../../../constants/types";

class utilAction {
	loadingData = (loading) => {
		return {
			type: types.LOADING_DATA,
			loading,
		};
	};
	loadedData = (loadingName) => {
		return {
			type: types.LOADED_DATA,
			loadingName,
		};
	};

	getTypeNameToast = (typeName) => {
		return {
			type: types.GET_TYPE_NAME_TOAST,
			typeName,
		};
	};

	showToastSucceeded = (showToastSucceeded) => {
		return {
			type: types.SHOW_TOAST_SUCCEEDED,
			showToastSucceeded,
		};
	};
	showToastError = (showToastError) => {
		return {
			type: types.SHOW_TOAST_ERROR,
			showToastError,
		};
	};

	getMessageFromServer = (message) => {
		return {
			type: types.GET_MESSAGE_FROM_SERVER,
			message,
		};
	};
	clearMessageFromServer = () => {
		return {
			type: types.CLEAR_MESSAGE_FROM_SERVER,
		};
	};
}

export default new utilAction();
