import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsListRequest } from "../../store/SearchJobs/action";
import { useSelector } from "react-redux";
import { jobsDataSelector } from "../../store/SearchJobs/selectors";
import { JobsListArr } from "../../store/SearchJobs/types";
import "./JobsList.css";
import JobCard from "../JobCard/JobCard";

const JobsList = () => {
  const dispatch = useDispatch();
  const parentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const jobsData = useSelector(jobsDataSelector);
  const [jobsList, setJobsList] = useState<JobsListArr[]>([]);

  useEffect(() => {
    dispatch(fetchJobsListRequest({ offset: 0, limit: 10 }));
  }, []);

  useEffect(() => {
    if (jobsData.success) {
      setJobsList((prev) => [...prev, ...jobsData.jdList]);
    }
  }, [jobsData]);

  const handleScroll = () => {
    if (
      parentRef.current &&
      parentRef.current.scrollTop + parentRef.current.clientHeight >=
        parentRef.current.scrollHeight
    ) {
      console.log("test");
      dispatch(fetchJobsListRequest({ offset: offset + 10, limit: 10 }));
      setOffset((prev) => prev + 10);
    }
  };

  return (
    <div>
      <div
        ref={parentRef}
        className="feed-container"
        style={{
          height: `90vh`,
          overflow: "auto", // Make it scroll!
        }}
        onScroll={handleScroll}
      >
        <div className="jobs-list">
          {jobsList?.map((job) => (
            <JobCard key={job?.jdUid} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsList;
