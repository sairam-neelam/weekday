import { combineReducers } from "redux";
import jobsReducer from "./SearchJobs/reducers";

const rootReducer = combineReducers({
  weekDayData: jobsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
