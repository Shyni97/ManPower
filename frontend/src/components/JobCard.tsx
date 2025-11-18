/**
 * Job Card Component
 * Displays job information in a card format
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Job, JobUrgency, BusinessInfo } from '../models/job';

interface JobCardProps {
  job: Job;
  onDelete?: (jobId: string) => void;
  showActions?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onDelete,
  showActions = false,
}) => {
  const urgencyColors = {
    [JobUrgency.LOW]: 'bg-green-100 text-green-800',
    [JobUrgency.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [JobUrgency.HIGH]: 'bg-red-100 text-red-800',
  };

  const businessInfo = job.businessId as BusinessInfo;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      {/* Job Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link href={`/jobs/${job._id}`}>
            <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer">
              {job.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">
            {businessInfo?.name || 'Business'}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
            urgencyColors[job.urgency]
          }`}
        >
          {job.urgency}
        </span>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Location and Date */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-4">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
        <Link
          href={`/jobs/${job._id}`}
          className="flex-1 min-w-[120px] px-4 py-2 bg-primary-600 text-white text-center rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          View Details
        </Link>

        {showActions && (
          <>
            <Link
              href={`/jobs/edit/${job._id}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Edit
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(job._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
