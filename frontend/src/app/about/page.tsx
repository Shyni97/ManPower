/**
 * ManPower - About Us Page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function AboutPage() {
  usePageTitle('About Us - ManPower');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About ManPower</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connecting skilled workers with trusted employers across Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4">
                ManPower is dedicated to bridging the gap between skilled workers and businesses in Sri Lanka. 
                We believe everyone deserves access to legitimate job opportunities and reliable workforce solutions.
              </p>
              <p className="text-gray-600 text-lg">
                Our platform provides a safe, transparent, and efficient way for workers to find employment 
                and for businesses to hire qualified professionals.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Trust & Safety</h4>
                    <p className="text-gray-600">All users are verified for secure connections</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Transparency</h4>
                    <p className="text-gray-600">Clear processes and honest communication</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Accessibility</h4>
                    <p className="text-gray-600">Free for workers, affordable for businesses</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-xl text-gray-600">Active Workers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">400+</div>
              <div className="text-xl text-gray-600">Companies</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-xl text-gray-600">Jobs Posted</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of workers and employers who trust ManPower
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register?type=worker"
              className="px-8 py-4 bg-blue-600 text-white rounded-md text-base font-bold hover:bg-blue-700 transition-colors"
            >
              Sign Up as Worker
            </Link>
            <Link
              href="/register?type=business"
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-md text-base font-bold hover:bg-yellow-500 transition-colors"
            >
              Sign Up as Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
