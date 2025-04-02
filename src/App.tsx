import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import { MessageSquarePlus, List } from 'lucide-react';
import type { FeedbackItem } from './types/feedback';

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    userName: 'John Doe',
    email: 'john@example.com',
    category: 'feature',
    title: 'Add Dark Mode',
    comment: 'It would be great to have a dark mode option for better visibility at night.',
    ratings: {
      usability: 4,
      performance: 5,
      design: 4,
      features: 3,
      overall: 4,
    },
    createdAt: '2024-03-10T10:00:00Z',
    status: 'pending',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(() => {
    const saved = localStorage.getItem('feedback');
    return saved ? JSON.parse(saved) : mockFeedback;
  });

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedbackItems));
  }, [feedbackItems]);

  const addFeedback = (newFeedback: FeedbackItem) => {
    setFeedbackItems(prev => [...prev, newFeedback]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Feedback Portal</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'form'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquarePlus className="w-5 h-5" />
                Submit Feedback
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === 'list'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
                View Feedback
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'form' ? (
          <FeedbackForm onSubmit={addFeedback} />
        ) : (
          <FeedbackList feedbackItems={feedbackItems} />
        )}
      </main>
    </div>
  );
}

export default App;