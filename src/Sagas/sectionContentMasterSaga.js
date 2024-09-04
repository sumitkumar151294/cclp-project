import { call, put, takeLatest } from "redux-saga/effects";
import { onGetSectionContentMaster, onGetSectionContentMasterError, onGetSectionContentMasterSuccess, onPostSectionContentMaster, onPostSectionContentMasterError, onPostSectionContentMasterSuccess, onUpdateSectionContentMaster, onUpdateSectionContentMasterError, onUpdateSectionContentMasterSuccess } from "../Store/Slices/sectionContentMasterSlice";
import { callSectionContentMasterGetApi, callSectionContentMasterPostApi, callSectionContentMasterUpdateApi } from "../Context/sectionContentMasterApi";
function* GetSectionContentMaster() {
  try {
    const getSectionContentMasterResponse = yield call(callSectionContentMasterGetApi);
    if (getSectionContentMasterResponse.responseCode === "200") {
      yield put(
        onGetSectionContentMasterSuccess({
          data: getSectionContentMasterResponse.response,
          message: getSectionContentMasterResponse.responseMessage,
          status_code:getSectionContentMasterResponse.responseCode
        })
      );
    } else {
      yield put(
        onGetSectionContentMasterError({
          data: getSectionContentMasterResponse.response,
          message: getSectionContentMasterResponse.response.message,
          status_code:getSectionContentMasterResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetSectionContentMasterError({ data: [], message, status_code: 400 }));
  }
}
function* PostSectionContentMaster({ payload }) {
  try {
    const postSectionContentMasterResponse = yield call(callSectionContentMasterPostApi, payload);
    if (postSectionContentMasterResponse.responseCode === "200") {
      yield put(
        onPostSectionContentMasterSuccess({
          postData: postSectionContentMasterResponse.response,
          message: postSectionContentMasterResponse.responseMessage,
          status_code: postSectionContentMasterResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostSectionContentMasterError({
          data: postSectionContentMasterResponse.response,
          message: postSectionContentMasterResponse.responseMessage,
          status_code:postSectionContentMasterResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostSectionContentMasterError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateSectionContentMaster({ payload }) {
  try {
    const updateSectionContentMasterResponse = yield call(callSectionContentMasterUpdateApi, payload);
    if (updateSectionContentMasterResponse.responseCode === "200") {
      yield put(
        onUpdateSectionContentMasterSuccess({
          status_code: updateSectionContentMasterResponse.responseCode,
          message: updateSectionContentMasterResponse.responseMessage,
          data:updateSectionContentMasterResponse.response
        })
      );
    } else {
      yield put(
        onUpdateSectionContentMasterError({
          status_code: updateSectionContentMasterResponse.responseCode,
          message: updateSectionContentMasterResponse.responseMessage,
          data:updateSectionContentMasterResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateSectionContentMasterError({ data: {}, message, status_code: 400 }));
  }
}
export default function* SectionContentMasterSaga() {
  yield takeLatest(onGetSectionContentMaster.type, GetSectionContentMaster);
  yield takeLatest(onPostSectionContentMaster.type, PostSectionContentMaster);
  yield takeLatest(onUpdateSectionContentMaster.type, UpdateSectionContentMaster);
}
