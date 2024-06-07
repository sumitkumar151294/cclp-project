import { call, put, takeLatest } from "redux-saga/effects";
import { callGetProductApi, callPostProductApi } from "../Context/productSecApi";
import { onGetProductSection, onGetProductSectionError, onGetProductSectionSuccess, onPostProductSectionError, onPostProductSectionSuccess, onPostProductSetionSubmit } from "../Store/Slices/productSectionSlice";

function* PostProductSection({ payload }) {
  try {
    const postProductSectionResponse = yield call(callPostProductApi, payload);
    if (postProductSectionResponse.httpStatusCode === "201") {
      yield put(
        onPostProductSectionSuccess({
          data: postProductSectionResponse.response,
          message: postProductSectionResponse.errorMessage,
          status_code: postProductSectionResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostProductSectionError({
          data: postProductSectionResponse.response,
          message: postProductSectionResponse.errorMessage,
          status_code: postProductSectionResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    yield put(
      onPostProductSectionError({
        postData: {},
        message: error?.response?.data?.ErrorMessage,
        postStatus_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}

function* GetProductSection() {
  try {
    const getProductSectionResponse = yield call(callGetProductApi);
    if (getProductSectionResponse.httpStatusCode === "201") {
      yield put(
        onGetProductSectionSuccess({
          getData: getProductSectionResponse.response,
          message: getProductSectionResponse.errorMessage,
          status_code: getProductSectionResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetProductSectionError({
          getData: getProductSectionResponse.response,
          message: getProductSectionResponse.errorMessage,
          status_code: getProductSectionResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.message || "Something went wrong";
    yield put(
      onGetProductSectionError({
        getData: {},
        message,
        status_code: error.response.status,
      })
    );
  }
}

export default function* productSectionSaga() {
  yield takeLatest(onPostProductSetionSubmit.type, PostProductSection);
  yield takeLatest(onGetProductSection.type, GetProductSection);
}
