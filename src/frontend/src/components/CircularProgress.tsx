import { motion } from 'motion/react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function CircularProgress({ 
  score, 
  size = 120, 
  strokeWidth = 8,
  label = '',
  color = 'blue'
}: CircularProgressProps) {
  const { darkMode } = useDarkMode();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score * circumference);

  const colorMap: Record<string, { light: string; dark: string; glow: string }> = {
    blue: { light: '#3B82F6', dark: '#60A5FA', glow: 'rgba(59, 130, 246, 0.3)' },
    yellow: { light: '#EAB308', dark: '#FACC15', glow: 'rgba(234, 179, 8, 0.3)' },
    green: { light: '#10B981', dark: '#34D399', glow: 'rgba(16, 185, 129, 0.3)' },
    purple: { light: '#8B5CF6', dark: '#A78BFA', glow: 'rgba(139, 92, 246, 0.3)' },
    orange: { light: '#F97316', dark: '#FB923C', glow: 'rgba(249, 115, 22, 0.3)' },
  };

  const currentColor = colorMap[color] || colorMap.blue;
  const strokeColor = darkMode ? currentColor.dark : currentColor.light;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            filter: `drop-shadow(0 0 8px ${currentColor.glow})`,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          className={`text-2xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score.toFixed(2)}
        </motion.span>
        {label && (
          <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
