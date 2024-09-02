import { call, put, takeLatest } from "redux-saga/effects";
import { callDealCouponFreqGetApi, callDealCouponFreqPostApi, callDealCouponFreqUpdateApi } from "../Context/dealCouponFreqApi";
import { onGetDealCouponFreq, onGetDealCouponFreqError, onGetDealCouponFreqSuccess, onPostDealCouponFreq, onPostDealCouponFreqError, onPostDealCouponFreqSuccess, onUpdateDealCouponFreq, onUpdateDealCouponFreqError, onUpdateDealCouponFreqSuccess } from "../Store/Slices/dealCouponFreqSlice";
function* GetDealCouponFreq({ payload }) {
  try {
    const getDealCouponFreqResponse = yield call(callDealCouponFreqGetApi,payload);
    if (getDealCouponFreqResponse.responseCode === "200") {
      yield put(
        onGetDealCouponFreqSuccess({
          data: getDealCouponFreqResponse.response,
          message: getDealCouponFreqResponse.responseMessage,
          status_code:getDealCouponFreqResponse.responseCode
        })
      );
    } else {
      yield put(

        onGetDealCouponFreqError({

          data: getDealCouponFreqResponse.response,
          message: getDealCouponFreqResponse.responseMessage,
          status_code:getDealCouponFreqResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetDealCouponFreqError({ data: [], message, status_code: 400 }));
  }
}
function* PostDealCouponFreq({ payload }) {
  try {
    const postDealCouponFreqResponse = yield call(callDealCouponFreqPostApi, payload);
    if (postDealCouponFreqResponse.responseCode === "201") {
      yield put(
        onPostDealCouponFreqSuccess({
          postData: postDealCouponFreqResponse.response,
          message: postDealCouponFreqResponse.responseMessage,
          status_code: postDealCouponFreqResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostDealCouponFreqError({
          data: postDealCouponFreqResponse.response,
          message: postDealCouponFreqResponse?.responseMessage,
          status_code:postDealCouponFreqResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostDealCouponFreqError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateDealCouponFreq({ payload }) {
  try {
    const updateDealCouponFreqResponse = yield call(callDealCouponFreqUpdateApi, payload);
    if (updateDealCouponFreqResponse.responseCode === "201") {
      yield put(
        onUpdateDealCouponFreqSuccess({
          status_code: updateDealCouponFreqResponse.responseCode,
          message: updateDealCouponFreqResponse.responseMessage,
          data:updateDealCouponFreqResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealCouponFreqError({
          status_code: updateDealCouponFreqResponse.responseCode,
          message: updateDealCouponFreqResponse.responseMessage,
          data:updateDealCouponFreqResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateDealCouponFreqError({ data: {}, message, status_code: 400 }));
  }
}
export default function* sectionMasterSaga() {
  yield takeLatest(onGetDealCouponFreq.type, GetDealCouponFreq);
  yield takeLatest(onPostDealCouponFreq.type, PostDealCouponFreq);
  yield takeLatest(onUpdateDealCouponFreq.type, UpdateDealCouponFreq);
}
