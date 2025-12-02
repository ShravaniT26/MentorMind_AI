import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'motion/react';

interface Badge {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const { darkMode } = useDarkMode();
  
  return (
    <div>
      <h3 className={`text-lg mb-4 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
        Badges Earned
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={`rounded-xl p-4 border-2 transition-all duration-200 ${
              darkMode
                ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700/50 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20'
                : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:border-yellow-300 hover:shadow-md'
            }`}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className={`mb-1 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
                {badge.name}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {badge.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}