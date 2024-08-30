import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleGetApi, callUserRolePostApi } from "../Context/roleMasterApi";
import { onGetUserRole, onGetUserRoleError, onGetUserRoleSuccess, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess } from "../Store/Slices/userRoleSlice";
function* GetUserRole() {
  try {
    const getUserRoleResponse = yield call(callUserRoleGetApi);
    if (getUserRoleResponse.responseCode === "200") {
      yield put(
        onGetUserRoleSuccess({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.responseMessage,
          status_code:getUserRoleResponse.responseCode
        })
      );
    } else {
      yield put(
        onGetUserRoleError({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.response.message,
          status_code:getUserRoleResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetUserRoleError({ data: [], message, status_code: 400 }));
  }
}
function* PostUserRole({ payload }) {
  try {
    const postUserRoleResponse = yield call(callUserRolePostApi, payload);
    if (postUserRoleResponse.responseCode === "201") {
      yield put(
        onPostUserRoleSuccess({
          postData: postUserRoleResponse.response,
          message: postUserRoleResponse.responseMessage,
          responseCode: postUserRoleResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.responseMessage,
          status_code:postUserRoleResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleError({ data: [], message, status_code: 400 }));
  }
}

export default function* userRoleSaga() {
  yield takeLatest(onGetUserRole.type, GetUserRole);
  yield takeLatest(onPostUserRole.type, PostUserRole);

}
