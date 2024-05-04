import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchUser } from "../../services/apiService";
import { FetchJobsListRequest, FetchJobsListSuccessPayload } from "./types";
import { fetchJobsListFailure, fetchJobsListSuccess } from "./action";
import { FETCH_JOBS_LIST_REQUEST } from "./actionTypes";

function* fetchJobsListSaga(action: FetchJobsListRequest): any {
  try {
    const response: FetchJobsListSuccessPayload = yield call(
      fetchUser,
      action.payload
    );
    console.log(response);
    yield put(
      fetchJobsListSuccess({
        jdList: response.jdList,
        totalCount: response.totalCount,
        success: true,
      })
    );
  } catch (e) {
    yield put(
      fetchJobsListFailure({
        success: false,
        msg: "Error",
      })
    );
  }
}

export function* jobsSagaWatcher() {
  yield all([takeLatest(FETCH_JOBS_LIST_REQUEST, fetchJobsListSaga)]);
}
