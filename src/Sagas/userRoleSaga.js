import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleGetApi, callUserRolePostApi, callUserRoleUpdateApi } from "../Context/roleMasterApi";
import { onGetUserRole, onGetUserRoleError, onGetUserRoleSuccess, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess, onUpdateUserRole, onUpdateUserRoleError, onUpdateUserRoleSuccess } from "../Store/Slices/userRoleSlice";
function* GetUserRole() {
  try {
    const getUserRoleResponse = yield call(callUserRoleGetApi);
    if (getUserRoleResponse.httpStatusCode === "200") {
      yield put(
        onGetUserRoleSuccess({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.errorMessage,
          status_code:getUserRoleResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetUserRoleError({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.response.message,
          status_code:getUserRoleResponse.httpStatusCode
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
    if (postUserRoleResponse.httpStatusCode === "201") {
      yield put(
        onPostUserRoleSuccess({
          postData: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
          httpStatusCode: postUserRoleResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
          status_code:postUserRoleResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateUserRole({ payload }) {
  try {
    const updateUserRoleResponse = yield call(callUserRoleUpdateApi, payload);    
    if (updateUserRoleResponse.httpStatusCode === "201") {
      yield put(
        onUpdateUserRoleSuccess({
          status_code: updateUserRoleResponse.httpStatusCode,
          message: updateUserRoleResponse.errorMessage,
          data:updateUserRoleResponse.response
        })
      );
    } else {
      yield put(
        onUpdateUserRoleError({
          data: updateUserRoleResponse.result,
          message: updateUserRoleResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateUserRoleError({ data: {}, message, status_code: 400 }));
  }
}
export default function* userRoleSaga() {
  yield takeLatest(onGetUserRole.type, GetUserRole);
  yield takeLatest(onPostUserRole.type, PostUserRole);
  yield takeLatest(onUpdateUserRole.type, UpdateUserRole);
}
