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
  requirements?: string[];
  benefits?: string[];
  startDate?: string;
  duration?: string;
  applicationDeadline?: string;
  jobImage?: string;
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
        const jobsData = response.data.data || [];
        console.log('Fetched jobs:', jobsData);
        console.log('First job image:', jobsData[0]?.jobImage);
        setJobs(jobsData);
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

        {/* Jobs Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Job Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
                  {job.jobImage ? (
                    <img
                      src={job.jobImage}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">💼</div>
                  )}
                  {/* Save Button (like reference) */}
                  <button className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">
                    Saved ⚑
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Company/Business Name and Time */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'B'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user?.name || 'Business'}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {job.title}
                  </h3>

                  {/* Job Type and Urgency Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                      {job.jobType?.replace('-', ' ')}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        job.urgency === 'high'
                          ? 'bg-red-100 text-red-700'
                          : job.urgency === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {job.urgency} urgency
                    </span>
                  </div>

                  {/* Location and Workers */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>{job.numberOfWorkers || 1} worker{(job.numberOfWorkers || 1) > 1 ? 's' : ''} needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span>{job.applicants?.length || 0} applicants</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
                    <div>
                      {job.budget && job.budget.min !== undefined && job.budget.max !== undefined ? (
                        <>
                          <div className="text-xl font-bold text-gray-900">
                            {job.budget.currency} {job.budget.min.toLocaleString()} - {job.budget.max.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{job.location}</div>
                        </>
                      ) : (
                        <div className="text-gray-500">Budget not specified</div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    <button
                      onClick={() => router.push(`/dashboard/business/jobs/${job._id}`)}
                      className="w-full px-4 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/business/jobs/${job._id}/edit`)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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
