import { call, put, takeLatest } from "redux-saga/effects";
import { onGetMetaData, onGetMetaDataError, onGetMetaDataSuccess, onPostMetaData, onPostMetaDataError, onPostMetaDataSuccess, onUpdateMetaData, onUpdateMetaDataError, onUpdateMetaDataSuccess } from "../Store/Slices/metaDataSlice";
import { callMetaDataGetApi, callMetaDataPostApi } from "../Context/metaDataApi";
function* GetMetaData() {
  try {
    const getMetaDataResponse = yield call(callMetaDataGetApi);
    if (getMetaDataResponse.errorCode === "200") {
      yield put(
        onGetMetaDataSuccess({
          data: getMetaDataResponse.response,
          message: getMetaDataResponse.errorMessage,
          status_code:getMetaDataResponse.errorCode
        })
      );
    } else {
      yield put(
        onGetMetaDataError({
          data: getMetaDataResponse.response,
          message: getMetaDataResponse.response.message,
          status_code:getMetaDataResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetMetaDataError({ data: [], message, status_code: 400 }));
  }
}
function* PostMetaData({ payload }) {
  try {
    const postMetaDataResponse = yield call(callMetaDataPostApi, payload);
    if (postMetaDataResponse.errorCode === "200" || postMetaDataResponse.errorCode === "205") {
      yield put(
        onPostMetaDataSuccess({
          postData: postMetaDataResponse.response,
          message: postMetaDataResponse.errorMessage,
          status_code: postMetaDataResponse.errorCode,
        })
      );
    } else {
      yield put(
        onPostMetaDataError({
          data: postMetaDataResponse.response,
          message: postMetaDataResponse?.data?.errorMessage,
          status_code:postMetaDataResponse.errorCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostMetaDataError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateMetaData({ payload }) {
  try {
    const updateMetaDataResponse = yield call(callMetaDataPostApi, payload);
    if (updateMetaDataResponse.errorCode === "204") {
      yield put(
        onUpdateMetaDataSuccess({
          status_code: updateMetaDataResponse.errorCode,
          message: updateMetaDataResponse.errorMessage,
          data:updateMetaDataResponse.response
        })
      );
    } else {
      yield put(
        onUpdateMetaDataError({
          status_code: updateMetaDataResponse.errorCode,
          message: updateMetaDataResponse.errorMessage,
          data:updateMetaDataResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateMetaDataError({ data: {}, message, status_code: 400 }));
  }
}
export default function* metaDataSaga() {
  yield takeLatest(onGetMetaData.type, GetMetaData);
  yield takeLatest(onPostMetaData.type, PostMetaData);
  yield takeLatest(onUpdateMetaData.type, UpdateMetaData);
}
