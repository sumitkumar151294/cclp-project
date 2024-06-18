import { call, put, takeLatest } from "redux-saga/effects";
import {
  onPostClientMasterSubmitSuccess,
  onPostClientMasterSubmitError,
  onPostClientMasterSubmit,
  onClientMasterSubmit,
  onClientMasterSubmitError,
  onClientMasterSubmitSuccess,
} from "../Store/Slices/clientMasterSlice";
import { getClientMasterApi, postClientMasterApi } from "../Context/clientMasterApi";

function* ClientMaster() {
  try {
    const clientMasterResponse = yield call(getClientMasterApi);
    if (clientMasterResponse.httpStatusCode === "201") {
      yield put(
        onClientMasterSubmitSuccess({
          data: clientMasterResponse.response,
          message: clientMasterResponse.errorMessage,
        })
      );
    } else {
      yield put(
        onClientMasterSubmitError({
          data: clientMasterResponse.response,
          message: clientMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(
      onClientMasterSubmitError({ data: [], message, status_code: 400 })
    );
  }
}
function* postClientMaster({ payload }) {
  try {
    const postClientMasterResponse = yield call(postClientMasterApi, payload);
    if (postClientMasterResponse.httpStatusCode === "201") {
      yield put(
        onPostClientMasterSubmitSuccess({
          postData: postClientMasterResponse.response,
          message: postClientMasterResponse.errorMessage,
          httpStatusCode: postClientMasterResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostClientMasterSubmitError({
          data: postClientMasterResponse.response,
          message: postClientMasterResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    // const message = error.response || "Something went wrong";
    yield put(
      onPostClientMasterSubmitError({
        data: [],
        message: error?.response?.data?.ErrorMessage,
        status_code: error?.response?.data?.HttpStatusCode,
      })
    );
  }
}
// function* updateClientMaster({ payload }) {
//   try {
//     const updateClientMasterResponse = yield call(  updateClientMasterApi, payload);
//         if (updateClientMasterResponse.httpStatusCode === "201") {
//       yield put(
//         onUpdateClientMasterSubmitSuccess({
//           data: updateClientMasterResponse.Response,
//           message: updateClientMasterResponse.errorMessage,
//           status_code: updateClientMasterResponse.httpStatusCode
//         })
//       );
//     } else {
//       yield put(
//         onUpdateClientMasterSubmitError({
//           data: updateClientMasterResponse.Response,
//           message: updateClientMasterResponse.errorMessage,
//           status_code: updateClientMasterResponse.httpStatusCode
//         })
//       );
//     }
//   } catch (error) {
//     const message = error.response || "Something went wrong";
//     yield put(
//       onUpdateClientMasterSubmitError({ data: [], message, status_code: 400 })
//     );
//   }
// }

export default function* clientMasterSaga() {
  yield takeLatest(onClientMasterSubmit.type, ClientMaster);
  yield takeLatest(onPostClientMasterSubmit.type, postClientMaster);
  // yield takeLatest(onUpdateClientMasterSubmit.type, updateClientMaster);
}
