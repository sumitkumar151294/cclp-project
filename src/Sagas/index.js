import { all } from "redux-saga/effects";
import moduleSaga from "./moduleSaga";
import loginSaga from "./loginSaga";
import customerSegmentSaga from "./customerSegmentSaga";
import productContentSaga from './productContentSaga';

export default function* rootSaga() {
  yield all([
    moduleSaga(),
    loginSaga(),
    customerSegmentSaga(),
    productContentSaga()
    ]);
}
