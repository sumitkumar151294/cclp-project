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
import translationSaga from "./translationSaga";
import loginAuthSaga from "./loginAuthSaga";
import userRoleModulesAccessSaga from "./userRoleModulesAccessSaga";
export default function* rootSaga() {
  yield all([
    moduleSaga(),
    loginSaga(),
    loginAuthSaga(),
    translationSaga(),
    customerSegmentSaga(),
    productContentSaga(),
    productSectionSaga(),
    userRoleSaga(),
    userRoleModulesAccessSaga(),
    userMasterSaga(),
    clientMasterSaga(),
    addCouponSaga(),
    ]);
}
