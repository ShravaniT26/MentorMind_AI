import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { CircularProgress } from './CircularProgress';

interface EvidenceClip {
  timestamp: string;
  description: string;
}

interface Metric {
  name: string;
  score: number;
  color: string;
  icon: string;
  suggestion: string;
  evidenceClips: EvidenceClip[];
}

interface AdvancedMetricCardProps {
  metric: Metric;
}

export function AdvancedMetricCard({ metric }: AdvancedMetricCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { darkMode } = useDarkMode();

  const getScoreCategory = (score: number) => {
    if (score >= 0.9) return { label: 'Excellent', color: 'text-green-500' };
    if (score >= 0.8) return { label: 'Great', color: 'text-blue-500' };
    if (score >= 0.7) return { label: 'Good', color: 'text-yellow-500' };
    if (score >= 0.6) return { label: 'Fair', color: 'text-orange-500' };
    return { label: 'Needs Work', color: 'text-red-500' };
  };

  const category = getScoreCategory(metric.score);

  return (
    <motion.div
      className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
          : 'bg-white'
      }`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: darkMode ? '0 20px 40px rgba(59, 130, 246, 0.15)' : '0 20px 40px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className={`text-4xl p-3 rounded-xl ${
                darkMode ? `bg-${metric.color}-600/20 border border-${metric.color}-500/30` : `bg-${metric.color}-100`
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {metric.icon}
            </motion.div>
            <div>
              <h3 className={`text-xl mb-1 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
                {metric.name}
              </h3>
              <div className={`flex items-center gap-2 ${category.color}`}>
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </div>
            </div>
          </div>
          <CircularProgress score={metric.score} size={100} color={metric.color} />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className={`flex justify-between text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Performance</span>
            <span>{(metric.score * 100).toFixed(0)}%</span>
          </div>
          <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div
              className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}
              initial={{ width: 0 }}
              animate={{ width: `${metric.score * 100}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                boxShadow: `0 0 10px rgba(59, 130, 246, 0.5)`,
              }}
            />
          </div>
        </div>

        {/* AI Suggestion */}
        <div className={`p-4 rounded-lg mb-4 ${
          darkMode ? 'bg-gray-700/50 border border-gray-600/50' : 'bg-gray-50'
        }`}>
          <div className="flex items-start gap-2">
            <TrendingUp className={`w-5 h-5 mt-0.5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {metric.suggestion}
            </p>
          </div>
        </div>

        {/* Expand Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
            darkMode 
              ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm">View Evidence Clips</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Evidence Clips */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-2">
                {metric.evidenceClips.map((clip, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-lg flex items-start gap-3 ${
                      darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}
                  >
                    <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <div className="flex-1">
                      <div className={`text-sm mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {clip.timestamp}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {clip.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
