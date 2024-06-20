import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleModuleAccessPostApi} from "../Context/userRoleModuleAccessApi";
import {onPostUserRoleModuleAccess, onPostUserRoleModuleAccessError, onPostUserRoleModuleAccessSuccess} from "../Store/Slices/userRoleModuleAccessSlice";

function* PostUserRoleModuleAccess({ payload }) {
  try {
    const postUserRoleModuleAccessResponse = yield call(callUserRoleModuleAccessPostApi, payload);
    if (postUserRoleModuleAccessResponse.httpStatusCode === "201") {
      yield put(
        onPostUserRoleModuleAccessSuccess({
          status_code: postUserRoleModuleAccessResponse.httpStatusCode,
          message: postUserRoleModuleAccessResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onPostUserRoleModuleAccessError({
          data: postUserRoleModuleAccessResponse.result,
          message: postUserRoleModuleAccessResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleModuleAccessError({ data: [], message, status_code: 400 }));
  }
}
export default function* userRoleModuleAccessSaga() {
  yield takeLatest(onPostUserRoleModuleAccess.type, PostUserRoleModuleAccess);
}
