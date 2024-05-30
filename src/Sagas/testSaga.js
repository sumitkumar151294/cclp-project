import { call, put, takeLatest } from "redux-saga/effects";
import {
  onGetTestMaster,
  onGetTestMasterSuccess,
  onGetTestMasterError
} from "../Store/Slices/testSlice";
import { testApi } from "../Context/testApi";


function* getTestMaster() {
  try {
    const testApiResponse = yield call(testApi);

    if (testApiResponse.httpStatusCode === "200") {
      yield put(
        onGetTestMasterSuccess({
          data: testApiResponse.response,
          message: testApiResponse.errorMessage,
          status_code: testApiResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetTestMasterError({
          data: testApiResponse.response,
          message: testApiResponse.errorMessage,
          status_code: testApiResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetTestMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* testSaga() {
  yield takeLatest(onGetTestMaster.type, getTestMaster);
}
