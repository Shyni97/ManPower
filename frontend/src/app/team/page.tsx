/**
 * ManPower - Our Team Page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function TeamPage() {
  usePageTitle('Our Team - ManPower');

  const team = [
    {
      name: 'Rajith Fernando',
      role: 'CEO & Founder',
      description: '10+ years experience in HR and recruitment',
      image: '👨‍💼'
    },
    {
      name: 'Sanduni Perera',
      role: 'Head of Operations',
      description: 'Expert in workforce management',
      image: '👩‍💼'
    },
    {
      name: 'Kasun Silva',
      role: 'Technology Lead',
      description: 'Building scalable platform solutions',
      image: '👨‍💻'
    },
    {
      name: 'Nimali Jayasinghe',
      role: 'Customer Success Manager',
      description: 'Ensuring best user experience',
      image: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Dedicated professionals working to connect workers and employers
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-blue-600 hover:shadow-xl transition-all"
              >
                <div className="text-7xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented individuals to help us grow
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
          >
            View Open Positions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions? Our team is here to help
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@manpower.lk</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+94 11 234 5678</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
