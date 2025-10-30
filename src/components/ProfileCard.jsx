import { User, Mail, FileText, Briefcase, UserCircle } from "lucide-react";

const ProfileCard = ({ profile }) => {
  const renderAvatar = () => {
    // If custom avatar exists
    if (profile.avatar) {
      return (
        <img
          src={profile.avatar}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />
      );
    }

    // Fallback icons by role
    if (profile.role === "employer") {
      return (
        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
          <Briefcase size={32} />
        </div>
      );
    } else if (profile.role === "jobseeker") {
      return (
        <div className="bg-green-100 text-green-600 rounded-full p-3">
          <User size={32} />
        </div>
      );
    } else {
      return (
        <div className="bg-gray-200 text-gray-600 rounded-full p-3">
          <UserCircle size={32} />
        </div>
      );
    }
  };

  return (
    <div className="card bg-base-100 shadow-lg rounded-2xl p-6 w-full max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="avatar">{renderAvatar()}</div>

        <div>
          <h2 className="font-semibold text-lg capitalize">
            {profile.name || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail size={14} /> {profile.email || "No email provided"}
          </p>
          <p className="badge badge-primary mt-2 capitalize">
            {profile.role || "user"}
          </p>
        </div>
      </div>

      {profile.skills?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill, i) => (
              <span key={i} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.role === "jobseeker" && profile.resume && (
        <div className="mt-4 flex justify-between items-center">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm flex items-center gap-2"
          >
            <FileText size={16} /> View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
