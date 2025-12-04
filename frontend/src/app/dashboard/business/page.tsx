/**
 * Business Dashboard
 * Main dashboard for businesses to manage jobs, applications, and payments
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
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
  applicants?: any[];
}

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  totalSpent: number;
  monthlyChange: {
    jobs: number;
    applications: number;
    spent: number;
  };
}

export default function BusinessDashboard() {
  usePageTitle('Business Dashboard - ManPower');
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalSpent: 0,
    monthlyChange: {
      jobs: 0,
      applications: 0,
      spent: 0,
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'business') {
      router.push('/dashboard/worker');
    }
  }, [authLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'business') {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/jobs/business/my-jobs');
      if (response.data?.success) {
        const jobsData = response.data.data || [];
        setJobs(jobsData);

        // Calculate stats
        const totalApplications = jobsData.reduce(
          (sum: number, job: Job) => sum + (job.applicants?.length || 0),
          0
        );
        const activeJobs = jobsData.filter(
          (job: Job) => job.status === 'open' || !job.status
        ).length;
        const totalSpent = jobsData.reduce(
          (sum: number, job: Job) => sum + (job.budget?.max || 0),
          0
        );

        setStats({
          totalJobs: jobsData.length,
          activeJobs,
          totalApplications,
          totalSpent,
          monthlyChange: {
            jobs: 5.2,
            applications: -14,
            spent: 48,
          },
        });
      }
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'business') {
    return null;
  }

  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-semibold">{user?.name}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${stats.monthlyChange.jobs >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyChange.jobs >= 0 ? '+' : ''}{stats.monthlyChange.jobs}%
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Jobs</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
            <p className="text-xs text-gray-500 mt-2">All time posted</p>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-600">Active</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Jobs</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
            <p className="text-xs text-gray-500 mt-2">Currently open</p>
          </div>

          {/* Total Applications */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${stats.monthlyChange.applications >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyChange.applications >= 0 ? '+' : ''}{stats.monthlyChange.applications}%
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Applications</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
            <p className="text-xs text-gray-500 mt-2">From all jobs</p>
          </div>

          {/* Total Budget */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${stats.monthlyChange.spent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyChange.spent >= 0 ? '+' : ''}{stats.monthlyChange.spent}%
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Budget</h3>
            <p className="text-3xl font-bold text-gray-900">LKR {stats.totalSpent.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Allocated budget</p>
          </div>
        </div>

        {/* Quick Actions & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <p className="text-cyan-50 mb-6 text-sm">Manage your manpower needs efficiently</p>
              <Link
                href="/dashboard/business/jobs/new"
                className="block w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center mb-3"
              >
                + Post New Job
              </Link>
              <Link
                href="/dashboard/business/jobs"
                className="block w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center"
              >
                View All Jobs
              </Link>
            </div>
          </div>

          {/* Active Jobs Overview Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Active Jobs Overview</h2>
                <span className="text-sm text-green-600 font-medium">Last 7 days</span>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {[45, 62, 58, 75, 68, 82, 70].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg hover:from-cyan-600 hover:to-blue-500 transition-all cursor-pointer relative group" style={{ height: `${height}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {Math.floor((height / 100) * 20)} active jobs
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Jobs</h2>
              <Link href="/dashboard/business/jobs" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-5xl mb-4">📋</div>
                  <p className="text-gray-500 mb-4">No jobs posted yet</p>
                  <Link
                    href="/dashboard/business/jobs/new"
                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Post Your First Job
                  </Link>
                </div>
              ) : (
                recentJobs.map((job) => (
                  <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status || 'open'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">📍 {job.location}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">{job.applicants?.length || 0} applicants</span>
                      <span className="text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <span className="text-xs text-gray-500">Live updates</span>
            </div>
            <div className="space-y-4">
              {stats.totalApplications > 0 ? (
                <>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New application received</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💼</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Job post updated</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👥</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Worker profile viewed</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📊</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Monthly report generated</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📊</div>
                  <p className="text-gray-500 text-sm">No recent activity</p>
                  <p className="text-gray-400 text-xs mt-2">Activity will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
