import { all } from "redux-saga/effects";
import { jobsSagaWatcher } from "./SearchJobs/saga";
export function* rootSaga() {
  yield all([jobsSagaWatcher()]);
}
