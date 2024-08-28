import { call, put, takeLatest } from "redux-saga/effects";

import { callUserMasterApi, callUserMasterGetApi } from "../Context/userMasterApi";
import { onGetuserMaster, onGetuserMasterError, onGetuserMasterSuccess, onPostuserMaster, onPostuserMasterError, onPostuserMasterSuccess } from "../Store/Slices/userMasterSlice";
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
export default function* userMasterSaga() {
  yield takeLatest(onPostuserMaster.type, userMaster);
  yield takeLatest(onGetuserMaster.type, getUser);
}
