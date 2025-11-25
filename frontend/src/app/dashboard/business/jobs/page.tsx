/**
 * Business Jobs Page
 * Displays all jobs posted by the business
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  jobType: string;
  urgency: string;
  skills: string[];
  numberOfWorkers?: number;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  status?: string;
  createdAt: string;
  applicants?: any[];
}

export default function BusinessJobsPage() {
  usePageTitle('My Job Posts - Business Dashboard - ManPower');
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [refreshKey]);

  // Auto-refresh when component mounts or becomes visible
  useEffect(() => {
    const handleFocus = () => {
      setRefreshKey(prev => prev + 1);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs/business/my-jobs');
      if (response.data?.success) {
        setJobs(response.data.data || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await api.delete(`/jobs/${jobId}`);
      alert('Job deleted successfully!');
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'open') return job.status === 'open' || !job.status;
    if (filter === 'closed') return job.status === 'closed';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading your jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Job Posts</h1>
              <p className="text-gray-600 mt-2">Manage all your job postings</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/business/jobs/new')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + Post New Job
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'open'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Open ({jobs.filter(j => j.status === 'open' || !j.status).length})
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'closed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Closed ({jobs.filter(j => j.status === 'closed').length})
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {filter === 'all' ? 'No Jobs Posted Yet' : `No ${filter} jobs`}
            </h2>
            <p className="text-gray-600 mb-6">
              Start by posting your first job to find skilled workers
            </p>
            <button
              onClick={() => router.push('/dashboard/business/jobs/new')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.urgency === 'high'
                            ? 'bg-red-100 text-red-800'
                            : job.urgency === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {job.urgency?.toUpperCase()} URGENCY
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {job.jobType?.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">📍</span>
                        {job.location}
                      </span>
                      {job.numberOfWorkers && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">👥</span>
                          {job.numberOfWorkers} worker{job.numberOfWorkers > 1 ? 's' : ''} needed
                        </span>
                      )}
                      {job.budget && job.budget.min !== undefined && job.budget.max !== undefined && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium">💰</span>
                          {job.budget.currency} {job.budget.min.toLocaleString()} - {job.budget.max.toLocaleString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <span className="font-medium">📧</span>
                        {job.applicants?.length || 0} applicants
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500">
                      Posted on {new Date(job.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/dashboard/business/jobs/${job._id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/business/jobs/${job._id}/edit`)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
