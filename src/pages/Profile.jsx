import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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

  // Fetch user profile and applications (if jobseeker)
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendBaseUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.role === "jobseeker") {
          const apps = await axios.get(`${backendBaseUrl}/applications/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplications(apps.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      await axios.post(`${backendBaseUrl}/user/upload-resume`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Resume uploaded successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
   

      <main className="flex-grow w-full flex flex-col items-center p-6 gap-6">
        {/* Use ProfileCard for the main profile info */}
        <ProfileCard profile={user} />

        {/* Resume Upload (Jobseeker) */}
        {user.role === "jobseeker" && (
          <form
            onSubmit={handleResumeUpload}
            className="mt-6 w-full max-w-3xl bg-gray-50 p-6 rounded-xl flex flex-col md:flex-row items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <label className="block text-gray-700 font-medium">Upload Resume:</label>
            <input
              type="file"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />
            <button type="submit" className="btn btn-success w-fit">
              Upload
            </button>
          </form>
        )}

        {/* Applications (Jobseeker) */}
        {user.role === "jobseeker" && applications.length > 0 && (
          <div className="mt-6 w-full max-w-3xl">
            <h3 className="font-bold text-lg mb-2">Your Applications</h3>
            <ul className="space-y-2">
              {applications.map((app) => (
                <li
                  key={app._id}
                  className="border p-3 rounded-xl hover:shadow-md transition flex justify-between items-center bg-white"
                >
                  <span>{app.jobTitle}</span>
                  <span
                    className={`font-medium ${
                      app.status === "applied" ? "text-blue-600" : "text-green-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Employer Posted Jobs */}
        {user.role === "employer" && (
          <div className="mt-6 w-full max-w-3xl">
            <h3 className="font-bold text-lg mb-2">Your Job Listings</h3>
            <p className="text-gray-500">You have X jobs posted.</p>
          </div>
        )}
      </main>

    
  );
};

export default Profile;
