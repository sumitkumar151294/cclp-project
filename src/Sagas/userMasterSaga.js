import { call, put, takeLatest } from "redux-saga/effects";

import { callUserMasterApi, callUserMasterGetApi, callUserMasterUpdateApi } from "../Context/userMasterApi";
import { onGetuserMaster, onGetuserMasterError, onGetuserMasterSuccess, onPostuserMaster, onPostuserMasterError, onPostuserMasterSuccess, onUpdateuserMaster, onUpdateuserMasterError, onUpdateuserMasterSuccess } from "../Store/Slices/userMasterSlice";
function* userMaster({ payload }) {
  try {
    const userMasterResponse = yield call(callUserMasterApi, payload);
    if (userMasterResponse.httpStatusCode === "201") {
      yield put(
        onPostuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onPostuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostuserMasterError({ data: [], message, status_code: 400 }));
  }
}
function* getUser() {
  try {
    const userMasterResponse = yield call(callUserMasterGetApi);
    if (userMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetuserMasterError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateUser({ payload }) {
  try {
    const updateUserResponse = yield call(callUserMasterUpdateApi, payload);
    if (updateUserResponse.httpStatusCode === "201") {
      yield put(
        onUpdateuserMasterSuccess({
          data: updateUserResponse.response,
          message: updateUserResponse.errorMessage,
          status_code:updateUserResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onUpdateuserMasterError({
          data: updateUserResponse.response,
          message: updateUserResponse.errorMessage,
          status_code:updateUserResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateuserMasterError({ data: [], message, status_code: 400 }));
  }
}
export default function* userMasterSaga() {
  yield takeLatest(onPostuserMaster.type, userMaster);
  yield takeLatest(onGetuserMaster.type, getUser);
  yield takeLatest(onUpdateuserMaster.type, UpdateUser);
}
