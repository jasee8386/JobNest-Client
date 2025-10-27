import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobById, applyToJob } from "../globalState/Features/jobsSlice";
import * as jwt_decode from "jwt-decode";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.value);
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
    const goToLogin = window.confirm(
      "Please login as a job seeker to apply.\nWould you like to go to the login page now?"
    );
    if (goToLogin) {
      navigate("/login");
    } else {
      setMessage("You must be logged in as a job seeker to apply.");
    }
    return;
  }

  dispatch(applyToJob(jobId))
    .unwrap()
    .then((res) => setMessage(res.message || "Applied successfully"))
    .catch((err) => setMessage(err.message || "Error applying"));
};

  if (loading) return <p className="text-blue-500">Loading job details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedJob) return <p>No job found</p>;

  return (
  
      <><div className="max-w-4xl mx-auto mt-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back to Listings
      </button>
    </div><div className="p-8 max-w-4xl mx-auto bg-base-200 rounded-xl shadow-lg mt-8">
        <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-base-100 p-4 rounded shadow">
            <p className="font-semibold">📍 Location</p>
            <p>{selectedJob.location}</p>
          </div>
          <div className="bg-base-100 p-4 rounded shadow">
            <p className="font-semibold">💼 Job Type</p>
            <p>{selectedJob.jobType}</p>
          </div>
          <div className="bg-base-100 p-4 rounded shadow">
            <p className="font-semibold">🕒 Work Type</p>
            <p>{selectedJob.workType}</p>
          </div>
        </div>

        <p className="mb-4">{selectedJob.description}</p>

        <p className="font-semibold">Location: {selectedJob.location}</p>
        <p className="font-semibold">Job Type: {selectedJob.jobType}</p>
        <p className="font-semibold">Work Type: {selectedJob.workType}</p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-base-100 p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Requirements</h2>
            <ul className="list-disc list-inside space-y-1">
              {selectedJob.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-base-100 p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              {selectedJob.responsibilities?.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>
        </div>

        {message && (
          <p className="text-center text-blue-700 font-semibold mb-4">{message}</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={handleApply}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Apply Now
          </button>
        </div>

      </div></>
    
  );
};

export default JobDetails;
