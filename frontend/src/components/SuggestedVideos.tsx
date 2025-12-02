import { Play, Clock, TrendingUp, Award } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'motion/react';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  description: string;
  relevance: string;
}

// Mock suggested videos based on evaluation results
const suggestedVideos: Video[] = [
  {
    id: 1,
    title: 'Reducing Filler Words: Professional Speaking Techniques',
    thumbnail: '🎤',
    duration: '12:45',
    category: 'Communication',
    description: 'Learn proven techniques to eliminate "um," "uh," and other filler words from your speech.',
    relevance: 'Suggested based on your Communication score'
  },
  {
    id: 2,
    title: 'Microphone Setup for Crystal Clear Audio',
    thumbnail: '🎙️',
    duration: '8:30',
    category: 'Technical',
    description: 'Optimize your microphone settings and room acoustics for better audio quality.',
    relevance: 'Based on student feedback about audio clarity'
  },
  {
    id: 3,
    title: 'Advanced Engagement Strategies for Online Teaching',
    thumbnail: '💡',
    duration: '15:20',
    category: 'Engagement',
    description: 'Take your student engagement to the next level with interactive polls and discussions.',
    relevance: 'Level up your already strong Engagement score'
  },
  {
    id: 4,
    title: 'Bilingual Teaching Best Practices',
    thumbnail: '🌍',
    duration: '10:15',
    category: 'Communication',
    description: 'Effectively switch between languages to maximize student understanding.',
    relevance: 'Based on positive student feedback about Hindi explanations'
  },
  {
    id: 5,
    title: 'Making Content Accessible for All Students',
    thumbnail: '♿',
    duration: '14:00',
    category: 'Accessibility',
    description: 'Ensure your content is accessible to students with visual, hearing, or learning differences.',
    relevance: 'Enhance your inclusive teaching approach'
  },
  {
    id: 6,
    title: 'Deep Dive Teaching: When and How to Go Advanced',
    thumbnail: '🔬',
    duration: '11:30',
    category: 'Technical Depth',
    description: 'Learn to assess when students are ready for advanced concepts and how to introduce them.',
    relevance: 'Suggested to improve Technical Depth score'
  }
];

export function SuggestedVideos() {
  const { darkMode } = useDarkMode();
  
  return (
    <div className={`rounded-xl shadow-md p-8 ${
      darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
    }`}>
      <div className="flex items-center gap-2 mb-6">
        <Play className="w-6 h-6 text-blue-600" />
        <h2 className={`text-2xl ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Suggested Videos to Improve
        </h2>
      </div>

      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Based on your evaluation results and student feedback, here are personalized video recommendations to help you grow as a mentor.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {suggestedVideos.map((video, index) => (
          <motion.div
            key={video.id}
            className={`rounded-xl overflow-hidden transition-all duration-200 cursor-pointer group ${
              darkMode
                ? 'border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30'
                : 'border border-gray-200 hover:shadow-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Thumbnail */}
            <div className={`h-48 flex items-center justify-center text-6xl relative overflow-hidden ${
              darkMode ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-br from-blue-100 to-purple-100'
            }`}>
              {video.thumbnail}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                <motion.div 
                  className="w-16 h-16 bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-8 h-8 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <div className={`absolute bottom-3 right-3 px-2 py-1 rounded text-sm flex items-center gap-1 ${
                darkMode ? 'bg-black/75 text-white' : 'bg-black/75 text-white'
              }`}>
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className={`p-5 ${darkMode ? 'bg-gray-800/50' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  darkMode ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700'
                }`}>
                  {video.category}
                </span>
              </div>
              <h3 className={`text-lg mb-2 transition-colors ${
                darkMode 
                  ? 'text-white group-hover:text-blue-400' 
                  : 'text-gray-900 group-hover:text-blue-600'
              }`}>
                {video.title}
              </h3>
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {video.description}
              </p>
              <div className={`flex items-start gap-2 p-3 rounded-lg ${
                darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-50'
              }`}>
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <p className={`text-xs ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                  {video.relevance}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Path */}
      <motion.div 
        className={`mt-8 rounded-xl p-6 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/30' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
            darkMode ? 'bg-purple-600/30 border border-purple-500/30' : 'bg-white'
          }`}>
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Complete Your Learning Path
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Watch all suggested videos to unlock the <strong>"Continuous Learner"</strong> badge and earn <strong>500 bonus points!</strong>
            </p>
            <div className="flex items-center gap-2">
              <div className={`flex-1 rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <motion.div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '33%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                2 of 6 completed
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}