import { call, put, takeLatest } from "redux-saga/effects";
import { callDealCouponGetApi, callDealCouponPostApi, callDealCouponUpdateApi } from "../Context/dealCouponApi";
import { onGetDealCoupon, onGetDealCouponError, onGetDealCouponSuccess, onPostDealCoupon, onPostDealCouponError, onPostDealCouponSuccess, onUpdateDealCoupon, onUpdateDealCouponError, onUpdateDealCouponSuccess } from "../Store/Slices/dealCouponSlice";

function* GetDealCoupon() {
  try {
    const getDealCouponResponse = yield call(callDealCouponGetApi);
    if (getDealCouponResponse.httpStatusCode === "200") {
      yield put(
        onGetDealCouponSuccess({
          data: getDealCouponResponse.response,
          message: getDealCouponResponse.errorMessage,
          status_code:getDealCouponResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetDealCouponError({
          data: getDealCouponResponse.response,
          message: getDealCouponResponse.response.message,
          status_code:getDealCouponResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetDealCouponError({ data: [], message, status_code: 400 }));
  }
}
function* PostDealCoupon({ payload }) {
  try {
    const postDealCouponResponse = yield call(callDealCouponPostApi, payload);
    if (postDealCouponResponse.httpStatusCode === "201") {
      yield put(
        onPostDealCouponSuccess({
          postData: postDealCouponResponse.response,
          message: postDealCouponResponse.errorMessage,
          status_code: postDealCouponResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostDealCouponError({
          data: postDealCouponResponse.response,
          message: postDealCouponResponse.errorMessage,
          status_code:postDealCouponResponse.httpStatusCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostDealCouponError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateDealCoupon({ payload }) {
  try {
    const updateDealCouponResponse = yield call(callDealCouponUpdateApi, payload);
    if (updateDealCouponResponse.httpStatusCode === "201") {
      yield put(
        onUpdateDealCouponSuccess({
          status_code: updateDealCouponResponse.httpStatusCode,
          message: updateDealCouponResponse.errorMessage,
          data:updateDealCouponResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealCouponError({
          status_code: updateDealCouponResponse.httpStatusCode,
          message: updateDealCouponResponse.errorMessage,
          data:updateDealCouponResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateDealCouponError({ data: {}, message, status_code: 400 }));
  }
}
export default function* dealCouponSaga() {
  yield takeLatest(onGetDealCoupon.type, GetDealCoupon);
  yield takeLatest(onPostDealCoupon.type, PostDealCoupon);
  yield takeLatest(onUpdateDealCoupon.type, UpdateDealCoupon);
}
