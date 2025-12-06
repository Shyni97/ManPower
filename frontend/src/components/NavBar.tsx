/**
 * NavBar Component
 * Modern responsive navigation bar for ManPower marketplace
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../controllers/authController';

const NavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) => {
    return `px-4 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? 'text-blue-600 font-semibold'
        : 'text-gray-700 hover:text-blue-600'
    }`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ManPower</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link href="/worker" className={navLinkClass('/worker')}>
              For Workers
            </Link>
            <Link href="/business" className={navLinkClass('/business')}>
              For Businesses
            </Link>
            <Link href="/jobs" className={navLinkClass('/jobs')}>
              Jobs
            </Link>
            <Link href="/how-it-works" className={navLinkClass('/how-it-works')}>
              How It Works
            </Link>
            <Link href="/contact" className={navLinkClass('/contact')}>
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {isAuthenticated ? (
              <>
                <Link href="/chat" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Messages
                </Link>
                {user?.role === 'business' && (
                  <Link
                    href="/dashboard/business"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {user?.role === 'worker' && (
                  <Link
                    href="/dashboard/worker"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <span className="text-sm text-gray-600">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/worker"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Find Work
                </Link>
                <Link
                  href="/business"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  Post a Job
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/worker"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Workers
            </Link>
            <Link
              href="/business"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              href="/jobs"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/how-it-works"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link
                    href="/chat"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Messages
                  </Link>
                  {user?.role === 'business' && (
                    <Link
                      href="/dashboard/business"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user?.role === 'worker' && (
                    <Link
                      href="/dashboard/worker"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                </div>

                <div className="px-3 py-3 border-t border-gray-200 mt-3">
                  <p className="text-sm text-gray-600 mb-3">
                    Logged in as <span className="font-semibold text-gray-900">{user?.name}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-3 py-3 space-y-2 border-t border-gray-200 mt-3">
                <Link
                  href="/worker"
                  className="block w-full px-4 py-2.5 text-center bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Work
                </Link>
                <Link
                  href="/business"
                  className="block w-full px-4 py-2.5 text-center bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post a Job
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
