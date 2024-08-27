import { call, put, takeLatest } from "redux-saga/effects";
import { callNavConfigureGetApi, callNavConfigurePostApi } from "../Context/navConfigureApi";
import { onGetNavConfigure, onGetNavConfigureError, onGetNavConfigureSuccess, onPostNavConfigure, onPostNavConfigureError, onPostNavConfigureSuccess, onUpdateNavConfigure, onUpdateNavConfigureError, onUpdateNavConfigureSuccess } from "../Store/Slices/NavConfigurationSlice";
function* GetNavConfigure() {
  try {
    const getNavConfigureResponse = yield call(callNavConfigureGetApi);
    if (getNavConfigureResponse.errorCode === "200") {
      yield put(
        onGetNavConfigureSuccess({
          data: getNavConfigureResponse.response,
          message: getNavConfigureResponse.errorMessage,
          status_code:getNavConfigureResponse.errorCode
        })
      );
    } else {
      yield put(
        onGetNavConfigureError({
          data: getNavConfigureResponse.response,
          message: getNavConfigureResponse.response.message,
          status_code:getNavConfigureResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetNavConfigureError({ data: [], message, status_code: 400 }));
  }
}
function* PostNavConfigure({ payload }) {
  try {
    const postNavConfigureResponse = yield call(callNavConfigurePostApi, payload);
    if (postNavConfigureResponse.errorCode === "201" || postNavConfigureResponse.errorCode === "205") {
      yield put(
        onPostNavConfigureSuccess({
          postData: postNavConfigureResponse.response,
          message: postNavConfigureResponse.errorMessage,
          status_code: postNavConfigureResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostNavConfigureError({
          data: postNavConfigureResponse.response,
          message: postNavConfigureResponse?.data?.errorMessage,
          status_code:postNavConfigureResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostNavConfigureError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateNavConfigure({ payload }) {
  try {
    const updateNavConfigureResponse = yield call(callNavConfigurePostApi, payload);
    if (updateNavConfigureResponse.errorCode === "204") {
      yield put(
        onUpdateNavConfigureSuccess({
          status_code: updateNavConfigureResponse.errorCode,
          message: updateNavConfigureResponse.errorMessage,
          data:updateNavConfigureResponse.response
        })
      );
    } else {
      yield put(
        onUpdateNavConfigureError({
          status_code: updateNavConfigureResponse.errorCode,
          message: updateNavConfigureResponse.errorMessage,
          data:updateNavConfigureResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateNavConfigureError({ data: {}, message, status_code: 400 }));
  }
}
export default function* navConfigureSaga() {
  yield takeLatest(onGetNavConfigure.type, GetNavConfigure);
  yield takeLatest(onPostNavConfigure.type, PostNavConfigure);
  yield takeLatest(onUpdateNavConfigure.type, UpdateNavConfigure);
}
