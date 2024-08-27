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
    if (translationResponse.errorCode === "200") {
      yield put(
        onTranslationSubmitSuccess({
          status_code: translationResponse?.errorCode,
          message: translationResponse?.errorMessage,
          data: translationResponse?.response
        })
      );
    } else {
      yield put(
        onTranslationSubmitError({
          data: translationResponse?.response,
          status_code: translationResponse?.errorCode,
          message: translationResponse?.errorMessage
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onTranslationSubmitError({ data: {}, message, errorCode: 400 })
    );
  }
}
export default function* translationSaga() {
  yield takeLatest(onTranslationSubmit.type, Translation);
}
