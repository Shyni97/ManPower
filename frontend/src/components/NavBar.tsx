/**
 * NavBar Component
 * Global navigation bar with responsive mobile menu
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

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-primary-700 text-white'
        : 'text-gray-300 hover:bg-primary-600 hover:text-white'
    }`;

  return (
    <nav className="bg-primary-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">ManPower</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>
            {user?.role === 'worker' && (
              <Link href="/jobs" className={navLinkClass('/jobs')}>
                Browse Jobs
              </Link>
            )}

            {isAuthenticated ? (
              <>
                {user?.role === 'business' && (
                  <>
                    <Link
                      href="/dashboard/business"
                      className={navLinkClass('/dashboard/business')}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/business/jobs"
                      className={navLinkClass('/dashboard/business/jobs')}
                    >
                      My Job Posts
                    </Link>
                  </>
                )}

                {user?.role === 'worker' && (
                  <Link
                    href="/dashboard/worker"
                    className={navLinkClass('/dashboard/worker')}
                  >
                    Dashboard
                  </Link>
                )}

                <Link href="/chat" className={navLinkClass('/chat')}>
                  Messages
                </Link>

                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-primary-600">
                  <span className="text-white text-sm">
                    Hello, <span className="font-semibold">{user?.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white text-sm font-medium hover:text-primary-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white text-primary-700 rounded-md text-sm font-medium hover:bg-primary-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user?.role === 'worker' && (
              <Link
                href="/jobs"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>
            )}

            {isAuthenticated ? (
              <>
                {user?.role === 'business' && (
                  <>
                    <Link
                      href="/dashboard/business"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/business/jobs"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Job Posts
                    </Link>
                  </>
                )}

                {user?.role === 'worker' && (
                  <Link
                    href="/dashboard/worker"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/chat"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>

                <div className="px-3 py-2 text-white border-t border-primary-600 mt-2">
                  <p className="text-sm mb-2">
                    Logged in as <span className="font-semibold">{user?.name}</span>
                  </p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-2 text-center bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full px-4 py-2 text-center bg-white text-primary-700 rounded-md text-sm font-medium hover:bg-primary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
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
