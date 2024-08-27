import { call, put, takeLatest } from "redux-saga/effects";
import { callCustomerSegmentGetApi } from "../Context/customerSegmentApi";
import { onGetCustomerSegment, onGetCustomerSegmentError, onGetCustomerSegmentSuccess } from "../Store/Slices/customerSegmentSlice";
function* customerSegment({ payload }) {
  try {
    const customerSegmentResponse = yield call(callCustomerSegmentGetApi, payload);
    if (customerSegmentResponse.httpStatusCode === "200") {
      yield put(
        onGetCustomerSegmentSuccess({
          data: customerSegmentResponse.response,
          message: customerSegmentResponse.errorMessage,
          status_code: customerSegmentResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetCustomerSegmentError({
          data: customerSegmentResponse.response,
          message: customerSegmentResponse.errorMessage,
          status_code: customerSegmentResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetCustomerSegmentError({ data: {}, message, status_code: 400 }));
  }
}

export default function* customerSegmentSaga() {
  yield takeLatest(onGetCustomerSegment.type, customerSegment);
}