import { call, put, takeLatest } from "redux-saga/effects";
import { callNavConfigureGetApi, callNavConfigurePostApi } from "../Context/navConfigureApi";
import { onGetNavConfigure, onGetNavConfigureError, onGetNavConfigureSuccess, onPostNavConfigure, onPostNavConfigureError, onPostNavConfigureSuccess } from "../Store/Slices/NavConfigurationSlice";
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

export default function* navConfigureSaga() {
  yield takeLatest(onGetNavConfigure.type, GetNavConfigure);
  yield takeLatest(onPostNavConfigure.type, PostNavConfigure);
}
