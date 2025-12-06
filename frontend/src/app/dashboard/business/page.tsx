/**
 * Business Dashboard
 * Main dashboard for businesses to manage jobs, applications, and payments
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getMyJobs } from '@/controllers/jobController';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Job {
  _id: string;
  title: string;
  location: string;
  status: string;
  applicationsCount: number;
  numberOfWorkers: number;
  createdAt: string;
  budget?: {
    min: number;
    max: number;
  };
}

export default function BusinessDashboard() {
  usePageTitle('Business Dashboard - ManPower');
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    hiredWorkers: 0,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'business') {
      router.push('/dashboard/worker');
    }
  }, [authLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const response = await getMyJobs();
      const jobsData: any = response;
      setJobs(jobsData.slice(0, 5)); // Get recent 5

      // Calculate stats
      const totalApplications = jobsData.reduce(
        (sum: number, job: any) => sum + (job.applicationsCount || 0),
        0
      );
      const activeJobs = jobsData.filter((job: any) => job.status === 'open').length;

      setStats({
        totalJobs: jobsData.length,
        activeJobs,
        totalApplications,
        hiredWorkers: 0, // This would come from a separate API
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.businessProfile?.companyName || user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Jobs</div>
            <div className="text-3xl font-bold text-blue-600">{stats.totalJobs}</div>
            <div className="text-sm text-gray-500 mt-2">All time</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Jobs</div>
            <div className="text-3xl font-bold text-green-600">{stats.activeJobs}</div>
            <div className="text-sm text-gray-500 mt-2">Currently open</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Applications</div>
            <div className="text-3xl font-bold text-purple-600">{stats.totalApplications}</div>
            <div className="text-sm text-gray-500 mt-2">Total received</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Hired Workers</div>
            <div className="text-3xl font-bold text-orange-600">{stats.hiredWorkers}</div>
            <div className="text-sm text-gray-500 mt-2">All time</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/business/jobs/new"
            className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition-colors"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-semibold">Post New Job</div>
          </Link>

          <Link
            href="/dashboard/business/applications"
            className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700 transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-semibold">View Applications</div>
          </Link>

          <Link
            href="/dashboard/business/messages"
            className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition-colors"
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold">Messages</div>
          </Link>

          <Link
            href="/dashboard/business/payments"
            className="bg-orange-600 text-white rounded-lg p-4 text-center hover:bg-orange-700 transition-colors"
          >
            <div className="text-2xl mb-2">💳</div>
            <div className="font-semibold">Payments</div>
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Job Postings</h2>
              <Link href="/dashboard/business/jobs" className="text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {job.location} • {job.numberOfWorkers} worker(s) needed
                      </p>
                      {job.budget && (
                        <p className="text-sm text-gray-500 mt-1">
                          Budget: ${job.budget.min} - ${job.budget.max}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {job.applicationsCount} application(s)
                        </span>
                        <span className="text-xs text-gray-400">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      <Link
                        href={`/dashboard/business/jobs/${job._id}`}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg mb-4">No jobs posted yet</p>
                <Link
                  href="/dashboard/business/jobs/new"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        {!user?.businessProfile?.companyName && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Complete Your Business Profile
            </h3>
            <p className="text-yellow-800 mb-4">
              Add your company details to build trust with potential workers!
            </p>
            <Link
              href="/dashboard/business/profile"
              className="inline-block px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Complete Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
