import { call, put, takeLatest } from "redux-saga/effects";
import {
    onGetOfferMaster,
    onGetOfferMasterSuccess,
    onGetOfferMasterError,
} from "../../src/Store/Slices/offerMasterSlice";
import { offerMasterApi } from "../Context/offerMasterApi";


function* getOfferMaster() {
  try {
    const getOfferMasterResponse = yield call(offerMasterApi);

    if (getOfferMasterResponse.httpStatusCode === "200") {
      yield put(
        onGetOfferMasterSuccess({
          data: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onGetOfferMasterError({
          data: getOfferMasterResponse.response,
          message: getOfferMasterResponse.errorMessage,
          status_code: getOfferMasterResponse.httpStatusCode,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetOfferMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* offerMasterSaga() {
  yield takeLatest(onGetOfferMaster.type, getOfferMaster);
}
