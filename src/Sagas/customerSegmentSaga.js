import { call, put, takeLatest } from "redux-saga/effects";
import { onGetCustomerSegement, onGetCustomerSegementError, onGetCustomerSegementSuccess } from "../Store/Slices/customerSegementSlice";
import { callCustomerSegApi } from "../Context/customerSegmentApi";
function* customerSegment({ payload }) {
  try {
    debugger
    const customerSegmentResponse = yield call(callCustomerSegApi, payload);
    if (customerSegmentResponse.httpStatusCode === "201") {
      yield put(
        onGetCustomerSegementSuccess({
          data: customerSegmentResponse.response,
          message: customerSegmentResponse.errorMessage,
          status_code: customerSegmentResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetCustomerSegementError({
          data: customerSegmentResponse.response,
          message: customerSegmentResponse.errorMessage,
          status_code: customerSegmentResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetCustomerSegementError({ data: {}, message, status_code: 400 }));
  }
}

export default function* customerSegmentSaga() {
  yield takeLatest(onGetCustomerSegement.type, customerSegment);
}
