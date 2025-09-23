import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobById, applyToJob } from "../globalState/Features/jobsSlice";
import * as jwt_decode from "jwt-decode";

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { selectedJob, loading, error } = useSelector((state) => state.jobs);
const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const role = token ? jwt_decode(token).role : "";
  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, jobId]);

  const handleApply = () => {
    if (!token || role !== "jobseeker") {
      setMessage("Please login as a job seeker to apply.");
      return;
    }
    dispatch(applyToJob(jobId))    .unwrap()
      .then((res) => setMessage(res.message || "Applied successfully"))
      .catch((err) => setMessage(err.message || "Error applying"));
  };

  if (loading) return <p className="text-blue-500">Loading job details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedJob) return <p>No job found</p>;

  return (<div className="p-6 max-w-3xl mx-auto bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-2">{selectedJob.title}</h1>
      <p className="text-lg text-gray-600 mb-2">
        {selectedJob.employer?.name || "Company Name"}
      </p>
      <p className="mb-4">{selectedJob.description}</p>

      <p className="font-semibold">Location: {selectedJob.location}</p>
      <p className="font-semibold">Job Type: {selectedJob.jobType}</p>
      <p className="font-semibold">Work Type: {selectedJob.workType}</p>

      <div className="mb-4">
        <h2 className="font-bold">Requirements:</h2>
        <ul className="list-disc list-inside">
          {selectedJob.requirements?.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Responsibilities:</h2>
        <ul className="list-disc list-inside">
          {selectedJob.responsibilities?.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <button
        onClick={handleApply}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
