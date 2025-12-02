import { useState } from 'react';
import { MessageSquare, Send, Heart, Volume2, ThumbsUp, Star } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

interface FeedbackItem {
  id: number;
  studentName: string;
  avatar: string;
  feedback: string;
  category: 'appreciation' | 'accessibility' | 'suggestion';
  timestamp: string;
  sessionId: string;
  rating: number;
}

// Mock student feedback data
const mockFeedbacks: FeedbackItem[] = [
  {
    id: 1,
    studentName: 'Priya Sharma',
    avatar: '👩‍🎓',
    feedback: 'Thank you for explaining in Hindi! It was really helpful for me to understand the complex topics better. Your bilingual approach makes learning so much easier.',
    category: 'appreciation',
    timestamp: '2 hours ago',
    sessionId: 'abc123',
    rating: 5
  },
  {
    id: 2,
    studentName: 'Rahul Kumar',
    avatar: '👨‍💼',
    feedback: "I can't watch your lecture due to visual impairment, but with the audio clarity feature, I am able to hear everything clearly. Your explanations are very detailed and easy to follow through audio alone.",
    category: 'accessibility',
    timestamp: '5 hours ago',
    sessionId: 'def456',
    rating: 5
  },
  {
    id: 3,
    studentName: 'Anjali Patel',
    avatar: '👩‍💻',
    feedback: 'In the last video, I was not able to hear your voice clearly during the middle section. Could you please check your microphone settings? This session was much better though!',
    category: 'suggestion',
    timestamp: '1 day ago',
    sessionId: 'ghi789',
    rating: 4
  },
  {
    id: 4,
    studentName: 'Vikram Singh',
    avatar: '👨‍🎓',
    feedback: 'The pace of explanation was perfect! Not too fast, not too slow. The captions also helped me take better notes. Thank you!',
    category: 'appreciation',
    timestamp: '1 day ago',
    sessionId: 'jkl012',
    rating: 5
  },
  {
    id: 5,
    studentName: 'Sneha Reddy',
    avatar: '👩‍🔬',
    feedback: 'As a hearing-impaired student, the captions feature is a lifesaver. However, sometimes the technical terms are not captioned correctly. Maybe you could speak them more clearly?',
    category: 'suggestion',
    timestamp: '2 days ago',
    sessionId: 'mno345',
    rating: 4
  },
  {
    id: 6,
    studentName: 'Arjun Mehta',
    avatar: '👨‍💻',
    feedback: 'Your use of real-world examples makes everything so relatable! I finally understood the concept that I was struggling with for weeks.',
    category: 'appreciation',
    timestamp: '2 days ago',
    sessionId: 'pqr678',
    rating: 5
  }
];

export function StudentFeedbackPage() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'appreciation' | 'accessibility' | 'suggestion'>('all');
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(1);
  const darkMode = useDarkMode();

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedbackItem: FeedbackItem = {
      id: mockFeedbacks.length + 1,
      studentName: 'Anonymous',
      avatar: '👤',
      feedback: newFeedback,
      category: 'suggestion',
      timestamp: 'just now',
      sessionId: 'newSession',
      rating: rating
    };
    mockFeedbacks.push(newFeedbackItem);
    setNewFeedback('');
    setRating(1);
  };

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
    switch(category) {
      case 'appreciation':
        return darkMode ? 'bg-pink-600/20 text-pink-400 border border-pink-500/30' : 'bg-pink-100 text-pink-800 border border-pink-300';
      case 'accessibility':
        return darkMode ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'suggestion':
        return darkMode ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-800 border border-purple-300';
      default:
        return darkMode ? 'bg-gray-600/20 text-gray-400 border border-gray-500/30' : 'bg-gray-100 text-gray-800 border border-gray-300';
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

  const filteredFeedbacks = filterCategory === 'all' 
    ? mockFeedbacks 
    : mockFeedbacks.filter(f => f.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <MessageSquare className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h1 className={`text-4xl md:text-5xl ${
            darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
          }`}>
            Student Feedback
          </h1>
        </div>
        <p className={`text-lg md:text-xl ${
          darkMode ? 'text-gray-300 font-medium' : 'text-gray-600'
        }`}>
          View student feedback and insights to help improve your teaching approach
        </p>
      </motion.div>

      {/* Submit Feedback Form */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}`}>
          Submit Your Feedback
        </h2>
        <form onSubmit={handleSubmitFeedback}>
          <div className="mb-6">
            <label className={`block mb-3 text-base ${darkMode ? 'text-gray-300' : 'text-gray-800 font-medium'}`}>
              Rate Your Experience
            </label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`transition-all duration-150 rounded-lg p-2 ${
                    star <= rating 
                      ? 'bg-yellow-50' 
                      : darkMode 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= rating 
                        ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm' 
                        : darkMode 
                        ? 'text-gray-600 hover:text-gray-500' 
                        : 'text-gray-300 hover:text-gray-400'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className={`block mb-3 text-base ${darkMode ? 'text-gray-300' : 'text-gray-800 font-medium'}`}>
              Your Feedback
            </label>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Share what you liked, what helped you learn, or suggestions for improvement..."
              className={`w-full p-4 rounded-lg min-h-32 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'border-2 border-gray-300 hover:border-gray-400 focus:shadow-lg placeholder-gray-500'
              }`}
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`flex items-center gap-2 px-8 py-3.5 rounded-lg transition-all duration-200 shadow-md ${
              darkMode
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 hover:-translate-y-0.5'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">Submit Feedback</span>
          </motion.button>
        </form>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        className={`rounded-xl shadow-md p-5 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap gap-3 items-center">
          <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Filter by:</span>
          <motion.button
            onClick={() => setFilterCategory('all')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 font-medium shadow-sm ${
              filterCategory === 'all'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md hover:shadow-lg'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Feedback
          </motion.button>
          <motion.button
            onClick={() => setFilterCategory('appreciation')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 font-medium shadow-sm ${
              filterCategory === 'appreciation'
                ? darkMode
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-pink-600 text-white shadow-md hover:shadow-lg'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-4 h-4" />
            Appreciation
          </motion.button>
          <motion.button
            onClick={() => setFilterCategory('accessibility')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 font-medium shadow-sm ${
              filterCategory === 'accessibility'
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md hover:shadow-lg'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Volume2 className="w-4 h-4" />
            Accessibility
          </motion.button>
          <motion.button
            onClick={() => setFilterCategory('suggestion')}
            className={`px-5 py-2.5 rounded-full transition-all duration-200 flex items-center gap-2 font-medium shadow-sm ${
              filterCategory === 'suggestion'
                ? darkMode
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-purple-600 text-white shadow-md hover:shadow-lg'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThumbsUp className="w-4 h-4" />
            Suggestions
          </motion.button>
        </div>
      </motion.div>

      {/* Feedback Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className={`rounded-xl shadow-md p-6 text-center transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-pink-500/20' 
              : 'bg-white border border-gray-200 hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Heart className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-pink-400' : 'text-pink-600'}`} />
          <div className={`text-3xl mb-1 ${darkMode ? 'text-white font-bold' : 'text-gray-900 font-bold'}`}>
            {mockFeedbacks.filter(f => f.category === 'appreciation').length}
          </div>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Appreciations</p>
        </motion.div>
        <motion.div 
          className={`rounded-xl shadow-md p-6 text-center transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
              : 'bg-white border border-gray-200 hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Volume2 className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div className={`text-3xl mb-1 ${darkMode ? 'text-white font-bold' : 'text-gray-900 font-bold'}`}>
            {mockFeedbacks.filter(f => f.category === 'accessibility').length}
          </div>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Accessibility Mentions</p>
        </motion.div>
        <motion.div 
          className={`rounded-xl shadow-md p-6 text-center transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/20' 
              : 'bg-white border border-gray-200 hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <ThumbsUp className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <div className={`text-3xl mb-1 ${darkMode ? 'text-white font-bold' : 'text-gray-900 font-bold'}`}>
            {mockFeedbacks.filter(f => f.category === 'suggestion').length}
          </div>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Suggestions</p>
        </motion.div>
      </div>

      {/* Feedback List */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Recent Feedback
        </h2>
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              className={`rounded-xl p-5 transition-all duration-200 ${
                darkMode 
                  ? 'border border-gray-700 hover:bg-gray-700/30 hover:shadow-lg' 
                  : 'border border-gray-200 hover:shadow-md'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.01, x: 5 }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{feedback.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={darkMode ? 'text-white font-medium' : 'text-gray-900'}>
                      {feedback.studentName}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getCategoryBadge(feedback.category)}`}>
                      {getCategoryIcon(feedback.category)}
                      {getCategoryLabel(feedback.category)}
                    </span>
                    <div className="flex gap-1 ml-auto">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className={`leading-relaxed mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feedback.feedback}
                  </p>
                  <div className={`flex items-center gap-3 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span>{feedback.timestamp}</span>
                    <span>•</span>
                    <span>Session: {feedback.sessionId}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}