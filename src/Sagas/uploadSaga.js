import { call, put, takeLatest } from "redux-saga/effects";
import { calluploadApi } from "../Context/uploadApi";
import { onPostuploadImage, onPostuploadImageError, onPostuploadImageSuccess, onPostuploadMobileImage, onPostuploadMobileImageError, onPostuploadMobileImageSuccess } from "../Store/Slices/uploadSlice";


function* PostuploadImage({ payload }) {

  try {
    const postuploadImageResponse = yield call(calluploadApi, payload);
    if (postuploadImageResponse.responseCode === "201") {
      yield put(
        onPostuploadImageSuccess({
          postData: postuploadImageResponse.response,
          message: postuploadImageResponse.responseMessage,
          status_code: postuploadImageResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostuploadImageError({
          data: postuploadImageResponse.response,
          message: postuploadImageResponse?.data?.responseMessage,
          status_code:postuploadImageResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostuploadImageError({ data: [], message, status_code: 400 }));
  }
}
function* PostuploadMobileImage({ payload }) {

  try {
    const postuploadMobileImageResponse = yield call(calluploadApi, payload);
    if (postuploadMobileImageResponse.responseCode === "201") {
      yield put(
        onPostuploadMobileImageSuccess({
          postData: postuploadMobileImageResponse.response,
          message: postuploadMobileImageResponse.responseMessage,
          status_code: postuploadMobileImageResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostuploadMobileImageError({
          data: postuploadMobileImageResponse.response,
          message: postuploadMobileImageResponse?.data?.responseMessage,
          status_code:postuploadMobileImageResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostuploadMobileImageError({ data: [], message, status_code: 400 }));
  }
}

export default function* uploadSaga() {

  yield takeLatest(onPostuploadImage.type, PostuploadImage);
  yield takeLatest(onPostuploadMobileImage.type, PostuploadMobileImage);

}
