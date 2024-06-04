import { call, put, takeLatest } from "redux-saga/effects";
import {
  onLoginSubmit,
  onLoginSubmitError,
  onLoginSubmitSuccess,
} from "../Store/Slices/loginSlice";
import { callLoginApi } from "../Context/loginApi";

function* Login({ payload }) {
  try {
    debugger
    const loginResponse = yield call(callLoginApi, payload);
    if (loginResponse) {
      yield put(
        onLoginSubmitSuccess({
          status_code: loginResponse?.httpStatusCode,
          message: loginResponse?.errorMessage,
          data: loginResponse?.response,
        })
      );
    } else {
      yield put(
        onLoginSubmitError({
          status_code: loginResponse?.httpStatusCode,
          message: loginResponse?.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error?.response?.data?.ErrorMessage || "Something went wrong";
    yield put(onLoginSubmitError({ data: {}, message, status_code: 400 }));
  }
}

export default function* loginSaga() {
  yield takeLatest(onLoginSubmit.type, Login);
}
