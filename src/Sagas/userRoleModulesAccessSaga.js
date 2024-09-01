import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRoleModuleAccessGetApi, callUserRoleModuleAccessPostApi} from "../Context/userRoleModuleAccessApi";
import {onGetUserRoleModuleAccess, onGetUserRoleModuleAccessError, onGetUserRoleModuleAccessSuccess, onPostUserRoleModuleAccess, onPostUserRoleModuleAccessError, onPostUserRoleModuleAccessSuccess} from "../Store/Slices/userRoleModuleAccessSlice";

function* GetUserRoleModuleAccess({payload}) {
  try {
    const getUserRoleModuleAccessResponse = yield call(callUserRoleModuleAccessGetApi,payload);
    if (getUserRoleModuleAccessResponse.responseCode === "200") {
      yield put(
        onGetUserRoleModuleAccessSuccess({
          data: getUserRoleModuleAccessResponse.response,
          message: getUserRoleModuleAccessResponse.responseMessage,
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

    const statusCode = postUserRoleModuleAccessResponse.responseCode;

    if (statusCode === "201") {
      yield put(
        onPostUserRoleModuleAccessSuccess({
          status_code: statusCode,
          message: postUserRoleModuleAccessResponse.responseMessage,
        })
      );
    } else if (statusCode === "205") {
      yield put(
        onPostUserRoleModuleAccessSuccess({
          status_code: statusCode,
          message: postUserRoleModuleAccessResponse.responseMessage,
          additional_info: postUserRoleModuleAccessResponse.additionalInfo, // Assuming additional data for 205
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
