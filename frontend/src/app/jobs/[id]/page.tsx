/**
 * Job Detail Page
 * View job details and apply
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getJobById } from '@/controllers/jobController';
import api from '@/services/api';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  skills: string[];
  jobType: string;
  numberOfWorkers: number;
  urgency: string;
  budget?: {
    min: number;
    max: number;
  };
  requirements?: string[];
  benefits?: string[];
  businessId: {
    _id: string;
    name: string;
    businessProfile?: {
      companyName?: string;
      industry?: string;
    };
  };
  applicationDeadline?: string;
  startDate?: string;
  duration?: string;
  applicationsCount: number;
  createdAt: string;
}

export default function JobDetailPage() {
  usePageTitle('Job Details - ManPower');
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedRate: '',
    availability: '',
  });

  useEffect(() => {
    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const fetchJob = async () => {
    try {
      const data = await getJobById(params.id as string);
      setJob(data as any);
    } catch (error) {
      console.error('Failed to fetch job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/login?redirect=' + encodeURIComponent(`/jobs/${params.id}`));
      return;
    }

    setApplying(true);

    try {
      await api.post(`/applications`, {
        jobId: params.id,
        coverLetter: applicationData.coverLetter,
        proposedRate: applicationData.proposedRate ? parseFloat(applicationData.proposedRate) : undefined,
        availability: applicationData.availability,
      });

      alert('Application submitted successfully!');
      router.push('/dashboard/worker/applications');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <Link href="/jobs" className="text-blue-600 hover:text-blue-700">
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const companyName = job.businessId.businessProfile?.companyName || job.businessId.name;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/jobs" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  🏢 {companyName}
                </span>
                <span className="flex items-center gap-1">
                  📍 {job.location}
                </span>
                <span className="flex items-center gap-1">
                  👥 {job.numberOfWorkers} worker(s) needed
                </span>
              </div>
            </div>
            <div className="ml-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  job.urgency === 'high'
                    ? 'bg-red-100 text-red-800'
                    : job.urgency === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)} Urgency
              </span>
            </div>
          </div>

          {/* Job Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div>
              <div className="text-sm text-gray-600">Job Type</div>
              <div className="font-semibold capitalize">{job.jobType.replace('-', ' ')}</div>
            </div>
            {job.budget && (
              <div>
                <div className="text-sm text-gray-600">Budget</div>
                <div className="font-semibold">
                  ${job.budget.min} - ${job.budget.max}
                </div>
              </div>
            )}
            {job.duration && (
              <div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-semibold">{job.duration}</div>
              </div>
            )}
            <div>
              <div className="text-sm text-gray-600">Applications</div>
              <div className="font-semibold">{job.applicationsCount}</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6">
            {user?.role === 'worker' ? (
              !showApplicationForm ? (
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Apply for this Job
                </button>
              ) : null
            ) : !isAuthenticated ? (
              <Link
                href={`/login?redirect=${encodeURIComponent(`/jobs/${job._id}`)}`}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block text-center"
              >
                Login to Apply
              </Link>
            ) : (
              <div className="text-gray-600">
                Only workers can apply for jobs. Switch to a worker account to apply.
              </div>
            )}
          </div>
        </div>

        {/* Application Form */}
        {showApplicationForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Application</h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, coverLetter: e.target.value })
                  }
                  rows={6}
                  required
                  placeholder="Tell the employer why you're the best fit for this role..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposed Hourly Rate (optional)
                </label>
                <input
                  type="number"
                  value={applicationData.proposedRate}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, proposedRate: e.target.value })
                  }
                  placeholder="e.g., 25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={applicationData.availability}
                  onChange={(e) =>
                    setApplicationData({ ...applicationData, availability: e.target.value })
                  }
                  placeholder="e.g., Available immediately"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Skills Required */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
          <div className="space-y-3 text-gray-700">
            {job.startDate && (
              <p>
                <strong>Start Date:</strong> {new Date(job.startDate).toLocaleDateString()}
              </p>
            )}
            {job.applicationDeadline && (
              <p>
                <strong>Application Deadline:</strong>{' '}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
            )}
            {job.businessId.businessProfile?.industry && (
              <p>
                <strong>Industry:</strong> {job.businessId.businessProfile.industry}
              </p>
            )}
            <p>
              <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
