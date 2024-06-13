import { call, put, takeLatest } from "redux-saga/effects";
import { onUserSubmit, onUserSubmitSuccess, onUserSubmitError, onGetUser, onGetUserSuccess, onGetUserError } from "../Store/Slices/userMasterSlice";
import { callUserMasterApi, callUserMasterGetApi } from "../Context/userMasterApi";
function* userMaster({ payload }) {
  try {
    const userMasterResponse = yield call(callUserMasterApi, payload);
    if (userMasterResponse.httpStatusCode === "200") {
      yield put(
        onUserSubmitSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onUserSubmitError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUserSubmitError({ data: {}, message, status_code: 400 }));
  }
}
function* getUser() {
  try {
    const userMasterResponse = yield call(callUserMasterGetApi);
    if (userMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetUserSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetUserError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetUserError({ data: {}, message, status_code: 400 }));
  }
}

export default function* userMasterSaga() {
  yield takeLatest(onUserSubmit.type, userMaster);
  yield takeLatest(onGetUser.type, getUser);
}
