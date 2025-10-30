import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FileText, Briefcase } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";

const backendBaseUrl = import.meta.env.VITE_BACKEND_API;

const Profile = () => {
  const theme = useSelector((state) => state.theme.value);
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchProfileData = async () => {
      try {
        // Fetch user profile
        const res = await axios.get(`${backendBaseUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        // Fetch based on role
        if (res.data.role === "jobseeker") {
          const apps = await axios.get(`${backendBaseUrl}/applications/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplications(apps.data);
        } else if (res.data.role === "employer") {
          const jobRes = await axios.get(`${backendBaseUrl}/employer/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobs(jobRes.data);
        }
      } catch (err) {
        console.log("Profile load error:", err);
      }
    };

    fetchProfileData();
  }, [token]);

  // Resume upload (only jobseekers)
  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      await axios.post(`${backendBaseUrl}/user/upload-resume`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Resume uploaded successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    

      <main className="flex-grow w-full flex flex-col items-center p-6 gap-6 bg-base-200">
        {/* Profile card */}
        <ProfileCard profile={user} />

        {/* Jobseeker Section */}
        {user.role === "jobseeker" && (
          <>
            {/* Resume Upload */}
            <form
              onSubmit={handleResumeUpload}
              className="mt-6 w-full max-w-3xl bg-base-100 p-6 rounded-xl flex flex-col md:flex-row items-center gap-4 shadow-md"
            >
              <label className="font-medium text-gray-700">Upload Resume:</label>
              <input
                type="file"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
              <button type="submit" className="btn btn-success w-fit">
                Upload
              </button>
            </form>

            {/* Applications */}
            <div className="mt-6 w-full max-w-3xl">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <FileText size={20} /> Your Applications
              </h3>
              {applications.length > 0 ? (
                <ul className="space-y-2">
                  {applications.map((app) => (
                    <li
                      key={app._id}
                      className="border p-3 rounded-xl bg-white flex justify-between items-center hover:shadow-md transition"
                    >
                      <span>{app.jobTitle}</span>
                      <span
                        className={`font-medium ${
                          app.status === "applied"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
              )}
            </div>
          </>
        )}

        {/* Employer Section */}
        {user.role === "employer" && (
          <div className="mt-6 w-full max-w-3xl">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Briefcase size={20} /> Your Job Listings
            </h3>
            {jobs.length > 0 ? (
              <ul className="space-y-2">
                {jobs.map((job) => (
                  <li
                    key={job._id}
                    className="border p-3 rounded-xl bg-white flex justify-between items-center hover:shadow-md transition"
                  >
                    <span>{job.title}</span>
                    <span className="text-sm text-gray-600">{job.category}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                You haven’t posted any jobs yet. Go to <b>Post Job</b> to create one.
              </p>
            )}
          </div>
        )}
      </main>

  );
};

export default Profile;
