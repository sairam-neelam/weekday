import {
  FETCH_JOBS_LIST_FAILURE,
  FETCH_JOBS_LIST_REQUEST,
  FETCH_JOBS_LIST_SUCCESS,
} from "./actionTypes";
import {
  FetchJobsListFailure,
  FetchJobsListFailurePayload,
  FetchJobsListRequest,
  FetchJobsListRequestPayload,
  FetchJobsListSuccess,
  FetchJobsListSuccessPayload,
} from "./types";

export const fetchJobsListRequest = (
  payload: FetchJobsListRequestPayload
): FetchJobsListRequest => ({
  type: FETCH_JOBS_LIST_REQUEST,
  payload,
});

export const fetchJobsListSuccess = (
  payload: FetchJobsListSuccessPayload
): FetchJobsListSuccess => ({
  type: FETCH_JOBS_LIST_SUCCESS,
  payload,
});

export const fetchJobsListFailure = (
  payload: FetchJobsListFailurePayload
): FetchJobsListFailure => ({
  type: FETCH_JOBS_LIST_FAILURE,
  payload,
});
