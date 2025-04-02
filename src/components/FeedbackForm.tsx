import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { FeedbackItem, FeedbackRating } from '../types/feedback';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackItem) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
          />
        </button>
      ))}
    </div>
  );
};

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    category: '',
    title: '',
    comment: '',
    ratings: {
      usability: 0,
      performance: 0,
      design: 0,
      features: 0,
      overall: 0,
    } as FeedbackRating,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      userName: formData.userName,
      email: formData.email,
      category: formData.category,
      title: formData.title,
      comment: formData.comment,
      ratings: formData.ratings,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    onSubmit(newFeedback);

    setFormData({
      userName: '',
      email: '',
      category: '',
      title: '',
      comment: '',
      ratings: {
        usability: 0,
        performance: 0,
        design: 0,
        features: 0,
        overall: 0,
      },
    });
  };

  const handleRatingChange = (category: keyof FeedbackRating, value: number) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="userName"
          value={formData.userName}
          onChange={(e) => setFormData((prev) => ({ ...prev, userName: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="improvement">Improvement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Ratings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Usability</label>
            <RatingInput
              value={formData.ratings.usability}
              onChange={(value) => handleRatingChange('usability', value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Performance</label>
            <RatingInput
              value={formData.ratings.performance}
              onChange={(value) => handleRatingChange('performance', value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Design</label>
            <RatingInput
              value={formData.ratings.design}
              onChange={(value) => handleRatingChange('design', value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Features</label>
            <RatingInput
              value={formData.ratings.features}
              onChange={(value) => handleRatingChange('features', value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
            <RatingInput
              value={formData.ratings.overall}
              onChange={(value) => handleRatingChange('overall', value)}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm