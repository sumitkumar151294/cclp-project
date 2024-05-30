import { call, put, takeLatest } from "redux-saga/effects";
import {
    onGetFaqMaster,
    onGetFaqMasterSuccess,
    onGetFaqMasterError
} from "../../src/Store/Slices/faqMasterSlice";
import { faqMasterApi } from "../Context/faqMasterApi";


function* getFaqMaster() {
  try {
    const getFaqMasterResponse = yield call(faqMasterApi);

    if (getFaqMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetFaqMasterSuccess({
          data: getFaqMasterResponse.response,
          message: getFaqMasterResponse.errorMessage,
          status_code: getFaqMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetFaqMasterError({
          data: getFaqMasterResponse.response,
          message: getFaqMasterResponse.errorMessage,
          status_code: getFaqMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetFaqMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* faqMasterSaga() {
  yield takeLatest(onGetFaqMaster.type, getFaqMaster);
}
