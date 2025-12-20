import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdvancedMetricCard } from '../components/AdvancedMetricCard';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { SuggestedVideos } from '../components/SuggestedVideos';
import { PerformanceChart } from '../components/PerformanceChart';
import { CircularProgress } from '../components/CircularProgress';
import { Download, Share2, Sparkles } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'motion/react';

// Mock evaluation data
const mockResults = {
  overallScore: 0.82,
  metrics: [
    {
      name: 'Clarity',
      score: 0.89,
      color: 'yellow',
      icon: '🎯',
      suggestion: 'Outstanding clarity in explanations. Students showed clear understanding through responses.',
      evidenceClips: [
        { timestamp: '5:10', description: 'Step-by-step breakdown of problem' },
        { timestamp: '9:30', description: 'Effective use of analogies' }
      ]
    },
    {
      name: 'Engagement',
      score: 0.85,
      color: 'blue',
      icon: '💡',
      suggestion: 'Excellent use of questions to maintain student interest. Consider adding more interactive polls.',
      evidenceClips: [
        { timestamp: '2:34', description: 'Strong opening question that engaged students' },
        { timestamp: '8:12', description: 'Interactive discussion about real-world applications' }
      ]
    },
    {
      name: 'Filler',
      score: 0.78,
      color: 'green',
      icon: '💬',
      suggestion: 'Good control over filler words. Try to further reduce words like "um" and "uh" for more polished delivery.',
      evidenceClips: [
        { timestamp: '3:45', description: 'Clean delivery with minimal fillers' },
        { timestamp: '12:20', description: 'Multiple filler words detected' }
      ]
    },
    {
      name: 'Pace',
      score: 0.84,
      color: 'orange',
      icon: '⏱️',
      suggestion: 'Great pacing overall. Students had sufficient time to absorb information and ask questions.',
      evidenceClips: [
        { timestamp: '4:20', description: 'Well-timed pauses for understanding' },
        { timestamp: '11:15', description: 'Appropriate speed for complex topics' }
      ]
    },
    {
      name: 'Technical Depth',
      score: 0.80,
      color: 'purple',
      icon: '🔬',
      suggestion: 'Good technical coverage. Could dive deeper into advanced concepts for more experienced students.',
      evidenceClips: [
        { timestamp: '6:45', description: 'Detailed technical explanation' },
        { timestamp: '14:00', description: 'Opportunity for deeper dive missed' }
      ]
    }
  ],
  badgesEarned: [
    { id: 1, name: 'Clarity Master', icon: '🎯', description: 'Scored 0.8+ in Clarity' },
    { id: 2, name: 'Engagement Pro', icon: '💡', description: 'Scored 0.8+ in Engagement' },
    { id: 3, name: 'Rising Star', icon: '⭐', description: 'First evaluation completed' }
  ],
  pointsEarned: 245,
  weeklyImprovement: '+12%'
};

export function Results() {
  const { id } = useParams();
  const [showAccessibility, setShowAccessibility] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className={`text-4xl mb-2 ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>
              Evaluation Results
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Session ID: {id}</p>
          </div>
          <div className="flex gap-3">
            <motion.button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.button>
            <motion.button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </div>

        {/* Overall Score with Motivational Message */}
        <div className={`rounded-xl p-6 ${
          darkMode ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}>
          <div className="text-center">
            <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Overall Score</p>
            <motion.div 
              className={`text-6xl mb-2 ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {mockResults.overallScore}
            </motion.div>
            <div className={`text-xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>out of 1.0</div>
            
            {/* Motivational Message based on score */}
            <motion.div 
              className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {mockResults.overallScore >= 0.9 && (
                <div>
                  <div className="text-4xl mb-2">🌟</div>
                  <p className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Outstanding Performance!
                  </p>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You're truly exceptional! Keep inspiring students with your amazing teaching skills.
                  </p>
                </div>
              )}
              {mockResults.overallScore >= 0.8 && mockResults.overallScore < 0.9 && (
                <div>
                  <div className="text-4xl mb-2">🎉</div>
                  <p className={`text-xl ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    Great Job!
                  </p>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Excellent work! Your students are lucky to have such a dedicated mentor. You're just steps away from perfection!
                  </p>
                </div>
              )}
              {mockResults.overallScore >= 0.7 && mockResults.overallScore < 0.8 && (
                <div>
                  <div className="text-4xl mb-2">👏</div>
                  <p className={`text-xl ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                    Well Done!
                  </p>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Good performance! You're making a real impact. Check the suggestions below to reach the next level!
                  </p>
                </div>
              )}
              {mockResults.overallScore >= 0.6 && mockResults.overallScore < 0.7 && (
                <div>
                  <div className="text-4xl mb-2">💪</div>
                  <p className={`text-xl ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                    Keep Going!
                  </p>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You're on the right track! Every mentor has room to grow. Review the feedback and keep improving!
                  </p>
                </div>
              )}
              {mockResults.overallScore < 0.6 && (
                <div>
                  <div className="text-4xl mb-2">🌱</div>
                  <p className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Great Start!
                  </p>
                  <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Every expert was once a beginner! Use the personalized suggestions below to enhance your skills. You've got this!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Gamification Panel */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Session Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-yellow-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">🏆</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {mockResults.pointsEarned}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Points Earned</p>
          </motion.div>
          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">📈</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {mockResults.weeklyImprovement}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Weekly Improvement</p>
          </motion.div>
          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">🎖️</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {mockResults.badgesEarned.length}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>New Badges</p>
          </motion.div>
        </div>
        
        <div className="mt-6">
          <BadgeDisplay badges={mockResults.badgesEarned} />
        </div>
      </motion.div>

      {/* Metric Cards */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Parameter-wise Analysis
          </h2>
          <motion.button
            onClick={() => setShowAccessibility(!showAccessibility)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAccessibility ? 'Hide' : 'Show'} Accessibility Features
          </motion.button>
        </div>
        
        {showAccessibility && (
          <div className="mb-6">
            <AccessibilityPanel />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {mockResults.metrics.map((metric) => (
            <AdvancedMetricCard key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      {/* Suggested Videos Section - NEW */}
      <div className="mb-8">
        <SuggestedVideos />
      </div>
    </div>
  );
}