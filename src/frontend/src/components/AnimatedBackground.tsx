import { motion } from 'motion/react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function AnimatedBackground() {
  const { darkMode } = useDarkMode();

  if (!darkMode) {
    // Light mode background
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl bg-blue-400 opacity-35"
          animate={{
            x: [0, 150, 0],
            y: [0, 200, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute top-1/4 -right-20 w-[550px] h-[550px] rounded-full blur-3xl bg-purple-400 opacity-35"
          animate={{
            x: [0, -150, 0],
            y: [0, -200, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-pink-400 opacity-35"
          animate={{
            x: [0, -120, 0],
            y: [0, 150, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Floating Particles */}
        {[...Array(35)].map((_, i) => {
          const colors = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-cyan-400', 'bg-indigo-400'];
          
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${colors[i % 5]} ${
                i % 3 === 0 ? 'w-2 h-2 opacity-20' : i % 3 === 1 ? 'w-1.5 h-1.5 opacity-15' : 'w-1 h-1 opacity-10'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40 - Math.random() * 30, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: i % 3 === 0 ? [0.2, 0.35, 0.2] : i % 3 === 1 ? [0.15, 0.3, 0.15] : [0.1, 0.25, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 3,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.05),transparent_50%)]" />
      </div>
    );
  }

  // Professional Dark Mode Background
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
      
      {/* Refined Gradient Orbs - More subtle and professional */}
      <motion.div
        className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[120px] bg-blue-600 opacity-[0.08]"
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full blur-[120px] bg-purple-600 opacity-[0.08]"
        animate={{
          x: [0, -120, 0],
          y: [0, -180, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[120px] bg-indigo-600 opacity-[0.06]"
        animate={{
          x: [0, -100, 0],
          y: [0, 120, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Subtle Grid Pattern - Professional look */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.04),transparent_50%)]" />
      
      {/* Minimal floating particles - very subtle */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full bg-white opacity-[0.15]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: Math.random() * 10 + 8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle accent lines */}
      <motion.div
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 2,
        }}
      />

      {/* Vignette effect for professional depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}