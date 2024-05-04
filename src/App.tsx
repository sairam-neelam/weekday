import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchJobsListRequest } from "./store/SearchJobs/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobsListRequest({ offset: 0, limit: 10 }));
  }, []);

  return <div className="App">Init Commit</div>;
}

export default App;
