// src/components/ProfileCard.jsx
import { User, Mail, FileText } from "lucide-react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={profile.avatar || "/default-avatar.png"} alt="profile" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-lg">{profile.name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={14} /> {profile.email}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.skills?.map((skill, i) => (
            <span key={i} className="badge badge-outline">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm flex items-center gap-2"
        >
          <FileText size={16} /> Resume
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
