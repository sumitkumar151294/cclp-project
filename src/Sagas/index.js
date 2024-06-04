import { all } from "redux-saga/effects";
import moduleSaga from "./moduleSaga";
import loginSaga from "./loginSaga";

export default function* rootSaga() {
  yield all([
    moduleSaga(),
    loginSaga(),
    ]);
}
