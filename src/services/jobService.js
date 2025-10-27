import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API + "/jobs";

// 🔹 Get verified jobs (supports search, category, pagination)
const getJobs = async (filters = {}) => {
  const { search = "", category = "", page = 1, limit = 6 } = filters;

  const response = await axios.get(API_URL, {
    params: { search, category, page, limit },
  });

  return response.data; // { jobs, totalPages, totalJobs }
};

// 🔹 Get a single job by ID
const getJobById = async (jobId) => {
  const response = await axios.get(`${API_URL}/${jobId}`);
  return response.data;
};

// 🔹 Apply for a job
const applyJob = async (jobId, formData = {}) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/${jobId}/apply`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

const jobService = {
  getJobs,
  getJobById,
  applyJob,
};

export default jobService;
