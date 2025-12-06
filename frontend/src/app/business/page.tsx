'use client';

import Link from 'next/link';

export default function BusinessLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Find Skilled Workers for Your Business
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Post jobs, review qualified candidates, and hire the best workers to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-green-700 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-green-700 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors border-2 border-white"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-12">
            <h3 className="text-3xl font-bold text-green-600 mb-8">For Businesses</h3>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Post a Job</h4>
                  <p className="text-gray-600">
                    Describe your requirements, skills needed, and budget.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Review Applications</h4>
                  <p className="text-gray-600">
                    Get applications from qualified workers and review their profiles.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Hire & Manage</h4>
                  <p className="text-gray-600">
                    Select the best candidates, manage work, and handle payments easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Quality Workers</h3>
              <p className="text-gray-600">
                Access a pool of skilled, verified workers ready to help your business.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Quick Hiring</h3>
              <p className="text-gray-600">
                Post jobs and start receiving applications within hours.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Handle all payments securely through our platform.
              </p>
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
