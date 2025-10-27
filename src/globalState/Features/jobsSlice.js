import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "../../services/jobService";

// 🔹 Fetch all verified jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({ query = "", category = "", page = 1 }, thunkAPI) => {
    try {
      return await jobService.getJobs(query, category, page);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Fetch single job by ID
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, thunkAPI) => {
    try {
      return await jobService.getJobById(jobId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔹 Apply to a job
export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async (jobId, thunkAPI) => {
    try {
      return await jobService.applyJob(jobId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    selectedJob: null, // ✅ for single job
    loading: false,
    error: null,
  },
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
      state.error = null;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 fetch all jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 fetch single job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedJob = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedJob = null;
      })

      // 🔹 apply to job
      .addCase(applyToJob.fulfilled, (state, action) => {
        const { updatedJob } = action.payload;

        state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job
        );

        if (state.selectedJob?._id === updatedJob._id) {
          state.selectedJob = updatedJob;
        }

        state.loading = false;
        state.error = null;
      })

      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearJobs, clearSelectedJob } = jobsSlice.actions;
export default jobsSlice.reducer;
