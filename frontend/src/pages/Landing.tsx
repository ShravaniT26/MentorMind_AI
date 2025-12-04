import { Link } from 'react-router-dom';
import { Upload, Sparkles } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Landing() {
  const { darkMode } = useDarkMode();

  // NEW: Check if backend is running
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then((res) => {
        if (!res.ok) throw new Error();
        setBackendOnline(true);
      })
      .catch(() => {
        setBackendOnline(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Optional warning (NON-BLOCKING, does not affect UI layout) */}
      {!backendOnline && (
        <div className="mb-4 text-center">
          <p className="text-red-500 text-sm font-medium">
            ⚠ Backend server not detected — start FastAPI (uvicorn) to enable video upload.
          </p>
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center mb-16 relative">

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
            communication, clarity, technical depth, and interaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/upload"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload Your First Session
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Evaluation Parameters Section (unchanged) */}
      <div className={`rounded-xl shadow-md p-8 ${
        darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
      }`}>
        <h2 className={`text-3xl mb-6 text-center ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Evaluation Parameters
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Engagement */}
          <motion.div className="text-center" whileHover={{ scale: 1.05, y: -5 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100'
            }`}>
              <span className="text-2xl">💡</span>
            </div>
            <h4 className={`${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Engagement</h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Student interest and participation
            </p>
          </motion.div>

          {/* Communication */}
          <motion.div className="text-center" whileHover={{ scale: 1.05, y: -5 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-100'
            }`}>
              <span className="text-2xl">💬</span>
            </div>
            <h4 className={`${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Communication</h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Clarity and effectiveness
            </p>
          </motion.div>

          {/* Clarity */}
          <motion.div className="text-center" whileHover={{ scale: 1.05, y: -5 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-yellow-100'
            }`}>
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className={`${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Clarity</h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Message understanding
            </p>
          </motion.div>

          {/* Technical Depth */}
          <motion.div className="text-center" whileHover={{ scale: 1.05, y: -5 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-100'
            }`}>
              <span className="text-2xl">🔬</span>
            </div>
            <h4 className={`${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Technical Depth</h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Subject matter expertise
            </p>
          </motion.div>

          {/* Interaction */}
          <motion.div className="text-center" whileHover={{ scale: 1.05, y: -5 }}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
              darkMode ? 'bg-orange-600/20 border border-orange-500/30' : 'bg-orange-100'
            }`}>
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className={`${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Interaction</h4>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Two-way communication
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
