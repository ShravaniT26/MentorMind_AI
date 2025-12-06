import { MessageSquare, Heart, Volume2, Languages, ThumbsUp } from 'lucide-react';

interface FeedbackItem {
  id: number;
  studentName: string;
  avatar: string;
  feedback: string;
  category: 'appreciation' | 'accessibility' | 'suggestion';
  timestamp: string;
}

// Mock student feedback data
const mockFeedbacks: FeedbackItem[] = [
  {
    id: 1,
    studentName: 'Priya Sharma',
    avatar: '👩‍🎓',
    feedback: 'Thank you for explaining in Hindi! It was really helpful for me to understand the complex topics better. Your bilingual approach makes learning so much easier.',
    category: 'appreciation',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    studentName: 'Rahul Kumar',
    avatar: '👨‍💼',
    feedback: "I can't watch your lecture due to visual impairment, but with the audio clarity feature, I am able to hear everything clearly. Your explanations are very detailed and easy to follow through audio alone.",
    category: 'accessibility',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    studentName: 'Anjali Patel',
    avatar: '👩‍💻',
    feedback: 'In the last video, I was not able to hear your voice clearly during the middle section. Could you please check your microphone settings? This session was much better though!',
    category: 'suggestion',
    timestamp: '1 day ago'
  },
  {
    id: 4,
    studentName: 'Vikram Singh',
    avatar: '👨‍🎓',
    feedback: 'The pace of explanation was perfect! Not too fast, not too slow. The captions also helped me take better notes. Thank you!',
    category: 'appreciation',
    timestamp: '1 day ago'
  },
  {
    id: 5,
    studentName: 'Sneha Reddy',
    avatar: '👩‍🔬',
    feedback: 'As a hearing-impaired student, the captions feature is a lifesaver. However, sometimes the technical terms are not captioned correctly. Maybe you could speak them more clearly?',
    category: 'suggestion',
    timestamp: '2 days ago'
  }
];

export function StudentFeedback() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appreciation':
        return <Heart className="w-5 h-5 text-pink-600" />;
      case 'accessibility':
        return <Volume2 className="w-5 h-5 text-blue-600" />;
      case 'suggestion':
        return <ThumbsUp className="w-5 h-5 text-purple-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'appreciation':
        return 'bg-pink-100 text-pink-700';
      case 'accessibility':
        return 'bg-blue-100 text-blue-700';
      case 'suggestion':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'appreciation':
        return 'Appreciation';
      case 'accessibility':
        return 'Accessibility';
      case 'suggestion':
        return 'Suggestion';
      default:
        return 'Feedback';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-gray-700" />
        <h2 className="text-2xl text-gray-900">Student Feedback</h2>
        <span className="ml-auto px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {mockFeedbacks.length} feedbacks
        </span>
      </div>

      <p className="text-gray-600 mb-6">
        See what students are saying about your mentoring sessions. Their feedback helps improve your teaching approach.
      </p>

      <div className="space-y-4">
        {mockFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{feedback.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-gray-900">{feedback.studentName}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getCategoryBadge(feedback.category)}`}>
                    {getCategoryIcon(feedback.category)}
                    {getCategoryLabel(feedback.category)}
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">{feedback.timestamp}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Stats */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <Heart className="w-6 h-6 text-pink-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-900 mb-1">
            {mockFeedbacks.filter(f => f.category === 'appreciation').length}
          </div>
          <p className="text-sm text-gray-600">Appreciations</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Volume2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-900 mb-1">
            {mockFeedbacks.filter(f => f.category === 'accessibility').length}
          </div>
          <p className="text-sm text-gray-600">Accessibility Mentions</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <ThumbsUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl text-gray-900 mb-1">
            {mockFeedbacks.filter(f => f.category === 'suggestion').length}
          </div>
          <p className="text-sm text-gray-600">Suggestions</p>
        </div>
      </div>
    </div>
  );
}
