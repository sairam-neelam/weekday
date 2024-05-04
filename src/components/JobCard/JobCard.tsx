import { JobsListArr } from "../../store/SearchJobs/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import "./JobCard.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  pt: 2,
  px: 4,
  pb: 3,
};

const JobCard = ({ job }: { job: JobsListArr }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="job-card">
        <div className="card">
          <div className="flex w-100 logo-container">
            <img src={job?.logoUrl} alt="logo" className="company-logo" />
            <div>
              <h3 className="company-name">{job.companyName}</h3>
              <h2 className="job-role">{job.jobRole}</h2>
              <p className="job-location">{job.location}</p>
            </div>
          </div>
          <p className="salary">
            Estimated Salary: ₹{job.minJdSalary}
            {job.minJdSalary && job.maxJdSalary && <span> - </span>}
            {job.maxJdSalary} LPA
          </p>
          <div className="description-container">
            <p className="desc-label">About Company:</p>
            <div className="desc">{job?.jobDetailsFromCompany}</div>
          </div>
          <div className="show-more-container">
            <a onClick={handleOpen}>Show more</a>
          </div>
          <div className="exp-container">
            <h3>Minimum Experience</h3>
            <h2>{job?.minExp || 0} years</h2>
          </div>
          <div className="button-container">
            <button className="btn apply-btn">
              <BoltIcon className="bolt-icon" />
              Easy Apply
            </button>
            <button className="btn ref-btn">
              <AccountCircleIcon className="avatar" />
              Ask For referral
            </button>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title" className="parent-modal-title">
              Job Description
            </h2>
            <p>About Company</p>
            <p
              id="parent-modal-description"
              className="parent-modal-description"
            >
              {job?.jobDetailsFromCompany}
            </p>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default JobCard;
