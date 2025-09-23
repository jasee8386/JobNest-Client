// src/components/JobCard.jsx
import { Briefcase, MapPin, Clock } from "lucide-react";

const JobCard = ({ job, onApply }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-2xl p-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="card-title text-lg">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <span className="badge badge-primary">{job.type}</span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
        <MapPin size={16} /> {job.location}
        <Clock size={16} /> {job.postedAgo}
      </div>

      <div className="card-actions justify-between mt-4">
        <button className="btn btn-outline btn-sm">Details</button>
        <button
          onClick={() => onApply(job._id)}
          className="btn btn-primary btn-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;
