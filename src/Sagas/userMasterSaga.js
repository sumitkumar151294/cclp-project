import { call, put, takeLatest } from "redux-saga/effects";

import { callUserMasterApi, callUserMasterGetApi, callUserMasterUpdateApi } from "../Context/userMasterApi";
import { onGetuserMaster, onGetuserMasterError, onGetuserMasterSuccess, onPostuserMaster, onPostuserMasterError, onPostuserMasterSuccess, onUpdateuserMaster, onUpdateuserMasterError, onUpdateuserMasterSuccess } from "../Store/Slices/userMasterSlice";
function* userMaster({ payload }) {
  try {
    const userMasterResponse = yield call(callUserMasterApi, payload);
    if (userMasterResponse.errorCode === "201") {
      yield put(
        onPostuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.errorCode
        })
      );
    } else {
      yield put(
        onPostuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_code: userMasterResponse.errorCode
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
    if (userMasterResponse.errorCode === "200") {
      yield put(
        onGetuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.errorCode
        })
      );
    } else {
      yield put(
        onGetuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.errorMessage,
          status_Code:userMasterResponse.errorCode
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
    if (updateUserResponse.errorCode === "201") {
      yield put(
        onUpdateuserMasterSuccess({
          data: updateUserResponse.response,
          message: updateUserResponse.errorMessage,
          status_code:updateUserResponse.errorCode
        })
      );
    } else {
      yield put(
        onUpdateuserMasterError({
          data: updateUserResponse.response,
          message: updateUserResponse.errorMessage,
          status_code:updateUserResponse.errorCode
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
