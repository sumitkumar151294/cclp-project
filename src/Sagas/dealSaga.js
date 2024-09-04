import { call, put, takeLatest } from "redux-saga/effects";
import { callDealGetApi, callDealPostApi, callDealUpdateApi } from "../Context/dealApi";
import { onGetDeal, onGetDealError, onGetDealSuccess, onPostDeal, onPostDealError, onPostDealSuccess, onUpdateDeal, onUpdateDealError, onUpdateDealSuccess } from "../Store/Slices/dealSlice";

function* GetDeal() {
  try {
    const getDealResponse = yield call(callDealGetApi);
    if (getDealResponse.responseCode === "200") {
      yield put(
        onGetDealSuccess({
          data: getDealResponse.response,
          message: getDealResponse.responseMessage,
          status_code:getDealResponse.responseCode
        })
      );
    } else {
      yield put(
        onGetDealError({
          data: getDealResponse.response,
          message: getDealResponse.response.message,
          status_code:getDealResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetDealError({ data: [], message, status_code: 400 }));
  }
}
function* PostDeal({ payload }) {
  try {
    const postDealResponse = yield call(callDealPostApi, payload);
    if (postDealResponse.responseCode === "200") {
      yield put(
        onPostDealSuccess({
          postData: postDealResponse.response,
          message: postDealResponse.responseMessage,
          status_code: postDealResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostDealError({
          data: postDealResponse.response,
          message: postDealResponse.responseMessage,
          status_code:postDealResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostDealError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateDeal({ payload }) {
  try {
    const updateDealResponse = yield call(callDealUpdateApi, payload);
    if (updateDealResponse.responseCode === "205") {
      yield put(
        onUpdateDealSuccess({
          status_code: updateDealResponse.responseCode,
          message: updateDealResponse.responseMessage,
          data:updateDealResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealError({
          status_code: updateDealResponse.responseCode,
          message: updateDealResponse.responseMessage,
          data:updateDealResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateDealError({ data: {}, message, status_code: 400 }));
  }
}
export default function* dealSaga() {
  yield takeLatest(onGetDeal.type, GetDeal);
  yield takeLatest(onPostDeal.type, PostDeal);
  yield takeLatest(onUpdateDeal.type, UpdateDeal);
}
