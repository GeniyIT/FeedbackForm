export interface FeedbackRating {
  usability: number;
  performance: number;
  design: number;
  features: number;
  overall: number;
}

export interface FeedbackItem {
  id: string;
  userName: string;
  email: string;
  category: string;
  title: string;
  comment: string;
  ratings: FeedbackRating;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'implemented';
}

export interface FeedbackFilters {
  category?: string;
  status?: string;
  sortBy?: 'date' | 'rating';
  searchQuery?: string;
}