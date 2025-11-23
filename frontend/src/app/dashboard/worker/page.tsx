/**
 * Worker Dashboard
 * Main dashboard for workers to view jobs, applications, earnings, and profile
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getWorkerApplications } from '@/controllers/jobController';
import { getWalletBalance } from '@/controllers/jobController';
import { usePageTitle } from '@/hooks/usePageTitle';

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    businessId: {
      name: string;
    };
    location: string;
  };
  status: string;
  proposedRate?: number;
  createdAt: string;
}

interface WalletData {
  balance: number;
  pendingBalance: number;
  totalEarnings: number;
}

export default function WorkerDashboard() {
  usePageTitle('Worker Dashboard - ManPower');
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'worker') {
      router.push('/dashboard/business');
    }
  }, [authLoading, isAuthenticated, user, router]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [appsRes, walletRes] = await Promise.all([
        getWorkerApplications(),
        getWalletBalance(),
      ]);

      setApplications(appsRes.data.slice(0, 5)); // Get recent 5
      setWallet(walletRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
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
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">Here's your job search overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Available Balance</div>
            <div className="text-3xl font-bold text-green-600">
              ${wallet?.balance.toFixed(2) || '0.00'}
            </div>
            <Link href="/dashboard/worker/earnings" className="text-sm text-blue-600 mt-2 inline-block">
              View Details →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending Payments</div>
            <div className="text-3xl font-bold text-yellow-600">
              ${wallet?.pendingBalance.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm text-gray-500 mt-2">In progress</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Earned</div>
            <div className="text-3xl font-bold text-blue-600">
              ${wallet?.totalEarnings.toFixed(2) || '0.00'}
            </div>
            <div className="text-sm text-gray-500 mt-2">All time</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition-colors"
          >
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold">Browse Jobs</div>
          </Link>

          <Link
            href="/dashboard/worker/applications"
            className="bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700 transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-semibold">My Applications</div>
          </Link>

          <Link
            href="/dashboard/worker/profile"
            className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition-colors"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold">Edit Profile</div>
          </Link>

          <Link
            href="/dashboard/worker/messages"
            className="bg-orange-600 text-white rounded-lg p-4 text-center hover:bg-orange-700 transition-colors"
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold">Messages</div>
          </Link>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link href="/dashboard/worker/applications" className="text-blue-600 hover:text-blue-700">
                View All →
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((app) => (
                <div key={app._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.jobId.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {app.jobId.businessId.name} • {app.jobId.location}
                      </p>
                      {app.proposedRate && (
                        <p className="text-sm text-gray-500 mt-1">
                          Proposed Rate: ${app.proposedRate}/hr
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg mb-4">No applications yet</p>
                <Link
                  href="/jobs"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Available Jobs
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        {!user?.workerProfile?.skills?.length && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Complete Your Profile
            </h3>
            <p className="text-yellow-800 mb-4">
              Add your skills and experience to increase your chances of getting hired!
            </p>
            <Link
              href="/dashboard/worker/profile"
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
