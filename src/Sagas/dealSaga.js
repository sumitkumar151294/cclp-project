import { call, put, takeLatest } from "redux-saga/effects";
import { callDealGetApi, callDealPostApi, callDealUpdateApi } from "../Context/dealApi";
import { onGetDeal, onGetDealError, onGetDealSuccess, onPostDeal, onPostDealError, onPostDealSuccess, onUpdateDeal, onUpdateDealError, onUpdateDealSuccess } from "../Store/Slices/dealSlice";

function* GetDeal() {
  try {
    const getDealResponse = yield call(callDealGetApi);
    if (getDealResponse.httpStatusCode === "200") {
      yield put(
        onGetDealSuccess({
          data: getDealResponse.response,
          message: getDealResponse.errorMessage,
          status_code:getDealResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetDealError({
          data: getDealResponse.response,
          message: getDealResponse.response.message,
          status_code:getDealResponse.httpStatusCode
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
    if (postDealResponse.httpStatusCode === "201") {
      yield put(
        onPostDealSuccess({
          postData: postDealResponse.response,
          message: postDealResponse.errorMessage,
          status_code: postDealResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostDealError({
          data: postDealResponse.response,
          message: postDealResponse.errorMessage,
          status_code:postDealResponse.httpStatusCode
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
    if (updateDealResponse.httpStatusCode === "201") {
      yield put(
        onUpdateDealSuccess({
          status_code: updateDealResponse.httpStatusCode,
          message: updateDealResponse.errorMessage,
          data:updateDealResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealError({
          status_code: updateDealResponse.httpStatusCode,
          message: updateDealResponse.errorMessage,
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
