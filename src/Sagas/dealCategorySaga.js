import { call, put, takeLatest } from "redux-saga/effects";
import { onGetDealCategory, onGetDealCategoryError, onGetDealCategorySuccess, onPostDealCategory, onPostDealCategoryError, onPostDealCategorySuccess, onUpdateDealCategory, onUpdateDealCategoryError, onUpdateDealCategorySuccess } from "../Store/Slices/dealCategorySlice";
import { callDealCategoryGetApi, callDealCategoryPostApi, callDealCategoryUpdateApi } from "../Context/dealCategoryApi";
function* GetDealCategory() {
  try {
    const getDealCategoryResponse = yield call(callDealCategoryGetApi);
    if (getDealCategoryResponse.httpStatusCode === "200") {
      yield put(
        onGetDealCategorySuccess({
          data: getDealCategoryResponse.response,
          message: getDealCategoryResponse.errorMessage,
          status_code:getDealCategoryResponse.httpStatusCode
        })
      );
    } else {
      yield put(
        onGetDealCategoryError({
          data: getDealCategoryResponse.response,
          message: getDealCategoryResponse.response.message,
          status_code:getDealCategoryResponse.httpStatusCode
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
    if (postDealCategoryResponse.httpStatusCode === "201") {
      yield put(
        onPostDealCategorySuccess({
          postData: postDealCategoryResponse.response,
          message: postDealCategoryResponse.errorMessage,
          status_code: postDealCategoryResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostDealCategoryError({
          data: postDealCategoryResponse.response,
          message: postDealCategoryResponse.errorMessage,
          status_code:postDealCategoryResponse.httpStatusCode
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
    if (updateDealCategoryResponse.httpStatusCode === "201") {
      yield put(
        onUpdateDealCategorySuccess({
          status_code: updateDealCategoryResponse.httpStatusCode,
          message: updateDealCategoryResponse.errorMessage,
          data:updateDealCategoryResponse.response
        })
      );
    } else {
      yield put(
        onUpdateDealCategoryError({
          status_code: updateDealCategoryResponse.httpStatusCode,
          message: updateDealCategoryResponse.errorMessage,
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
