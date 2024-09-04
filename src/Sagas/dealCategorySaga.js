import { call, put, takeLatest } from "redux-saga/effects";
import { onGetDealCategory, onGetDealCategoryError, onGetDealCategorySuccess, onPostDealCategory, onPostDealCategoryError, onPostDealCategorySuccess, onUpdateDealCategory, onUpdateDealCategoryError, onUpdateDealCategorySuccess } from "../Store/Slices/dealCategorySlice";
import { callDealCategoryGetApi, callDealCategoryPostApi, callDealCategoryUpdateApi } from "../Context/dealCategoryApi";
function* GetDealCategory() {
  try {
    const getDealCategoryResponse = yield call(callDealCategoryGetApi);
    if (getDealCategoryResponse.responseCode === "200") {
      yield put(
        onGetDealCategorySuccess({
          data: getDealCategoryResponse.response,
          message: getDealCategoryResponse.responseMessage,
          status_code:getDealCategoryResponse.responseCode
        })
      );
    } else {
      yield put(
        onGetDealCategoryError({
          data: getDealCategoryResponse.response,
          message: getDealCategoryResponse.response.message,
          status_code:getDealCategoryResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onGetDealCategoryError({ data: [], message, status_code: 400 }));
  }
}
function* PostDealCategory({ payload }) {
  try {
    const postDealCategoryResponse = yield call(callDealCategoryPostApi, payload);
    if (postDealCategoryResponse.responseCode === "200") {
      yield put(
        onPostDealCategorySuccess({
          postData: postDealCategoryResponse.response,
          message: postDealCategoryResponse.responseMessage,
          status_code: postDealCategoryResponse.responseCode,
        })
      );
    } else {
      yield put(
        onPostDealCategoryError({
          data: postDealCategoryResponse.response,
          message: postDealCategoryResponse.responseMessage,
          status_code:postDealCategoryResponse.responseCode
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostDealCategoryError({ data: [], message, status_code: 400 }));
  }
}
function* UpdateDealCategory({ payload }) {
  try {
    const updateDealCategoryResponse = yield call(callDealCategoryUpdateApi, payload);
    if (updateDealCategoryResponse.responseCode === "200") {
      yield put(
        onUpdateDealCategorySuccess({
          status_code: updateDealCategoryResponse.responseCode,
          message: updateDealCategoryResponse.responseMessage,
          data:updateDealCategoryResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealCategoryError({
          status_code: updateDealCategoryResponse.responseCode,
          message: updateDealCategoryResponse.responseMessage,
          data:updateDealCategoryResponse.response
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onUpdateDealCategoryError({ data: {}, message, status_code: 400 }));
  }
}
export default function* dealCategorySaga() {
  yield takeLatest(onGetDealCategory.type, GetDealCategory);
  yield takeLatest(onPostDealCategory.type, PostDealCategory);
  yield takeLatest(onUpdateDealCategory.type, UpdateDealCategory);
}
