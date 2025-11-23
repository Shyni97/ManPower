/**
 * Worker Applications Page
 * View all job applications submitted by the worker
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    businessId: {
      name: string;
      businessProfile?: {
        companyName?: string;
      };
    };
    location: string;
    jobType: string;
  };
  status: string;
  proposedRate?: number;
  coverLetter: string;
  availability?: string;
  createdAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export default function WorkerApplicationsPage() {
  usePageTitle('My Applications - Worker Dashboard - ManPower');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'worker') {
      router.push('/dashboard/business');
    } else {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/worker');
      setApplications(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">Track all your job applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Accepted</div>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600">Rejected</div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'accepted'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Accepted ({stats.accepted})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected ({stats.rejected})
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow">
          {filteredApplications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((app) => {
                const companyName =
                  app.jobId.businessId.businessProfile?.companyName ||
                  app.jobId.businessId.name;

                return (
                  <div key={app._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link
                          href={`/jobs/${app.jobId._id}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {app.jobId.title}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {companyName} • {app.jobId.location} • {app.jobId.jobType}
                        </p>

                        {app.proposedRate && (
                          <p className="text-sm text-gray-700 mt-2">
                            <strong>Proposed Rate:</strong> ${app.proposedRate}/hr
                          </p>
                        )}

                        {app.availability && (
                          <p className="text-sm text-gray-700">
                            <strong>Availability:</strong> {app.availability}
                          </p>
                        )}

                        {app.rejectionReason && app.status === 'rejected' && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">
                              <strong>Rejection Reason:</strong> {app.rejectionReason}
                            </p>
                          </div>
                        )}

                        <div className="mt-3 text-xs text-gray-500">
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                          {app.reviewedAt && (
                            <> • Reviewed {new Date(app.reviewedAt).toLocaleDateString()}</>
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>

                        {app.status === 'accepted' && (
                          <Link
                            href={`/dashboard/worker/messages`}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            Message Employer →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Cover Letter */}
                    {app.coverLetter && (
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
                          View Cover Letter
                        </summary>
                        <p className="mt-2 text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                          {app.coverLetter}
                        </p>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg mb-4">
                {filter === 'all'
                  ? 'No applications yet'
                  : `No ${filter} applications`}
              </p>
              <Link
                href="/jobs"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
