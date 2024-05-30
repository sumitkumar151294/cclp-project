import { all } from "redux-saga/effects";
import offerMasterSaga from "./offerMasterSaga";
import faqMasterSaga from "./faqMasterSaga";
export default function* rootSaga() {
  yield all([
      offerMasterSaga(),
      faqMasterSaga()
  ]);
}
