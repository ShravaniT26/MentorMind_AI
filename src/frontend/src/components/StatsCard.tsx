import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { AnimatedCounter } from './AnimatedCounter';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'yellow';
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp,
  suffix = '',
  prefix = '',
  decimals = 0,
  color = 'blue'
}: StatsCardProps) {
  const { darkMode } = useDarkMode();

  const colorMap = {
    blue: {
      light: 'text-blue-600',
      bg: darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100',
      hover: darkMode ? 'hover:shadow-blue-500/20' : '',
    },
    green: {
      light: 'text-green-600',
      bg: darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-100',
      hover: darkMode ? 'hover:shadow-green-500/20' : '',
    },
    purple: {
      light: 'text-purple-600',
      bg: darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-100',
      hover: darkMode ? 'hover:shadow-purple-500/20' : '',
    },
    orange: {
      light: 'text-orange-600',
      bg: darkMode ? 'bg-orange-600/20 border border-orange-500/30' : 'bg-orange-100',
      hover: darkMode ? 'hover:shadow-orange-500/20' : '',
    },
    yellow: {
      light: 'text-yellow-600',
      bg: darkMode ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-yellow-100',
      hover: darkMode ? 'hover:shadow-yellow-500/20' : '',
    },
  };

  const currentColor = colorMap[color];

  return (
    <motion.div
      className={`rounded-xl shadow-md p-6 transition-all duration-300 ${
        darkMode 
          ? `bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg ${currentColor.hover}` 
          : 'bg-white hover:shadow-md'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <div className={`text-3xl ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>
            <AnimatedCounter 
              value={value} 
              decimals={decimals}
              suffix={suffix}
              prefix={prefix}
            />
          </div>
        </div>
        <motion.div 
          className={`p-3 rounded-xl ${currentColor.bg}`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-6 h-6 ${currentColor.light}`} />
        </motion.div>
      </div>
      
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${
          trendUp 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {trendUp ? '↑' : '↓'} {trend}
          </motion.span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>vs last period</span>
        </div>
      )}
    </motion.div>
  );
}
