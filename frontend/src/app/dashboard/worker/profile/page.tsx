/**
 * Worker Profile Page
 * Edit worker profile including skills, experience, and availability
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function WorkerProfilePage() {
  usePageTitle('My Profile - Worker Dashboard - ManPower');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    skills: [] as string[],
    skillInput: '',
    experience: '',
    hourlyRate: '',
    availability: 'available',
    bio: '',
    portfolio: [] as string[],
    portfolioInput: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'worker') {
      router.push('/dashboard/business');
    } else if (user?.workerProfile) {
      setProfileData({
        ...profileData,
        skills: user.workerProfile.skills || [],
        experience: user.workerProfile.experience || '',
        hourlyRate: user.workerProfile.hourlyRate?.toString() || '',
        availability: user.workerProfile.availability || 'available',
      });
    }
  }, [user]);

  const handleAddSkill = () => {
    if (profileData.skillInput.trim() && !profileData.skills.includes(profileData.skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, profileData.skillInput.trim()],
        skillInput: '',
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/workers/profile', {
        skills: profileData.skills,
        experience: profileData.experience,
        hourlyRate: profileData.hourlyRate ? parseFloat(profileData.hourlyRate) : undefined,
        availability: profileData.availability,
        bio: profileData.bio,
      });

      alert('Profile updated successfully!');
      router.push('/dashboard/worker');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Worker Profile</h1>
          <p className="text-gray-600 mt-2">Complete your profile to get more job opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills * <span className="text-gray-500">(Add at least 3 skills)</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={profileData.skillInput}
                onChange={(e) => setProfileData({ ...profileData, skillInput: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="e.g., JavaScript, Plumbing, Carpentry"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience *
            </label>
            <textarea
              value={profileData.experience}
              onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
              rows={6}
              required
              placeholder="Describe your work experience, certifications, and achievements..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hourly Rate (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                required
                min="1"
                step="0.01"
                placeholder="25.00"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability Status
            </label>
            <select
              value={profileData.availability}
              onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="available">Available Now</option>
              <option value="busy">Currently Busy</option>
              <option value="unavailable">Not Available</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio (optional)
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              placeholder="Tell employers about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || profileData.skills.length < 3}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/worker')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>

          {profileData.skills.length < 3 && (
            <p className="text-sm text-red-600">
              Please add at least 3 skills to continue
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
