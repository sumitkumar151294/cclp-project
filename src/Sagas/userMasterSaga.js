import { call, put, takeLatest } from "redux-saga/effects";

import { callUserMasterApi, callUserMasterGetApi } from "../Context/userMasterApi";
import { onGetuserMaster, onGetuserMasterError, onGetuserMasterSuccess, onPostuserMaster, onPostuserMasterError, onPostuserMasterSuccess } from "../Store/Slices/userMasterSlice";
function* userMaster() {
  try {
    const userMasterResponse = yield call(callUserMasterApi);
    if (userMasterResponse.responseCode === "200") {
      yield put(
        onPostuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.responseMessage,
          status_code: userMasterResponse.responseCode
        })
      );
    } else {
      yield put(
        onPostuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.responseMessage,
          status_code: userMasterResponse.responseCode
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
    if (userMasterResponse.responseCode === "200") {
      yield put(
        onGetuserMasterSuccess({
          data: userMasterResponse.response,
          message: userMasterResponse.responseMessage,
          status_Code:userMasterResponse.responseCode
        })
      );
    } else {
      yield put(
        onGetuserMasterError({
          data: userMasterResponse.response,
          message: userMasterResponse.responseMessage,
          status_Code:userMasterResponse.responseCode
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
