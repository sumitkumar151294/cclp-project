import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleModuleAccessGetApi, callUserRoleModuleAccessPostApi, callUserRoleModuleAccessUpdateApi} from "../Context/userRoleModuleAccessApi";
import {onGetUserRoleModuleAccess, onGetUserRoleModuleAccessError, onGetUserRoleModuleAccessSuccess, onPostUserRoleModuleAccess, onPostUserRoleModuleAccessError, onPostUserRoleModuleAccessSuccess, onUpdateUserRoleModuleAccess, onUpdateUserRoleModuleAccessError, onUpdateUserRoleModuleAccessSuccess} from "../Store/Slices/userRoleModuleAccessSlice";

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
function* UpdateUserRoleModuleAccess({ payload }) {
  try {
    const updateUserRoleModuleAccessResponse = yield call(callUserRoleModuleAccessUpdateApi, payload);
    if (updateUserRoleModuleAccessResponse.httpStatusCode === "201") {
      yield put(
        onUpdateUserRoleModuleAccessSuccess({
          status_code: updateUserRoleModuleAccessResponse.httpStatusCode,
          message: updateUserRoleModuleAccessResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onUpdateUserRoleModuleAccessError({
          data: updateUserRoleModuleAccessResponse.result,
          message: updateUserRoleModuleAccessResponse.result.message,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateUserRoleModuleAccessError({ data: [], message, status_code: 400 }));
  }
}
export default function* userRoleModuleAccessSaga() {
  yield takeLatest(onGetUserRoleModuleAccess.type, GetUserRoleModuleAccess);
  yield takeLatest(onPostUserRoleModuleAccess.type, PostUserRoleModuleAccess);
  yield takeLatest(onUpdateUserRoleModuleAccess.type, UpdateUserRoleModuleAccess);
}
