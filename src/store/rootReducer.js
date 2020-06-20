import { combineReducers } from "redux";
import authReducer from "./redux/reducers/authReducer";
import errorReducer from "./redux/reducers/errorReducer";
import utilReducer from "./redux/reducers/utilReducer";

const rootReducer = combineReducers({
	authReducer,
	errorReducer,
	utilReducer,
});

export default rootReducer;
