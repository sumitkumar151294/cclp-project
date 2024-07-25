import { call, put, takeLatest } from "redux-saga/effects";
import { onGetModule, onGetModuleError, onGetModuleSuccess, onPostModule, onPostModuleError, onPostModuleSuccess } from "../Store/Slices/moduleSlice";
import { callModuleApi, callPostModuleApi } from "../Context/ModuleApi";

function* Module() {
  try {
    const moduleResponse = yield call(callModuleApi);
    if (moduleResponse.httpStatusCode === "200") {
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
function* PostModule({ payload }) {
  try {
    const postModuleResponse = yield call(callPostModuleApi, payload);
    if (postModuleResponse.httpStatusCode === "201") {
      yield put(
        onPostModuleSuccess({
          postData: postModuleResponse.response,
          message: postModuleResponse.errorMessage,
          httpStatusCode: postModuleResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostModuleError({
          data: postModuleResponse.response,
          message: postModuleResponse.errorMessage,
          status_code:postModuleResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostModuleError({ data: [], message, status_code: 400 }));
  }
}
export default function* moduleSaga() {
  yield takeLatest(onGetModule.type, Module);
  yield takeLatest(onPostModule.type, PostModule);
}
