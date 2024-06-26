import { Reducer } from "redux";
import {
  FETCH_JOBS_LIST_FAILURE,
  FETCH_JOBS_LIST_REQUEST,
  FETCH_JOBS_LIST_SUCCESS,
} from "./actionTypes";
import { IJobsList, SearchJobsActions } from "./types";

const initialState: IJobsList = {
  jobsData: {
    jdList: [],
    success: false,
    totalCount: 0,
    isLoading: false,
  },
};

const jobsReducer: Reducer<IJobsList, SearchJobsActions> = (
  state = initialState,
  action: SearchJobsActions
) => {
  switch (action.type) {
    case FETCH_JOBS_LIST_REQUEST:
      return {
        ...state,
        jobsData: {
          ...state.jobsData,
          isLoading: true,
        },
      };
    case FETCH_JOBS_LIST_SUCCESS:
      return {
        ...state,
        jobsData: {
          jdList: action.payload.jdList,
          success: action.payload.success,
          totalCount: action.payload.totalCount,
          isLoading: false,
        },
      };
    case FETCH_JOBS_LIST_FAILURE:
      return {
        ...state,
        jobsData: {
          jdList: state.jobsData.jdList,
          totalCount: state.jobsData.totalCount,
          success: action.payload.success,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default jobsReducer;
