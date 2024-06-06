import { call, put, takeLatest } from "redux-saga/effects";
import { onGetProductContent, onGetProductContentError, onGetProductContentSuccess } from "../Store/Slices/productContentSlice";
import { callProductContentApi } from "../Context/productContentApi";

function* productContent({ payload }) {
  try {
    const productContentResponse = yield call(callProductContentApi, payload);
    if (productContentResponse.httpStatusCode === "201") {
      yield put(
        onGetProductContentSuccess({
          data: productContentResponse.response,
          message: productContentResponse.errorMessage,
          status_code: productContentResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetProductContentError({
          data: productContentResponse.response,
          message: productContentResponse.errorMessage,
          status_code: productContentResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetProductContentError({ data: {}, message, status_code: 400 }));
  }
}

export default function* productContentSaga() {
  yield takeLatest(onGetProductContent.type, productContent);
}
