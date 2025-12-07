/**
 * ManPower - Privacy Policy Page
 */

'use client';

import React from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function PrivacyPage() {
  usePageTitle('Privacy Policy - ManPower');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100">Last updated: December 2025</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Profile information (work experience, skills, qualifications)</li>
              <li>Business information (company name, registration details)</li>
              <li>Communications and messages sent through our platform</li>
              <li>Payment and billing information</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Match workers with job opportunities</li>
              <li>Verify identities and prevent fraud</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>With your consent or at your direction</li>
              <li>With employers when you apply for jobs</li>
              <li>With service providers who assist our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect rights, property, and safety</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-8">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-600 mb-8">
              We use cookies and similar tracking technologies to collect information about your 
              browsing activities. You can control cookies through your browser settings.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-600 mb-8">
              Our services are not intended for individuals under the age of 18. We do not 
              knowingly collect personal information from children.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-600 mb-8">
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this privacy policy, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-600">Email: privacy@manpower.lk</p>
              <p className="text-gray-600">Phone: +94 11 234 5678</p>
              <p className="text-gray-600">Address: 123 Main Street, Colombo 03, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
