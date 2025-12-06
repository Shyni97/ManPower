'use client';

import Link from 'next/link';

export default function WorkerLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                ✨ Join 10,000+ Workers Already Hired
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Find Reliable Work, Faster and Easier
              </h1>
              <p className="text-xl sm:text-2xl mb-8 text-blue-100 leading-relaxed">
                Join thousands of skilled workers getting hired through ManPower. Free registration, verified employers, no middlemen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="group px-8 py-4 bg-white text-blue-700 rounded-xl text-lg font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Profile - It's Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/jobs"
                  className="px-8 py-4 bg-transparent text-white rounded-xl text-lg font-bold hover:bg-white/10 transition-all border-2 border-white text-center"
                >
                  Browse Jobs
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free Forever
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Employers
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Apply in 1 Click
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="text-7xl mb-4 text-center">📱</div>
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold mb-2">10,000+</div>
                    <div className="text-blue-100">Active Workers</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-3xl mb-1">⚡</div>
                      <div className="text-sm">Fast Hiring</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-3xl mb-1">💰</div>
                      <div className="text-sm">Fair Pay</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works for Workers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get hired in 4 simple steps. No complicated processes, no hassle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
              </div>
              <div className="mt-8">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Profile</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Sign up with email/phone
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Add skills & experience
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Upload CV (optional)
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
              </div>
              <div className="mt-8">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Browse Available Jobs</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Real job postings
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified businesses only
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Filter by location & salary
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
              </div>
              <div className="mt-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Apply in One Click</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No need to send emails
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Apply through your profile
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Track applications
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  4
                </div>
              </div>
              <div className="mt-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Hired</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Businesses contact you
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Chat with employers
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Start your job!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Benefits That Build Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built a platform that puts workers first. Safe, secure, and simple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-blue-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🆓
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Registration</h3>
              <p className="text-gray-600">
                100% free to sign up and use. No hidden charges, no subscription fees. Ever.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-green-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ✅
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Employers Only</h3>
              <p className="text-gray-600">
                All businesses are verified before posting jobs. Your safety is our priority.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-purple-100">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🚫
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Middlemen</h3>
              <p className="text-gray-600">
                Connect directly with employers. No agencies, no commission fees.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-orange-100">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Application Process</h3>
              <p className="text-gray-600">
                Apply to jobs in seconds. Your profile is always ready to go.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-cyan-100">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🔒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safe & Secure Platform</h3>
              <p className="text-gray-600">
                Your personal information is protected with industry-standard security.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-pink-100">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🔔
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Alerts for New Jobs</h3>
              <p className="text-gray-600">
                Instant notifications when new jobs match your skills and location.
              </p>
            </div>

            {/* Benefit 7 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Applications</h3>
              <p className="text-gray-600">
                See all your applications in one place. Know exactly where you stand.
              </p>
            </div>

            {/* Benefit 8 */}
            <div className="group bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                💬
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chat with Employers</h3>
              <p className="text-gray-600">
                Built-in messaging to discuss job details directly with employers.
              </p>
            </div>

            {/* Benefit 9 */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-yellow-100">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">
                Access jobs anytime, anywhere. Works perfectly on your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Jobs Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              🔥 Hot Jobs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Live Jobs Available Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real opportunities from verified employers. Apply today!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Job Card 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                  🏗️
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  URGENT
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Construction Worker</h3>
              <p className="text-gray-600 mb-4">📍 Colombo • LKR 1,500-2,000/day</p>
              <p className="text-sm text-gray-500 mb-4">
                Need 5 experienced construction workers for residential project. Start immediately.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Construction</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Full-time</span>
              </div>
              <Link
                href="/jobs"
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Apply Now →
              </Link>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-2xl">
                  🍽️
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  NEW
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Restaurant Waiter</h3>
              <p className="text-gray-600 mb-4">📍 Galle • LKR 40,000-50,000/month</p>
              <p className="text-sm text-gray-500 mb-4">
                Looking for friendly waiters with good English skills for busy restaurant.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Hospitality</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Full-time</span>
              </div>
              <Link
                href="/jobs"
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Apply Now →
              </Link>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  🚗
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                  FLEXIBLE
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery Driver</h3>
              <p className="text-gray-600 mb-4">📍 Kandy • LKR 1,000-1,500/day</p>
              <p className="text-sm text-gray-500 mb-4">
                Part-time delivery drivers needed. Must have valid license and own vehicle.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Delivery</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Part-time</span>
              </div>
              <Link
                href="/jobs"
                className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Apply Now →
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl text-lg font-bold hover:bg-gray-800 transition-all"
            >
              View All Jobs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
              ⭐ Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Workers Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who found jobs through ManPower.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "I found my job in just 3 days using ManPower. The process was so simple and the employer was verified. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  N
                </div>
                <div>
                  <div className="font-bold text-gray-900">Nimal Perera</div>
                  <div className="text-sm text-gray-600">Construction Worker</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Now I get regular work through this site. The notification feature helps me never miss a job opportunity. Thank you ManPower!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="font-bold text-gray-900">Samanthi Silva</div>
                  <div className="text-sm text-gray-600">Office Assistant</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Best platform for finding genuine work. No fake job postings, all employers are verified. Already got 2 jobs through ManPower!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  K
                </div>
                <div>
                  <div className="font-bold text-gray-900">Kamal Fernando</div>
                  <div className="text-sm text-gray-600">Delivery Driver</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of workers who have already found their dream jobs. Create your free profile today and start applying!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="group px-10 py-5 bg-white text-blue-700 rounded-xl text-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-white/50 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Create Your Free Profile Today
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/jobs"
              className="px-10 py-5 bg-transparent text-white rounded-xl text-xl font-bold hover:bg-white/10 transition-all border-2 border-white"
            >
              Start Applying for Jobs Now
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Start in 2 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 ManPower. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
