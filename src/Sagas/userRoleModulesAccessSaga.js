import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleModuleAccessGetApi, callUserRoleModuleAccessPostApi} from "../Context/userRoleModuleAccessApi";
import {onGetUserRoleModuleAccess, onGetUserRoleModuleAccessError, onGetUserRoleModuleAccessSuccess, onPostUserRoleModuleAccess, onPostUserRoleModuleAccessError, onPostUserRoleModuleAccessSuccess} from "../Store/Slices/userRoleModuleAccessSlice";

function* GetUserRoleModuleAccess() {
  try {
    const getUserRoleModuleAccessResponse = yield call(callUserRoleModuleAccessGetApi);
    if (getUserRoleModuleAccessResponse.httpStatusCode === "200") {
      yield put(
        onGetUserRoleModuleAccessSuccess({
          data: getUserRoleModuleAccessResponse.response,
          message: getUserRoleModuleAccessResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onGetUserRoleModuleAccessError({
          data: getUserRoleModuleAccessResponse.result,
          message: getUserRoleModuleAccessResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetUserRoleModuleAccessError({ data: [], message, status_code: 400 }));
  }
}
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
  yield takeLatest(onGetUserRoleModuleAccess.type, GetUserRoleModuleAccess);
  yield takeLatest(onPostUserRoleModuleAccess.type, PostUserRoleModuleAccess);
}
