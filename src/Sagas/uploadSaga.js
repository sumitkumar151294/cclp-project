import { call, put, takeLatest } from "redux-saga/effects";
import { calluploadApi } from "../Context/uploadApi";
import { onPostuploadImage, onPostuploadImageError, onPostuploadImageSuccess, onPostuploadMobileImage, onPostuploadMobileImageError, onPostuploadMobileImageSuccess } from "../Store/Slices/uploadSlice";


function* PostuploadImage({ payload }) {

  try {
    const postuploadImageResponse = yield call(calluploadApi, payload);
    if (postuploadImageResponse.errorCode === "201") {
      yield put(
        onPostuploadImageSuccess({
          postData: postuploadImageResponse.response,
          message: postuploadImageResponse.errorMessage,
          status_code: postuploadImageResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostuploadImageError({
          data: postuploadImageResponse.response,
          message: postuploadImageResponse?.data?.errorMessage,
          status_code:postuploadImageResponse.errorCode
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
    if (postuploadMobileImageResponse.errorCode === "201") {
      yield put(
        onPostuploadMobileImageSuccess({
          postData: postuploadMobileImageResponse.response,
          message: postuploadMobileImageResponse.errorMessage,
          status_code: postuploadMobileImageResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostuploadMobileImageError({
          data: postuploadMobileImageResponse.response,
          message: postuploadMobileImageResponse?.data?.errorMessage,
          status_code:postuploadMobileImageResponse.errorCode
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
