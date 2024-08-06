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
import sectionMasterSaga from "./sectionMasterSaga";
import SectionContentMasterSaga from "./sectionContentMasterSaga";
import dealCategorySaga from "./dealCategorySaga";
import dealSaga from "./dealSaga";
import dealCouponSaga from "./dealCouponSaga";
import dealCouponCodeSaga from "./dealCouponCodeSaga";
import uploadSaga from "./uploadSaga";
import navConfigureSaga from "./navConfigureSaga";

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
    sectionMasterSaga(),
    SectionContentMasterSaga(),
    dealCategorySaga(),
    dealSaga(),
    dealCouponSaga(),
    dealCouponCodeSaga(),
    uploadSaga(),
    navConfigureSaga()
  ]);
}
