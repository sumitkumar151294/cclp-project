import { call, put, takeLatest } from "redux-saga/effects";
import { onGetsectionMaster, onGetsectionMasterError, onGetsectionMasterSuccess, onPostsectionMaster, onPostsectionMasterError, onPostsectionMasterSuccess, onUpdatesectionMaster, onUpdatesectionMasterError, onUpdatesectionMasterSuccess } from "../Store/Slices/sectionMasterSlice";
import { callsectionMasterGetApi, callsectionMasterPostApi, callsectionMasterUpdateApi } from "../Context/sectionMasterApi";
function* GetsectionMaster() {
  try {
    const getsectionMasterResponse = yield call(callsectionMasterGetApi);
    if (getsectionMasterResponse.errorCode === "200") {
      yield put(
        onGetsectionMasterSuccess({
          data: getsectionMasterResponse.response,
          message: getsectionMasterResponse.errorMessage,
          status_code:getsectionMasterResponse.errorCode
        })
      );
    } else {
      yield put(

        onGetsectionMasterError({

          data: getsectionMasterResponse.response,
          message: getsectionMasterResponse.response.message,
          status_code:getsectionMasterResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetsectionMasterError({ data: [], message, status_code: 400 }));
  }
}
function* PostsectionMaster({ payload }) {
  try {
    const postsectionMasterResponse = yield call(callsectionMasterPostApi, payload);
    if (postsectionMasterResponse.errorCode === "201") {
      yield put(
        onPostsectionMasterSuccess({
          postData: postsectionMasterResponse.response,
          message: postsectionMasterResponse.errorMessage,
          status_code: postsectionMasterResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostsectionMasterError({
          data: postsectionMasterResponse.response,
          message: postsectionMasterResponse?.data?.errorMessage,
          status_code:postsectionMasterResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostsectionMasterError({ data: [], message, status_code: 400 }));
  }
}
function* UpdatesectionMaster({ payload }) {
  try {
    const updatesectionMasterResponse = yield call(callsectionMasterUpdateApi, payload);
    if (updatesectionMasterResponse.errorCode === "201") {
      yield put(
        onUpdatesectionMasterSuccess({
          status_code: updatesectionMasterResponse.errorCode,
          message: updatesectionMasterResponse.errorMessage,
          data:updatesectionMasterResponse.response
        })
      );
    } else {
      yield put(
        onUpdatesectionMasterError({
          status_code: updatesectionMasterResponse.errorCode,
          message: updatesectionMasterResponse.errorMessage,
          data:updatesectionMasterResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdatesectionMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* sectionMasterSaga() {
  yield takeLatest(onGetsectionMaster.type, GetsectionMaster);
  yield takeLatest(onPostsectionMaster.type, PostsectionMaster);
  yield takeLatest(onUpdatesectionMaster.type, UpdatesectionMaster);
}
