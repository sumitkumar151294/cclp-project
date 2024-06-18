import { all } from "redux-saga/effects";
import moduleSaga from "./moduleSaga";
import loginSaga from "./loginSaga";
import customerSegmentSaga from "./customerSegmentSaga";
import productContentSaga from './productContentSaga';
import productSectionSaga from "./productSectionSaga";
import userRoleSaga from "./userRoleSaga";
import userMasterSaga from "./userMasterSaga";
import clientMasterSaga from "./clientmasterSaga";
import addCouponSaga from "./addCouponSaga";

export default function* rootSaga() {
  yield all([
    moduleSaga(),
    loginSaga(),
    customerSegmentSaga(),
    productContentSaga(),
    productSectionSaga(),
    userRoleSaga(),
    userMasterSaga(),
    clientMasterSaga(),
    addCouponSaga(),
    ]);
}
