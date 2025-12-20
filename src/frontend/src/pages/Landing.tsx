import { Link } from 'react-router-dom';
import { Upload, Sparkles, TrendingUp, Award, Users, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion, useScroll, useTransform } from 'motion/react';

export function Landing() {
  const { darkMode } = useDarkMode();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        {/* Dark overlay for better text contrast in dark mode */}
        {darkMode && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent rounded-3xl -m-8 blur-2xl" />
        )}
        
        <div className="relative z-10">
          <motion.div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              darkMode 
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30 backdrop-blur-sm' 
                : 'bg-purple-100 text-purple-700'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-5 h-5" />
            AI-Powered Mentor Evaluation
          </motion.div>
          
          <motion.h1 
            className={`text-5xl md:text-6xl mb-6 ${
              darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Elevate Your Mentoring Skills with AI
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode 
                ? 'text-gray-200 font-medium leading-relaxed drop-shadow-md' 
                : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Upload your mentoring sessions and receive detailed AI-driven feedback on engagement, 
            communication, clarity, technical depth, and interaction. Track progress, earn badges, 
            and climb the leaderboard.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/dashboard">
              <motion.button
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </motion.button>
            </Link>
            <Link to="/upload">
              <motion.button 
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'border-gray-600 text-white hover:bg-gray-700'
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Upload className="w-5 h-5" />
                Upload Session
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Evaluation Parameters */}
      <div className={`rounded-xl shadow-md p-8 ${
        darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
      }`}>
        <h2 className={`text-3xl mb-6 text-center ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Evaluation Parameters
        </h2>
        <div className="grid md:grid-cols-5 gap-6">
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-yellow-100'
            }`}>
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Clarity
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Message understanding
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100'
            }`}>
              <span className="text-2xl">💡</span>
            </div>
            <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Engagement
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Student interest and participation
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-100'
            }`}>
              <span className="text-2xl">💬</span>
            </div>
            <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Filler
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Minimal filler words usage
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-orange-600/20 border border-orange-500/30' : 'bg-orange-100'
            }`}>
              <span className="text-2xl">⏱️</span>
            </div>
            <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Pace
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Appropriate speaking speed
            </p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-100'
            }`}>
              <span className="text-2xl">🔬</span>
            </div>
            <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Technical Depth
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Subject matter expertise
            </p>
          </motion.div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-12 mb-12">
        <motion.div
          className={`p-8 rounded-xl shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
              : 'bg-white hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
            darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100'
          }`}>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className={`text-2xl mb-3 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Track Progress
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Visualize your improvement over time with detailed analytics and performance charts showing your growth across all evaluation metrics.
          </p>
        </motion.div>

        <motion.div
          className={`p-8 rounded-xl shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/20' 
              : 'bg-white hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
            darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-100'
          }`}>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className={`text-2xl mb-3 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Earn Rewards
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Unlock achievements and badges as you reach new milestones. Compete with other mentors and celebrate your teaching excellence.
          </p>
        </motion.div>

        <motion.div
          className={`p-8 rounded-xl shadow-md transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-green-500/20' 
              : 'bg-white hover:shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
            darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-100'
          }`}>
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <h3 className={`text-2xl mb-3 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Student Feedback
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gather and analyze student testimonials and feedback to understand how your teaching resonates with your audience.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className={`rounded-xl p-12 text-center ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/30' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className={`text-3xl md:text-4xl mb-4 ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>
          Ready to Transform Your Teaching?
        </h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join thousands of mentors who are using AI to improve their teaching effectiveness and student outcomes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <motion.button
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LayoutDashboard className="w-5 h-5" />
              View Dashboard
            </motion.button>
          </Link>
          <Link to="/upload">
            <motion.button
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 transition-all ${
                darkMode
                  ? 'border-gray-600 text-white hover:bg-gray-700'
                  : 'border-gray-300 text-gray-900 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5" />
              Upload Session
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}