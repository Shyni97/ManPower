/**
 * ManPower - Terms of Service Page
 */

'use client';

import React from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function TermsPage() {
  usePageTitle('Terms of Service - ManPower');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-blue-100">Last updated: December 2025</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-8">
              By accessing and using ManPower's services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="text-gray-600 mb-6">
              To use our services, you must:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into contracts</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-6">
              When creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Provide true, accurate, and complete information</li>
              <li>Maintain and update your information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Prohibited Activities</h2>
            <p className="text-gray-600 mb-6">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Post false, misleading, or fraudulent information</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Violate any laws or regulations</li>
              <li>Collect user information without consent</li>
              <li>Use automated systems to access the platform</li>
              <li>Interfere with the platform's operation</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Job Postings and Applications</h2>
            <p className="text-gray-600 mb-6">
              <strong>For Employers:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Job postings must be legitimate and accurate</li>
              <li>You must comply with employment laws</li>
              <li>You are responsible for your hiring decisions</li>
              <li>Payment for posted jobs is non-refundable</li>
            </ul>
            <p className="text-gray-600 mb-6">
              <strong>For Workers:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Profile information must be truthful</li>
              <li>You are responsible for your employment decisions</li>
              <li>Communication with employers should be professional</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
            <p className="text-gray-600 mb-8">
              Employers agree to pay applicable fees for premium services. All fees are non-refundable 
              unless otherwise stated. We reserve the right to change our pricing at any time.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 mb-8">
              All content, features, and functionality on our platform are owned by ManPower and protected 
              by copyright, trademark, and other intellectual property laws. You may not copy, modify, or 
              distribute our content without permission.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-8">
              Our services are provided "as is" without warranties of any kind. We do not guarantee that 
              our services will be uninterrupted, secure, or error-free. We are not responsible for the 
              actions of users on our platform.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-8">
              To the maximum extent permitted by law, ManPower shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of our services.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-8">
              We reserve the right to suspend or terminate your account at any time for violation of these 
              terms or for any other reason. You may also terminate your account at any time by contacting us.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-8">
              We may modify these terms at any time. Continued use of our services after changes constitutes 
              acceptance of the new terms.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-600 mb-8">
              These terms are governed by the laws of Sri Lanka. Any disputes shall be resolved in the 
              courts of Colombo, Sri Lanka.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these terms, contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600">Email: legal@manpower.lk</p>
              <p className="text-gray-600">Phone: +94 11 234 5678</p>
              <p className="text-gray-600">Address: 123 Main Street, Colombo 03, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
