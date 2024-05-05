import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJobsListRequest } from "../../store/SearchJobs/action";
import { useSelector } from "react-redux";
import { jobsDataSelector } from "../../store/SearchJobs/selectors";
import { JobsListArr } from "../../store/SearchJobs/types";
import "./JobsList.css";
import JobCard from "../JobCard/JobCard";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BASE_SALARY,
  EXPERIENCE,
  LOCATION,
  MODE,
  Options,
  ROLES,
} from "./constants";
import useDebounce from "../../hooks/useDebounce";

const JobsList = () => {
  const dispatch = useDispatch();
  const parentRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const jobsData = useSelector(jobsDataSelector);
  const [jobsList, setJobsList] = useState<JobsListArr[]>([]);
  const [filteredJobsList, setFilteredJobsList] = useState<JobsListArr[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<any>([]);
  const [selectedExp, setSelectedExp] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>([]);
  const [selectedMode, setSelectedMode] = useState<any>(null);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>("");
  const debouncedCompanyName = useDebounce(selectedCompany, 300);
  let scrollTimeout: any = null;

  useEffect(() => {
    dispatch(fetchJobsListRequest({ offset: 0, limit: 10 }));
  }, []);

  useEffect(() => {
    parentRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      parentRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  useEffect(() => {
    const parentElement = parentRef.current;
    if (parentElement) {
      const hasVerticalScrollbar =
        parentElement.scrollHeight > parentElement.clientHeight;
      if (!hasVerticalScrollbar) {
        parentElement.style.overflowY = "auto";
        parentElement.style.height = "600px";
      } else {
        parentElement.style.height = "100vh";
      }
    }
  }, [parentRef, filteredJobsList]);

  useEffect(() => {
    if (jobsData.success) {
      setJobsList((prev) => [...prev, ...jobsData.jdList]);
    }
  }, [jobsData]);

  useEffect(() => {
    let tempList: JobsListArr[] = [];

    tempList = filterByRoles(jobsList, selectedRoles);
    tempList = filterByExp(tempList, selectedExp);
    tempList = filterByLocation(tempList, selectedLocation);
    tempList = filterByMode(tempList, selectedMode);
    tempList = filterByPay(tempList, selectedSalary);
    tempList = filterByCompany(tempList, debouncedCompanyName);

    setFilteredJobsList([...tempList]);
  }, [
    jobsList,
    selectedRoles,
    selectedExp,
    selectedLocation,
    selectedMode,
    selectedSalary,
    debouncedCompanyName,
  ]);

  const filterByRoles = (list: JobsListArr[], roles: Options[]) => {
    let filterList = [];
    if (roles.length === 0) {
      filterList = list;
    } else {
      filterList = list.filter((dataItem) =>
        roles.some(
          (filterItem: { value: any }) =>
            filterItem.value.toLowerCase() === dataItem.jobRole.toLowerCase()
        )
      );
    }
    return filterList;
  };

  const filterByExp = (list: JobsListArr[], exp: Options) => {
    let filterList = [];
    if (exp) {
      filterList = list.filter((el) => el.minExp <= Number(exp.value));
    } else {
      filterList = list;
    }

    return filterList;
  };

  const filterByLocation = (list: JobsListArr[], locations: Options[]) => {
    let filterList = [];
    if (locations.length === 0) {
      filterList = list;
    } else {
      filterList = list.filter((dataItem) =>
        locations.some(
          (filterItem: { value: any }) =>
            filterItem.value.toLowerCase() === dataItem.location.toLowerCase()
        )
      );
    }
    return filterList;
  };

  const filterByMode = (list: JobsListArr[], mode: Options) => {
    let filterList = [];
    if (mode) {
      filterList = list.filter(
        (el) => el.location.toLowerCase() == mode.label.toLowerCase()
      );
    } else {
      filterList = list;
    }

    return filterList;
  };

  const filterByPay = (list: JobsListArr[], pay: Options) => {
    let filterList = [];
    if (pay) {
      filterList = list.filter((el) => el.minJdSalary >= Number(pay.value));
    } else {
      filterList = list;
    }

    return filterList;
  };

  const filterByCompany = (list: JobsListArr[], company: string) => {
    let filterList = [];
    if (company.length > 0) {
      filterList = list.filter((el) =>
        el.companyName.toLowerCase().includes(company.toLowerCase())
      );
    } else {
      filterList = list;
    }

    return filterList;
  };

  const handleScroll = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      if (
        parentRef.current &&
        parentRef.current.scrollTop + parentRef.current.clientHeight + 100 >=
          parentRef.current.scrollHeight
      ) {
        if (jobsData?.totalCount >= jobsList.length) {
          dispatch(fetchJobsListRequest({ offset: offset + 10, limit: 10 }));
          setOffset((prev) => prev + 10);
        }
      }
    }, 200);
  };

  return (
    <div
      ref={parentRef}
      className="feed-container"
      style={{
        height: `100vh`,
        overflowY: "auto",
      }}
    >
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
            isClearable
          />
        </div>

        <div className="f-g-1">
          <div className="label">
            {selectedLocation.length > 0 && "Location"}
          </div>
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
            isClearable
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
      <div>
        <div className="jobs-list">
          {filteredJobsList?.map((job) => (
            <JobCard key={job?.jdUid} job={job} />
          ))}
        </div>
      </div>
      {jobsData?.isLoading && (
        <div className="flex flex-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default JobsList;
