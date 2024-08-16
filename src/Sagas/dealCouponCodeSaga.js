import { call, put, takeLatest } from "redux-saga/effects";
import { onGetDealCouponCode, onGetDealCouponCodeError, onGetDealCouponCodeSuccess, onPostDealCouponCode, onPostDealCouponCodeError, onPostDealCouponCodeSuccess, onUpdateDealCouponCode, onUpdateDealCouponCodeError, onUpdateDealCouponCodeSuccess } from "../Store/Slices/dealCouponCodeSlice";
import { callDealCouponCodeGetApi, callDealCouponCodePostApi, callDealCouponCodeUpdateApi } from "../Context/dealCouponCodeApi";
function* GetDealCouponCode() {
  try {
    const getDealCouponCodeResponse = yield call(callDealCouponCodeGetApi);
    if (getDealCouponCodeResponse.httpStatusCode === "200") {
      yield put(
        onGetDealCouponCodeSuccess({
          data: getDealCouponCodeResponse.response,
          message: getDealCouponCodeResponse.errorMessage,
          status_code:getDealCouponCodeResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetDealCouponCodeError({
          data: getDealCouponCodeResponse.response,
          message: getDealCouponCodeResponse.response.message,
          status_code:getDealCouponCodeResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetDealCouponCodeError({ data: [], message, status_code: 400 }));
  }
}
function* PostDealCouponCode({ payload }) {
  try {
    const postDealCouponCodeResponse = yield call(callDealCouponCodePostApi, payload);
    if (postDealCouponCodeResponse.httpStatusCode === "201") {
      yield put(
        onPostDealCouponCodeSuccess({
          postData: postDealCouponCodeResponse.response,
          message: postDealCouponCodeResponse.errorMessage,
          status_code: postDealCouponCodeResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostDealCouponCodeError({
          data: postDealCouponCodeResponse.response,
          message: postDealCouponCodeResponse.errorMessage,
          status_code:postDealCouponCodeResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostDealCouponCodeError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateDealCouponCode({ payload }) {
  try {
    const updateDealCouponCodeResponse = yield call(callDealCouponCodeUpdateApi, payload);
    if (updateDealCouponCodeResponse.httpStatusCode === "205") {
      yield put(
        onUpdateDealCouponCodeSuccess({
          status_code: updateDealCouponCodeResponse.httpStatusCode,
          message: updateDealCouponCodeResponse.errorMessage,
          data:updateDealCouponCodeResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealCouponCodeError({
          status_code: updateDealCouponCodeResponse.httpStatusCode,
          message: updateDealCouponCodeResponse.errorMessage,
          data:updateDealCouponCodeResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateDealCouponCodeError({ data: {}, message, status_code: 400 }));
  }
}
export default function* dealCouponCodeSaga() {
  yield takeLatest(onGetDealCouponCode.type, GetDealCouponCode);
  yield takeLatest(onPostDealCouponCode.type, PostDealCouponCode);
  yield takeLatest(onUpdateDealCouponCode.type, UpdateDealCouponCode);
}
