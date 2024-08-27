import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleGetApi, callUserRolePostApi } from "../Context/roleMasterApi";
import { onGetUserRole, onGetUserRoleError, onGetUserRoleSuccess, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess, onUpdateUserRole, onUpdateUserRoleError, onUpdateUserRoleSuccess } from "../Store/Slices/userRoleSlice";
function* GetUserRole() {
  try {
    const getUserRoleResponse = yield call(callUserRoleGetApi);
    if (getUserRoleResponse.errorCode === "200") {
      yield put(
        onGetUserRoleSuccess({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.errorMessage,
          status_code:getUserRoleResponse.errorCode
        })
      );
    } else {
      yield put(
        onGetUserRoleError({
          data: getUserRoleResponse.response,
          message: getUserRoleResponse.response.message,
          status_code:getUserRoleResponse.errorCode
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
    if (postUserRoleResponse.errorCode === "201") {
      yield put(
        onPostUserRoleSuccess({
          postData: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
          errorCode: postUserRoleResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
          status_code:postUserRoleResponse.errorCode
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
    const updateUserRoleResponse = yield call(callUserRolePostApi, payload);    
    if (updateUserRoleResponse.errorCode === "205") {
      yield put(
        onUpdateUserRoleSuccess({
          status_code: updateUserRoleResponse.errorCode,
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
