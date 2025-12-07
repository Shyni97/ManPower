/**
 * ManPower - Services Page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function ServicesPage() {
  usePageTitle('Services - ManPower');

  const services = [
    {
      icon: '👷',
      title: 'For Job Seekers',
      features: [
        'Create professional profile',
        'Browse verified job opportunities',
        'One-click job applications',
        'Direct messaging with employers',
        'Job alerts and notifications',
        'Profile visibility control'
      ]
    },
    {
      icon: '🏢',
      title: 'For Employers',
      features: [
        'Post unlimited job listings',
        'Access qualified candidate pool',
        'Advanced search filters',
        'Applicant tracking system',
        'Secure messaging platform',
        'Company profile management'
      ]
    },
    {
      icon: '✅',
      title: 'Verification Services',
      features: [
        'Identity verification',
        'Business license validation',
        'Background checks',
        'Skill certification',
        'Reference verification',
        'Secure document storage'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive solutions for workers and employers
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-600 hover:shadow-xl transition-all"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{service.title}</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect workers with employers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Verified</h3>
              <p className="text-gray-600">Complete verification process</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">Post jobs or apply to positions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Working</h3>
              <p className="text-gray-600">Begin your employment journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get Started Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the service that's right for you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/worker"
              className="px-8 py-4 bg-blue-600 text-white rounded-md text-base font-bold hover:bg-blue-700 transition-colors"
            >
              For Workers
            </Link>
            <Link
              href="/business"
              className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-md text-base font-bold hover:bg-yellow-500 transition-colors"
            >
              For Employers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
