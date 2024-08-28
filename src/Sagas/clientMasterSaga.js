import { call, put, takeLatest } from "redux-saga/effects";
import { onGetClientMaster, onGetClientMasterError, onGetClientMasterSuccess } from "../Store/Slices/clientMasterSlice";
import { callClientMasterGetApi } from "../Context/clientMasterApi";
function* GetClientMaster({ payload }) {
  try {
    const getClientMasterResponse = yield call(callClientMasterGetApi,payload);
    if (getClientMasterResponse.errorCode === "200") {
      yield put(
        onGetClientMasterSuccess({
          data: getClientMasterResponse.response,
          message: getClientMasterResponse.errorMessage,
          status_code:getClientMasterResponse.errorCode
        })
      );
    } else {
      yield put(
        onGetClientMasterError({
          data: getClientMasterResponse.response,
          message: getClientMasterResponse.response.message,
          status_code:getClientMasterResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetClientMasterError({ data: [], message, status_code: 400 }));
  }
}
export default function* clientMasterSaga() {
  yield takeLatest(onGetClientMaster.type, GetClientMaster);
}
