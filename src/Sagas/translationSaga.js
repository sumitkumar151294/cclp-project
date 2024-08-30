import { call, put, takeLatest } from "redux-saga/effects";
import {translationApi} from "../Context/translationApi";
import {
  onTranslationSubmitError,
  onTranslationSubmitSuccess,
  onTranslationSubmit,
} from "../Store/Slices/translationSlice";

function* Translation() {
  try { 
    const translationResponse = yield call(translationApi);
    if (translationResponse.responseCode === "200") {
      yield put(
        onTranslationSubmitSuccess({
          status_code: translationResponse?.responseCode,
          message: translationResponse?.responseMessage,
          data: translationResponse?.response
        })
      );
    } else {
      yield put(
        onTranslationSubmitError({
          data: translationResponse?.response,
          status_code: translationResponse?.responseCode,
          message: translationResponse?.responseMessage
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onTranslationSubmitError({ data: {}, message, responseCode: 400 })
    );
  }
}
export default function* translationSaga() {
  yield takeLatest(onTranslationSubmit.type, Translation);
}
