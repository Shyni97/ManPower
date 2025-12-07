/**
 * ManPower - FAQ Page
 */

'use client';

import React, { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function FAQPage() {
  usePageTitle('FAQ - ManPower');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is ManPower?',
          a: 'ManPower is a job marketplace platform that connects skilled workers with trusted employers across Sri Lanka. We provide a safe, transparent platform for job seekers to find employment and businesses to hire qualified workers.'
        },
        {
          q: 'Is ManPower free to use?',
          a: 'Yes! Workers can create profiles, browse jobs, and apply to positions completely free. Employers have access to free basic features and affordable premium packages for enhanced services.'
        },
        {
          q: 'How do I create an account?',
          a: 'Click the "Sign Up" button, choose whether you\'re a worker or employer, fill in your details, and verify your email address. It takes less than 5 minutes!'
        }
      ]
    },
    {
      category: 'For Workers',
      questions: [
        {
          q: 'How do I apply for jobs?',
          a: 'Browse available jobs, click on positions that interest you, and click the "Apply" button. Your profile information will be sent to the employer, and they can contact you directly through our messaging system.'
        },
        {
          q: 'How long does verification take?',
          a: 'Worker verification typically takes 24-48 hours. We verify your identity documents to ensure safety for all platform users. You\'ll receive an email notification once verified.'
        },
        {
          q: 'Can I apply to multiple jobs?',
          a: 'Yes! You can apply to as many jobs as you like. We recommend tailoring your profile to highlight relevant skills for each position.'
        },
        {
          q: 'How do I get paid?',
          a: 'Payment arrangements are made directly between you and your employer. We recommend discussing payment terms before starting work.'
        }
      ]
    },
    {
      category: 'For Employers',
      questions: [
        {
          q: 'How do I post a job?',
          a: 'After creating an employer account and getting verified, go to your dashboard and click "Post New Job". Fill in the job details, requirements, and salary information.'
        },
        {
          q: 'How much does it cost to post jobs?',
          a: 'Basic job postings start from as low as LKR 2,500. We offer various packages based on your hiring needs. Check our pricing page for details.'
        },
        {
          q: 'How are workers verified?',
          a: 'We verify worker identities through document checks, contact verification, and reference checks where applicable. All workers display a "Verified" badge on their profiles.'
        },
        {
          q: 'Can I edit my job postings?',
          a: 'Yes, you can edit your job postings at any time from your employer dashboard. Changes take effect immediately.'
        }
      ]
    },
    {
      category: 'Safety & Security',
      questions: [
        {
          q: 'Is my personal information safe?',
          a: 'Yes, we use industry-standard encryption and security measures to protect your data. Read our Privacy Policy for detailed information.'
        },
        {
          q: 'What if I encounter a problem with another user?',
          a: 'You can report any user or job posting that violates our terms. We investigate all reports and take appropriate action, including account suspension if necessary.'
        },
        {
          q: 'How do I know if a job is legitimate?',
          a: 'All employers are verified before posting jobs. Look for the "Verified Business" badge. Be cautious of jobs asking for payment or personal financial information upfront.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'I forgot my password. What should I do?',
          a: 'Click "Forgot Password" on the login page and enter your email. We\'ll send you a password reset link.'
        },
        {
          q: 'The website is not working properly. What should I do?',
          a: 'Try clearing your browser cache and cookies. If the problem persists, contact our support team at support@manpower.lk with details about the issue.'
        },
        {
          q: 'Can I use ManPower on my mobile phone?',
          a: 'Yes! Our website is mobile-responsive and works on all devices. We\'re also developing dedicated mobile apps coming soon.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find answers to common questions about ManPower
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const globalIndex = catIndex * 100 + qIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={qIndex} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                        <svg
                          className={`w-6 h-6 text-gray-600 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200">
                          <p className="text-gray-600">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to help you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@manpower.lk"
              className="px-8 py-4 bg-gray-200 text-gray-900 rounded-md font-bold hover:bg-gray-300 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
