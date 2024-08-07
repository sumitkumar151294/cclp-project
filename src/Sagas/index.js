import { all } from "redux-saga/effects";
import userRoleSaga from "./userRoleSaga";
import translationSaga from "./translationSaga";
import userRoleModulesAccessSaga from "./userRoleModulesAccessSaga";
import sectionMasterSaga from "./sectionMasterSaga";
import SectionContentMasterSaga from "./sectionContentMasterSaga";

export default function* rootSaga() {
  yield all([
    translationSaga(),
    userRoleSaga(),
    userRoleModulesAccessSaga(),
    sectionMasterSaga(),
    SectionContentMasterSaga(),
  ]);
}
