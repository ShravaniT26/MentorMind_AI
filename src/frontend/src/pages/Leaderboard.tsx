import { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

// Mock leaderboard data
const mockLeaderboard = [
  {
    rank: 1,
    name: 'Sarah Johnson',
    avatar: '👩‍🏫',
    totalScore: 0.92,
    points: 2850,
    badges: 12,
    improvement: '+18%',
    sessions: 34
  },
  {
    rank: 2,
    name: 'Michael Chen',
    avatar: '👨‍💼',
    totalScore: 0.90,
    points: 2720,
    badges: 11,
    improvement: '+15%',
    sessions: 31
  },
  {
    rank: 3,
    name: 'Emily Rodriguez',
    avatar: '👩‍🔬',
    totalScore: 0.88,
    points: 2650,
    badges: 10,
    improvement: '+22%',
    sessions: 29
  },
  {
    rank: 4,
    name: 'David Park',
    avatar: '👨‍🎓',
    totalScore: 0.87,
    points: 2580,
    badges: 9,
    improvement: '+12%',
    sessions: 28
  },
  {
    rank: 5,
    name: 'Lisa Anderson',
    avatar: '👩‍💻',
    totalScore: 0.85,
    points: 2490,
    badges: 10,
    improvement: '+20%',
    sessions: 26
  },
  {
    rank: 6,
    name: 'James Wilson',
    avatar: '👨‍🏫',
    totalScore: 0.84,
    points: 2410,
    badges: 8,
    improvement: '+14%',
    sessions: 25
  },
  {
    rank: 7,
    name: 'Maria Garcia',
    avatar: '👩‍⚕️',
    totalScore: 0.83,
    points: 2350,
    badges: 9,
    improvement: '+16%',
    sessions: 24
  },
  {
    rank: 8,
    name: 'Robert Taylor',
    avatar: '👨‍🔧',
    totalScore: 0.82,
    points: 2280,
    badges: 7,
    improvement: '+10%',
    sessions: 23
  }
];

type SortField = 'score' | 'points' | 'badges' | 'improvement';

export function Leaderboard() {
  const [sortBy, setSortBy] = useState<SortField>('score');
  const { darkMode } = useDarkMode();

  const getRankColor = (rank: number) => {
    if (rank === 1) return darkMode ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' : 'bg-yellow-100 text-yellow-700';
    if (rank === 2) return darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700';
    if (rank === 3) return darkMode ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700';
    return darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-white text-gray-700';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-600" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-600" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="text-gray-600">#{rank}</span>;
  };

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
          <Trophy className={`w-12 h-12 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <h1 className={`text-4xl md:text-5xl ${
            darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
          }`}>
            Mentor Leaderboard
          </h1>
        </div>
        <p className={`text-lg md:text-xl ${
          darkMode ? 'text-gray-300 font-medium' : 'text-gray-600'
        }`}>
          Top mentors ranked by performance, engagement, and continuous improvement
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className={`rounded-xl shadow-md p-6 transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Mentors</span>
            <Trophy className="w-5 h-5 text-blue-600" />
          </div>
          <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>247</div>
        </motion.div>
        
        <motion.div 
          className={`rounded-xl shadow-md p-6 transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-green-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Avg Score</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}> 0.8</div>
        </motion.div>
        
        <motion.div 
          className={`rounded-xl shadow-md p-6 transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Sessions</span>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>1,892</div>
        </motion.div>
        
        <motion.div 
          className={`rounded-xl shadow-md p-6 transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-orange-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Badges Awarded</span>
            <Medal className="w-5 h-5 text-orange-600" />
          </div>
          <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>523</div>
        </motion.div>
      </div>

      {/* Sort Controls */}
      <motion.div 
        className={`rounded-xl shadow-md p-6 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-wrap gap-3">
          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Sort by:</span>
          <motion.button
            onClick={() => setSortBy('score')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              sortBy === 'score' 
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Overall Score
          </motion.button>
          <motion.button
            onClick={() => setSortBy('points')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              sortBy === 'points' 
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Points
          </motion.button>
          <motion.button
            onClick={() => setSortBy('badges')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              sortBy === 'badges' 
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Badges
          </motion.button>
          <motion.button
            onClick={() => setSortBy('improvement')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              sortBy === 'improvement' 
                ? darkMode
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-blue-600 text-white shadow-md'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Improvement
          </motion.button>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div 
        className={`rounded-xl shadow-md overflow-hidden ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`border-b ${
              darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <tr>
                <th className={`px-6 py-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rank</th>
                <th className={`px-6 py-4 text-left ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mentor</th>
                <th className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Overall Score</th>
                <th className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Points</th>
                <th className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Badges</th>
                <th className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Improvement</th>
                <th className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sessions</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((mentor, index) => (
                <motion.tr 
                  key={mentor.rank}
                  className={`border-b transition-all duration-200 ${
                    mentor.rank <= 3 ? getRankColor(mentor.rank) : ''
                  } ${darkMode ? 'border-gray-700 hover:bg-gray-700/30' : 'border-gray-100 hover:bg-gray-50'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(mentor.rank)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{mentor.avatar}</div>
                      <span className={darkMode ? 'text-white font-medium' : 'text-gray-900'}>
                        {mentor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg ${
                      darkMode ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {mentor.totalScore}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-center ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {mentor.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                      darkMode ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700'
                    }`}>
                      <Award className="w-4 h-4" />
                      {mentor.badges}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      {mentor.improvement}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {mentor.sessions}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Your Position */}
      <motion.div 
        className={`mt-8 rounded-xl shadow-md p-6 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/30' 
            : 'bg-gradient-to-r from-blue-50 to-purple-50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className={`mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Your Current Position
            </p>
            <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>
              Rank #42
            </div>
          </div>
          <div className="text-right">
            <p className={`mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Next Rank in
            </p>
            <div className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              85 points
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}