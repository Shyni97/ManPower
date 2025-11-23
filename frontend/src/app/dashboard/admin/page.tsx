/**
 * Admin Dashboard (Placeholder)
 * Admin panel for system management
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function AdminDashboard() {
  usePageTitle('Admin Dashboard - ManPower');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard/worker');
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System management and oversight</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-3xl font-bold text-blue-600">0</div>
            <Link href="/dashboard/admin/users" className="text-sm text-blue-600 mt-2 inline-block">
              Manage →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Jobs</div>
            <div className="text-3xl font-bold text-green-600">0</div>
            <Link href="/dashboard/admin/jobs" className="text-sm text-blue-600 mt-2 inline-block">
              View →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending Verifications</div>
            <div className="text-3xl font-bold text-yellow-600">0</div>
            <Link href="/dashboard/admin/verification" className="text-sm text-blue-600 mt-2 inline-block">
              Review →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Payments</div>
            <div className="text-3xl font-bold text-purple-600">$0</div>
            <Link href="/dashboard/admin/payments" className="text-sm text-blue-600 mt-2 inline-block">
              Details →
            </Link>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/admin/users"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-sm text-gray-600">
              View, edit, and manage all users (workers, businesses, admins)
            </p>
          </Link>

          <Link
            href="/dashboard/admin/jobs"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">💼</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Management</h3>
            <p className="text-sm text-gray-600">
              Moderate job postings and view all active jobs
            </p>
          </Link>

          <Link
            href="/dashboard/admin/verification"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">✅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification</h3>
            <p className="text-sm text-gray-600">
              Review and approve worker ID verification requests
            </p>
          </Link>

          <Link
            href="/dashboard/admin/payments"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Oversight</h3>
            <p className="text-sm text-gray-600">
              Monitor all payments, commissions, and transactions
            </p>
          </Link>

          <Link
            href="/dashboard/admin/withdrawals"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🏦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdrawals</h3>
            <p className="text-sm text-gray-600">
              Process worker withdrawal requests
            </p>
          </Link>

          <Link
            href="/dashboard/admin/reports"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-sm text-gray-600">
              View system statistics and generate reports
            </p>
          </Link>
        </div>

        {/* Status Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Admin Panel Status</h3>
          <p className="text-blue-800 text-sm">
            This is a placeholder for the admin dashboard. The full admin panel will include:
          </p>
          <ul className="text-blue-800 text-sm mt-3 space-y-1 list-disc list-inside">
            <li>User management (view, edit, delete, change roles)</li>
            <li>Job moderation and management</li>
            <li>ID verification review and approval</li>
            <li>Payment monitoring and commission tracking</li>
            <li>Withdrawal request processing</li>
            <li>System statistics and analytics</li>
            <li>Activity logs and audit trails</li>
            <li>Support ticket management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
