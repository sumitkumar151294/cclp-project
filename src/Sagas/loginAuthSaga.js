import { call, put, takeLatest } from "redux-saga/effects";
import { loginAuthApi } from "../Context/loginAuthApi";
import { onLoginAuthError, onLoginAuthSubmit, onLoginAuthSuccess } from "../Store/Slices/loginAuthSlice";

function* LoginAuth({payload}){
  try{
    const loginAuthResponse=yield call(loginAuthApi,payload);
    if(loginAuthResponse.httpStatusCode==="201"){
      yield put(
        onLoginAuthSuccess({
            data:loginAuthResponse.response,
            message:loginAuthResponse.response
        })
      )
    }
    else{
      yield put(
        onLoginAuthError({
          data: loginAuthResponse.response,
          message: loginAuthResponse.errorMessage,
          status_code:loginAuthResponse.httpStatusCode
        })
      )
    }
  }
  catch(error){
    const message = error.response || "Something went wrong";
    yield put(onLoginAuthError({ data: {}, message, status_code: error?.response?.data?.httpStatusCode }));
  }
}

export default function* loginAuthSaga() {
  yield takeLatest(onLoginAuthSubmit.type, LoginAuth);
}