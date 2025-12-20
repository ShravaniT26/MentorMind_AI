import { Clock } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

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

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const { darkMode } = useDarkMode();

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; bar: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', bar: 'bg-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-600' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', bar: 'bg-yellow-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', bar: 'bg-purple-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', bar: 'bg-orange-600' }
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(metric.color);
  const percentage = metric.score * 100; // Score is already 0-1, so multiply by 100 for percentage

  return (
    <motion.div 
      className={`rounded-xl shadow-md p-6 transition-all duration-200 ${
        darkMode 
          ? `bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-2xl hover:shadow-${metric.color}-500/20` 
          : 'bg-white hover:shadow-lg'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${
            darkMode ? `${colors.bg} border border-${metric.color}-500/30` : colors.bg
          } rounded-lg flex items-center justify-center text-2xl`}>
            {metric.icon}
          </div>
          <div>
            <h3 className={`text-xl ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              {metric.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Parameter Score
            </p>
          </div>
        </div>
        <div className={`text-3xl ${colors.text}`}>
          {metric.score.toFixed(2)}
          <span className="text-lg">/1.0</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className={`${colors.bar} h-3 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Suggestion */}
      <div className={`${
        darkMode ? `${colors.bg}/50 border border-${metric.color}-500/30` : colors.bg
      } rounded-lg p-4 mb-4`}>
        <p className={`text-sm ${colors.text}`}>
          <strong>AI Suggestion:</strong> {metric.suggestion}
        </p>
      </div>

      {/* Evidence Clips */}
      <div>
        <h4 className={`mb-3 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
          Evidence Clips
        </h4>
        <div className="space-y-2">
          {metric.evidenceClips.map((clip, index) => (
            <motion.div 
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-150 cursor-pointer ${
                darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className={`flex items-center gap-1 px-2 py-1 ${
                darkMode ? `${colors.bg} border border-${metric.color}-500/30` : colors.bg
              } ${colors.text} rounded text-sm shrink-0`}>
                <Clock className="w-3 h-3" />
                {clip.timestamp}
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {clip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}