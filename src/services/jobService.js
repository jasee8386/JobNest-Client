import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API+ "/jobs"; 

// 🔹 Get verified jobs
const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data; // expected array of jobs
};
// 🔹 Get a single job
const getJobById = async (jobId) => {
  const response = await axios.get(`${API_URL}/${jobId}`);
  return response.data;
};
// 🔹 Apply for a job
const applyJob = async (jobId) => {
  const response = await axios.post(`${API_URL}/${jobId}/apply`);
  return response.data; // updated job with applicant info
};

const jobService = {
  getJobs,
  applyJob,
   getJobById,
};

export default jobService;
