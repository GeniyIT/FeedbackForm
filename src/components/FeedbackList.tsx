import React, { useState } from 'react';
import { Search, SortAsc, SortDesc, Star } from 'lucide-react';
import type { FeedbackItem, FeedbackFilters } from '../types/feedback';

interface FeedbackListProps {
  feedbackItems: FeedbackItem[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbackItems }) => {
  const [filters, setFilters] = useState<FeedbackFilters>({
    category: undefined,
    status: undefined,
    sortBy: 'date',
    searchQuery: '',
  });

  const filteredItems = feedbackItems
    .filter((item) => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.searchQuery) {
        const search = filters.searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(search) ||
          item.comment.toLowerCase().includes(search) ||
          item.userName.toLowerCase().includes(search)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.ratings.overall - a.ratings.overall;
    });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value || undefined }))
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="other">Other</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value || undefined }))
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="implemented">Implemented</option>
          </select>

          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                sortBy: prev.sortBy === 'date' ? 'rating' : 'date',
              }))
            }
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {filters.sortBy === 'date' ? (
              <>
                <SortAsc className="w-5 h-5" /> Date
              </>
            ) : (
              <>
                <SortDesc className="w-5 h-5" /> Rating
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  By {item.userName} • {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${item.status === 'implemented'
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'reviewed'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>

            <p className="text-gray-700">{item.comment}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Overall:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= item.ratings.overall
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList