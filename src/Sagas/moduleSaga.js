import { call, put, takeLatest } from "redux-saga/effects";
import { callModuleApi } from "../Context/moduleApi";
import { onGetModule, onGetModuleError, onGetModuleSuccess } from "../Store/Slices/moduleSlice";

function* Module() {
  try {
    const moduleResponse = yield call(callModuleApi);
    if (moduleResponse.httpStatusCode === 200) {

      yield put(
        onGetModuleSuccess({
          data: moduleResponse.response,  
          // message: moduleResponse.response.errorMessage,

        })
      );
    } else {
      yield put(
        onGetModuleError({
          data: moduleResponse.response,

          message: moduleResponse.response.message,

        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetModuleError({ data: {}, message, status_code: 400 }));
  }
}
export default function* moduleSaga() {
  yield takeLatest(onGetModule.type, Module);
}
