import {
  FETCH_JOBS_LIST_FAILURE,
  FETCH_JOBS_LIST_REQUEST,
  FETCH_JOBS_LIST_SUCCESS,
} from "./actionTypes";

export interface IJobsList {
  jobsData: FetchJobsListSuccessPayload;
}

export interface FetchJobsListRequestPayload {
  offset: number;
  limit: number;
}

export interface JobsListArr {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}

export interface FetchJobsListSuccessPayload {
  jdList: JobsListArr[];
  totalCount: number;
  success: boolean;
  isLoading?: boolean;
}

export interface FetchJobsListFailurePayload {
  success: boolean;
  msg: string;
}

export interface FetchJobsListRequest {
  type: typeof FETCH_JOBS_LIST_REQUEST;
  payload: FetchJobsListRequestPayload;
  [key: string]: any;
}

export interface FetchJobsListSuccess {
  type: typeof FETCH_JOBS_LIST_SUCCESS;
  payload: FetchJobsListSuccessPayload;
}

export interface FetchJobsListFailure {
  type: typeof FETCH_JOBS_LIST_FAILURE;
  payload: FetchJobsListFailurePayload;
}

export type SearchJobsActions =
  | FetchJobsListRequest
  | FetchJobsListSuccess
  | FetchJobsListFailure;
