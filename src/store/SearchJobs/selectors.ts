import { AppState } from "../rootReducer";
import { createSelector } from "reselect";

const jobsData = (state: AppState) => state?.weekDayData?.jobsData;

export const jobsDataSelector = createSelector(
  jobsData,
  (jobsData) => jobsData
);
