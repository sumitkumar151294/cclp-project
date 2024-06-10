import { call, put, takeLatest } from "redux-saga/effects";
import { callUserRolePostApi } from "../Context/roleMasterApi";
import { onGetUserRole, onPostUserRole, onPostUserRoleError, onPostUserRoleSuccess, onUpdateUserRole } from "../Store/Slices/userRoleSlice";
// function* GetUserRole() {
//   try {
//     const getUserRoleResponse = yield call(callUserRoleGetApi);
//     if (getUserRoleResponse.httpStatusCode === "200") {
//       yield put(
//         onGetUserRoleSuccess({
//           data: getUserRoleResponse.response,
//           message: getUserRoleResponse.errorMessage,
//         })
//       );
//     } else {
//       yield put(
//         onGetUserRoleError({
//           data: getUserRoleResponse.response,
//           message: getUserRoleResponse.response.message,
//         })
//       );
//     }
//   } catch (error) {
//     const message = error.response || "Something went wrong";
//     yield put(onGetUserRoleError({ data: {}, message, status_code: 400 }));
//   }
// }
function* PostUserRole({ payload }) {
  try {
    const postUserRoleResponse = yield call(callUserRolePostApi, payload);
    if (postUserRoleResponse.httpStatusCode === "201") {
      yield put(
        onPostUserRoleSuccess({
          postData: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
          httpStatusCode: postUserRoleResponse.httpStatusCode,
        })
      );
    } else {
      yield put(
        onPostUserRoleError({
          data: postUserRoleResponse.response,
          message: postUserRoleResponse.errorMessage,
        })
      );
    }
  } catch (error) {
    const message = error.response || "Something went wrong";
    yield put(onPostUserRoleError({ data: {}, message, status_code: 400 }));
  }
}

export default function* userRoleSaga() {
  // yield takeLatest(onGetUserRole.type, GetUserRole);
  yield takeLatest(onPostUserRole.type, PostUserRole);
}
