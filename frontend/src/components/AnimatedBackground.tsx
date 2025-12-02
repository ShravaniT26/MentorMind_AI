import { motion } from 'motion/react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function AnimatedBackground() {
  const { darkMode } = useDarkMode();

  // Standardized accent colors with low opacity
  const accentColors = darkMode 
    ? ['bg-purple-500', 'bg-blue-500', 'bg-pink-500']
    : ['bg-blue-400', 'bg-purple-400', 'bg-pink-400'];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs */}
      <motion.div
        className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-600 opacity-20' : 'bg-blue-400 opacity-30'
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className={`absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-blue-600 opacity-20' : 'bg-purple-400 opacity-30'
        }`}
        animate={{
          x: [0, -100, 0],
          y: [0, -150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-pink-600 opacity-20' : 'bg-pink-400 opacity-30'
        }`}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Floating Particles - Standardized with low opacity */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full ${accentColors[i % 3]} opacity-15`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className={`absolute top-1/3 left-1/3 w-32 h-32 border-2 rounded-lg ${
          darkMode ? 'border-purple-500 opacity-8' : 'border-blue-400 opacity-10'
        }`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-24 h-24 border-2 rounded-full ${
          darkMode ? 'border-blue-500 opacity-8' : 'border-purple-400 opacity-10'
        }`}
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}