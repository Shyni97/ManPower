/**
 * ManPower - Home Page
 * Landing page connecting skilled workers with businesses
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePageTitle } from '../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle('ManPower - Connecting Skilled Workers with Trusted Employers');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentService, setCurrentService] = useState(0);

  const services = [
    {
      icon: '👷',
      title: 'For Job Seekers',
      description: 'Create your profile, browse verified jobs, and apply with one click. Start earning with trusted employers today.',
    },
    {
      icon: '🏢',
      title: 'For Employers',
      description: 'Post jobs, review qualified candidates, and hire skilled workers quickly. Simple and efficient hiring process.',
    },
    {
      icon: '✅',
      title: 'Verified & Secure',
      description: 'All users are verified for safety. Secure messaging, transparent processes, and trusted by thousands.',
    },
  ];

  const testimonials = [
    {
      name: 'Ravindu Silva',
      role: 'Construction Worker',
      image: '/testimonial1.jpg',
      rating: 5,
      text: 'I found a job in 3 days using ManPower. The process was so easy and all employers were verified. Highly recommend!',
    },
    {
      name: 'Amila Perera',
      role: 'HR Manager, BuildCo',
      image: '/testimonial2.jpg',
      rating: 5,
      text: 'We hired 10 workers in one week! The platform made it so simple to find qualified candidates. Game changer for our business.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with ManPower Branding */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="z-10">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                Trusted by 5,000+ Workers & 400+ Companies
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect Job<br />
                <span className="text-yellow-300">Or Hire Great Workers</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Connect with verified employers or find skilled workers. Simple, secure, and free to start.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/worker"
                  className="px-8 py-4 bg-white text-blue-600 rounded-md text-base font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  I'm Looking for Work
                </Link>
                <Link
                  href="/business"
                  className="px-8 py-4 bg-yellow-400 text-gray-900 rounded-md text-base font-bold hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  I Want to Hire Workers
                </Link>
              </div>
            </div>

            {/* Right Content - Worker Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-700 z-10"></div>
                {/* Placeholder for worker image */}
                <div className="w-full h-full bg-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-8xl">👷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Platform Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How the Platform Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps whether you're looking for work or hiring workers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Workers Side */}
            <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
                  👷
                </div>
                <h3 className="text-3xl font-bold text-gray-900">For Workers</h3>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Create Profile</h4>
                    <p className="text-gray-600">
                      Sign up and build your professional profile with your skills and experience.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Browse Jobs</h4>
                    <p className="text-gray-600">
                      Explore hundreds of verified job opportunities matching your skills.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Apply & Get Hired</h4>
                    <p className="text-gray-600">
                      Apply with one click and start working with verified employers.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/register?type=worker" className="mt-8 inline-block px-8 py-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors">
                Start as a Worker
              </Link>
            </div>

            {/* For Businesses Side */}
            <div className="bg-green-50 rounded-2xl p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                  🏢
                </div>
                <h3 className="text-3xl font-bold text-gray-900">For Businesses</h3>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Create Business Account</h4>
                    <p className="text-gray-600">
                      Register your company and verify your business credentials.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Post Job</h4>
                    <p className="text-gray-600">
                      Create detailed job listings and reach thousands of qualified workers.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Hire Workers</h4>
                    <p className="text-gray-600">
                      Review applications and hire the best talent for your projects.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/register?type=business" className="mt-8 inline-block px-8 py-4 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 transition-colors">
                Start as an Employer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ManPower Section with Rounded Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Choose<br />
                ManPower Platform?
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Trusted by thousands of workers and employers across Sri Lanka. Join the leading job marketplace today.
              </p>
              
              {/* Checkmark List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">All businesses are verified to ensure safe and legitimate job opportunities for workers.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Create profile, browse jobs, and apply completely free - no hidden charges ever.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Apply to jobs with one click - no complicated forms or lengthy processes required.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Chat directly with employers in a safe, built-in secure messaging system.</p>
                </li>
              </ul>

              <Link href="/jobs" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors">
                Browse All Jobs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right Content - Rounded Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Large Top Image */}
                <div className="col-span-2 h-64 bg-gray-300 rounded-t-[100px] rounded-br-[100px] overflow-hidden relative">
                  <Image
                    src="/1.jpg"
                    alt="ManPower Platform - Workers and Employers"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Bottom Left Image */}
                <div className="h-48 bg-gray-300 rounded-bl-[80px] rounded-tr-[80px] overflow-hidden relative">
                  <Image
                    src="/2.jpg"
                    alt="Skilled Workers"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Bottom Right Image */}
                <div className="h-48 bg-gray-300 rounded-br-[80px] rounded-tl-[80px] overflow-hidden relative">
                  <Image
                    src="/3.jpg"
                    alt="Job Opportunities"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* We Provide Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              We Provide Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl border-2 transition-all ${
                  index === 1 ? 'border-[#f5c842] shadow-lg' : 'border-gray-200 hover:border-[#f5c842] hover:shadow-lg'
                }`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <button className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold transition-colors ${
                  index === 1
                    ? 'bg-[#f5c842] text-gray-900 hover:bg-[#e6b932]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Start
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setCurrentService((prev) => (prev > 0 ? prev - 1 : services.length - 1))}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#f5c842] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentService((prev) => (prev < services.length - 1 ? prev + 1 : 0))}
              className="w-12 h-12 bg-[#f5c842] rounded-full flex items-center justify-center hover:bg-[#e6b932] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Hear From Our Satisfied<br />
              Clients Have to Say
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#f5c842] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-start gap-3">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#f5c842] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
              className="w-12 h-12 bg-[#f5c842] rounded-full flex items-center justify-center hover:bg-[#e6b932] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Featured Jobs
              </h2>
              <p className="text-gray-600">
                Latest opportunities from top employers across Sri Lanka.
              </p>
            </div>
            <Link href="/jobs" className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-md font-bold hover:bg-yellow-500 transition-colors">
              See All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Card 1 - Large */}
            <div className="group cursor-pointer">
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/1.jpg"
                  alt="Construction Worker"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Construction Worker
              </h3>
              <p className="text-gray-600 mb-3">
                ABC Construction Ltd - Colombo • LKR 1,500-2,000/day • Need experienced construction workers for residential project.
              </p>
              <Link href="/jobs" className="inline-flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-full group-hover:bg-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right Column - 2 smaller job cards */}
            <div className="space-y-8">
              {/* Job Card 2 */}
              <div className="group cursor-pointer flex gap-4">
                <div className="flex-shrink-0 w-48 h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src="/2.jpg"
                    alt="Office Cleaner"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Office Cleaner
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Clean Pro Services - Kandy • LKR 35,000/month • Looking for reliable office cleaners.
                  </p>
                  <Link href="/jobs" className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full group-hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="group cursor-pointer flex gap-4">
                <div className="flex-shrink-0 w-48 h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src="/3.jpg"
                    alt="Delivery Driver"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Delivery Driver
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    QuickDeliver Express - Galle • LKR 1,200/day • Part-time delivery drivers needed.
                  </p>
                  <Link href="/jobs" className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full group-hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">
                BUI<span className="text-[#f5c842]">L</span>DING
              </h3>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap justify-center gap-8 mb-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">Project</Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">Service</Link>
              <Link href="/team" className="text-gray-600 hover:text-gray-900 transition-colors">Our Team</Link>
            </nav>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-[#f5c842] hover:text-gray-900 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-[#f5c842] hover:text-gray-900 transition-colors">
                <span className="text-sm font-bold">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-[#f5c842] hover:text-gray-900 transition-colors">
                <span className="text-sm font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-[#f5c842] hover:text-gray-900 transition-colors">
                <span className="text-sm font-bold">yt</span>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              ©2023 DesignAxen. All Copyrights are reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
