/**
 * Home Page
 * Landing page for ManPower job marketplace
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Connect Talent with Opportunity
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              ManPower bridges the gap between skilled workers and businesses looking
              for the perfect match.
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/register"
                  className="px-8 py-4 bg-white text-primary-700 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-primary-700 text-white rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white"
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
                      : '/dashboard/worker'
                  }
                  className="px-8 py-4 bg-white text-primary-700 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-primary-700 text-white rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors border-2 border-white"
                >
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose ManPower?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Easy Job Search
              </h3>
              <p className="text-gray-600">
                Find the perfect job match with our advanced filtering and search
                capabilities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Quality Connections
              </h3>
              <p className="text-gray-600">
                Connect with verified businesses and skilled workers for quality
                opportunities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Quick & Efficient
              </h3>
              <p className="text-gray-600">
                Streamlined process from posting to hiring, saving you time and effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of workers and businesses using ManPower to find their
            perfect match.
          </p>
          {!isAuthenticated && (
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Sign Up Now
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
