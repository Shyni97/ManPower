/**
 * Post New Job Page
 * Business can create new job postings
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function PostJobPage() {
  usePageTitle('Post a Job - Business Dashboard - ManPower');
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'full-time',
    numberOfWorkers: 1,
    urgency: 'medium',
    budgetMin: '',
    budgetMax: '',
    skills: [] as string[],
    skillInput: '',
    requirements: [] as string[],
    requirementInput: '',
    benefits: [] as string[],
    benefitInput: '',
    startDate: '',
    duration: '',
    applicationDeadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    if (jobData.skillInput.trim() && !jobData.skills.includes(jobData.skillInput.trim())) {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, jobData.skillInput.trim()],
        skillInput: '',
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddRequirement = () => {
    if (jobData.requirementInput.trim()) {
      setJobData({
        ...jobData,
        requirements: [...jobData.requirements, jobData.requirementInput.trim()],
        requirementInput: '',
      });
    }
  };

  const handleAddBenefit = () => {
    if (jobData.benefitInput.trim()) {
      setJobData({
        ...jobData,
        benefits: [...jobData.benefits, jobData.benefitInput.trim()],
        benefitInput: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: jobData.title,
        description: jobData.description,
        location: jobData.location,
        jobType: jobData.jobType,
        numberOfWorkers: parseInt(jobData.numberOfWorkers.toString()),
        urgency: jobData.urgency,
        skills: jobData.skills,
        requirements: jobData.requirements.length > 0 ? jobData.requirements : undefined,
        benefits: jobData.benefits.length > 0 ? jobData.benefits : undefined,
        startDate: jobData.startDate || undefined,
        duration: jobData.duration || undefined,
        applicationDeadline: jobData.applicationDeadline || undefined,
        budget: jobData.budgetMin && jobData.budgetMax ? {
          min: parseFloat(jobData.budgetMin),
          max: parseFloat(jobData.budgetMax),
          currency: 'USD',
        } : undefined,
      };

      const response = await api.post('/jobs', payload);
      if (response.data?.success || response.status === 201) {
        alert('Job posted successfully!');
        router.push('/dashboard/business/jobs');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600 mt-2">Find the perfect workers for your business</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Experienced Carpenter Needed"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe the job, responsibilities, and what you're looking for..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
              placeholder="e.g., New York, NY or Remote"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Job Type and Workers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workers Needed *
              </label>
              <input
                type="number"
                name="numberOfWorkers"
                value={jobData.numberOfWorkers}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency *
              </label>
              <select
                name="urgency"
                value={jobData.urgency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Budget (USD)
              </label>
              <input
                type="number"
                name="budgetMin"
                value={jobData.budgetMin}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Budget (USD)
              </label>
              <input
                type="number"
                name="budgetMax"
                value={jobData.budgetMax}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 5000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills * <span className="text-gray-500">(Add at least 1)</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={jobData.skillInput}
                onChange={(e) => setJobData({ ...jobData, skillInput: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="e.g., Plumbing, JavaScript"
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
              {jobData.skills.map((skill, index) => (
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

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements (optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={jobData.requirementInput}
                onChange={(e) => setJobData({ ...jobData, requirementInput: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRequirement())}
                placeholder="e.g., Must have own tools"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddRequirement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {jobData.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits (optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={jobData.benefitInput}
                onChange={(e) => setJobData({ ...jobData, benefitInput: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                placeholder="e.g., Health insurance, Flexible hours"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {jobData.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={jobData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={jobData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={jobData.applicationDeadline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || jobData.skills.length === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/business')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>

          {jobData.skills.length === 0 && (
            <p className="text-sm text-red-600">
              Please add at least 1 required skill
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
