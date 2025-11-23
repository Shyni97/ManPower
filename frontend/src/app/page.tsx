/**
 * ManPower - Home Page
 * Landing page connecting skilled workers with businesses
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  usePageTitle('ManPower - Connect Talent with Opportunity');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Connect Talent with Opportunity
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              ManPower bridges the gap between skilled workers and businesses looking
              for the perfect match.
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={
                    user?.role === 'business'
                      ? '/dashboard/business'
                      : user?.role === 'admin'
                      ? '/dashboard/admin'
                      : '/dashboard/worker'
                  }
                  className="px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-white"
                >
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ManPower?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The complete platform for modern workforce management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Job Matching
              </h3>
              <p className="text-gray-600">
                Our intelligent system matches workers with jobs based on skills,
                location, and availability.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-Time Communication
              </h3>
              <p className="text-gray-600">
                Connect instantly with employers or workers through our built-in
                messaging system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Safe and transparent payment processing with automatic commission
                handling.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ID Verification
              </h3>
              <p className="text-gray-600">
                Build trust with verified worker profiles and business credentials.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Rating System
              </h3>
              <p className="text-gray-600">
                Make informed decisions with transparent reviews and ratings from
                both sides.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Track earnings, job performance, and growth with comprehensive
                analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Workers */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-blue-600 mb-6">
                For Workers
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Create Your Profile
                    </h4>
                    <p className="text-gray-600">
                      Sign up, add your skills, experience, and set your hourly rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Browse & Apply
                    </h4>
                    <p className="text-gray-600">
                      Search for jobs matching your skills and apply instantly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Get Hired & Earn
                    </h4>
                    <p className="text-gray-600">
                      Connect with employers, complete work, and receive payments securely.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/register"
                className="mt-6 block w-full px-6 py-3 bg-blue-600 text-white text-center rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign Up as Worker
              </Link>
            </div>

            {/* For Businesses */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-600 mb-6">
                For Businesses
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Post a Job
                    </h4>
                    <p className="text-gray-600">
                      Describe your requirements, skills needed, and budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Review Applications
                    </h4>
                    <p className="text-gray-600">
                      Get applications from qualified workers and review their profiles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Hire & Manage
                    </h4>
                    <p className="text-gray-600">
                      Select the best candidates, manage work, and handle payments easily.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/register"
                className="mt-6 block w-full px-6 py-3 bg-green-600 text-white text-center rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Sign Up as Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of workers and businesses already using ManPower
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create Free Account
            </Link>
            <Link
              href="/jobs"
              className="px-8 py-4 bg-transparent text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-white"
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-gray-600">Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
