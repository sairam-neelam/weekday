import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsListRequest } from "../../store/SearchJobs/action";
import { useSelector } from "react-redux";
import { jobsDataSelector } from "../../store/SearchJobs/selectors";
import { JobsListArr } from "../../store/SearchJobs/types";
import "./JobsList.css";
import JobCard from "../JobCard/JobCard";
import MultiSelect from "../common/MultiSelect/MultiSelect";
import Select from "react-select";
import { BASE_SALARY, EXPERIENCE, LOCATION, MODE, ROLES } from "./constants";

const names = [
  "Humaira Sims",
  "Santiago Solis",
  "Dawid Floyd",
  "Mateo Barlow",
  "Samia Navarro",
  "Kaden Fields",
  "Genevieve Watkins",
  "Mariah Hickman",
  "Rocco Richardson",
  "Harris Glenn",
];

const options = [
  { value: "Eric", label: "Eric", src: "/static/images/avatar/1.jpg" },
  { value: "Smith", label: "Smith", src: "/static/images/avatar/2.jpg" },
  { value: "Erika", label: "Erika", src: "/static/images/avatar/3.jpg" },
];

const JobsList = () => {
  const dispatch = useDispatch();
  const parentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const jobsData = useSelector(jobsDataSelector);
  const [jobsList, setJobsList] = useState<JobsListArr[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedMode, setSelectedMode] = useState<any>(null);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>("");

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
      <div className="filter-container">
        <div className="f-g-1">
          <div className="label">{selectedRoles.length > 0 && "Roles"}</div>
          <Select
            isMulti
            onChange={(e) => setSelectedRoles([...e])}
            name="roles"
            options={ROLES}
            className="select-roles"
            classNamePrefix="select"
            placeholder="Roles"
          />
        </div>

        <div>
          <div className="label">{selectedExp && "Experience"}</div>
          <Select
            onChange={(e) => setSelectedExp(e)}
            name="exp"
            options={EXPERIENCE}
            className="select-roles"
            classNamePrefix="select"
            placeholder="Experience"
          />
        </div>

        <div className="f-g-1">
          <div className="label">{selectedLocation && "Location"}</div>
          <Select
            isMulti
            onChange={(e) => setSelectedLocation([...e])}
            name="exp"
            options={LOCATION}
            className="select-roles"
            classNamePrefix="select"
            placeholder="Location"
          />
        </div>

        <div>
          <div className="label">{selectedMode && "Mode"}</div>
          <Select
            onChange={(e) => setSelectedMode(e)}
            name="exp"
            options={MODE}
            className="select-roles"
            classNamePrefix="select"
            placeholder="Remote"
          />
        </div>

        <div>
          <div className="label">{selectedSalary && "Min Base Pay"}</div>
          <Select
            onChange={(e) => setSelectedSalary(e)}
            name="exp"
            options={BASE_SALARY}
            className="select-roles"
            classNamePrefix="select"
            placeholder="Minimum Base Pay Salary"
          />
        </div>

        <div>
          <div className="label">{selectedCompany && "Company Name"}</div>
          <input
            className="search-input"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            placeholder="Search Company Name"
          />
        </div>
      </div>
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
