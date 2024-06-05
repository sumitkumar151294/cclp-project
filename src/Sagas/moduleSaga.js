import { call, put, takeLatest } from "redux-saga/effects";
import { onGetModule, onGetModuleError, onGetModuleSuccess } from "../Store/Slices/moduleSlice";
import { callModuleApi } from "../Context/ModuleApi";


function* Module() {
  try {
    const moduleResponse = yield call(callModuleApi);
    if (moduleResponse.httpStatusCode === "201") {
      yield put(
        onGetModuleSuccess({
          data: moduleResponse.response,  
          //message: moduleResponse.response.errorMessage,

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
