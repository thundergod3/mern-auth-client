import { fork, all } from "redux-saga/effects";
import authSaga from "./saga/authSaga";

export default function* rootSaga() {
	yield all([fork(authSaga)]);
}
