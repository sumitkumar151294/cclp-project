import { call, put, takeLatest } from "redux-saga/effects";
import { callCouponApi } from "../Context/addCouponApi";
import { onAddCouponSubmit, onAddCouponSubmitError, onAddCouponSubmitSuccess } from "../Store/Slices/addCouponSlice";

function* AddCoupon({ payload }) {
  try {
    const addCouponResponse = yield call(callCouponApi, payload);
    if (addCouponResponse) {
      yield put(
        onAddCouponSubmitSuccess({
          status_code: addCouponResponse?.httpStatusCode,
          message: addCouponResponse?.errorMessage,
          data: addCouponResponse?.response,
        })
      );
    } else {
      yield put(
        onAddCouponSubmitError({
          status_code: addCouponResponse?.httpStatusCode,
          message: addCouponResponse?.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error?.response?.data?.ErrorMessage || "Something went wrong";
    yield put(onAddCouponSubmit({ data: {}, message, status_code: 400 }));
  }
}

export default function* addCouponSaga() {
  yield takeLatest(onAddCouponSubmit.type, AddCoupon);
}
