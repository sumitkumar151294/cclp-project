import { all } from "redux-saga/effects";
import moduleSaga from "./moduleSaga";
import loginSaga from "./loginSaga";

import userRoleSaga from "./userRoleSaga";
import userMasterSaga from "./userMasterSaga";

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



    userRoleSaga(),
    userRoleModulesAccessSaga(),
    userMasterSaga(),

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
