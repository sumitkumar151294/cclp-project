import { call, put, takeLatest } from "redux-saga/effects";
import { onGetModule, onGetModuleError, onGetModuleSuccess, onPostModule, onPostModuleError, onPostModuleSuccess, onUpdateModuleMaster, onUpdateModuleMasterError, onUpdateModuleMasterSuccess } from "../Store/Slices/moduleSlice";
import { callModuleApi, callPostModuleApi } from "../Context/moduleApi";

function* Module() {
  try {
    const moduleResponse = yield call(callModuleApi);
    if (moduleResponse.errorCode === "200") {
      yield put(
        onGetModuleSuccess({
          data: moduleResponse.response,
          message: moduleResponse.response.errorMessage,

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
    yield put(onGetModuleError({ data: [], message, status_code: 400 }));
  }
}
function* PostModule({ payload }) {
  try {
    const postModuleResponse = yield call(callPostModuleApi, payload);
    if (postModuleResponse.errorCode === "201") {
      yield put(
        onPostModuleSuccess({
          postData: postModuleResponse.response,
          message: postModuleResponse.errorMessage,
          errorCode: postModuleResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostModuleError({
          data: postModuleResponse.response,
          message: postModuleResponse.errorMessage,
          status_code:postModuleResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostModuleError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateModuleMaster({ payload }) {
  try {
    const updateModuleMasterResponse = yield call(callPostModuleApi, payload);
    if (updateModuleMasterResponse.errorCode === "201") {
      yield put(
        onUpdateModuleMasterSuccess({
          status_code: updateModuleMasterResponse.errorCode,
          message: updateModuleMasterResponse.errorMessage,
          data:updateModuleMasterResponse.response
        })
      );
    } else {
      yield put(
        onUpdateModuleMasterError({
          status_code: updateModuleMasterResponse.errorCode,
          message: updateModuleMasterResponse.errorMessage,
          data:updateModuleMasterResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateModuleMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* moduleSaga() {
  yield takeLatest(onGetModule.type, Module);
  yield takeLatest(onPostModule.type, PostModule);
  yield takeLatest(onUpdateModuleMaster.type, UpdateModuleMaster);
}
