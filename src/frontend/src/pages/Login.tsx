import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'mentor' | 'student'>('mentor');
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup - in real app, this would call backend API
    console.log('Login/Signup:', { email, password, name, role });
    
    // Simulate successful login
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name || email.split('@')[0]);
    navigate('/home');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            className={`text-4xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            MentorVision AI
          </motion.h1>
          <motion.p 
            className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isSignup ? 'Create Your Account' : 'Welcome Back'}
          </motion.p>
          <motion.p 
            className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isSignup 
              ? 'Join the future of AI-powered mentoring' 
              : 'Sign in to access your dashboard'}
          </motion.p>
        </motion.div>

        {/* Login/Signup Form */}
        <motion.div 
          className={`rounded-2xl shadow-2xl p-8 backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
              : 'bg-white'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'mentor'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-lg'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">👨‍🏫</div>
                  <div className="text-sm">Mentor</div>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'student'
                      ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-lg'
                      : darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-1">🎓</div>
                  <div className="text-sm">Student</div>
                </motion.button>
              </div>
            </motion.div>

            {/* Name (only for signup) */}
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <motion.input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border border-gray-300'
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border border-gray-300'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border border-gray-300'
                  }`}
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                initial={false}
              />
              {isSignup ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle Login/Signup */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => setIsSignup(!isSignup)}
              className={`hover:underline transition-colors ${
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {isSignup 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="mt-8 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className={`rounded-lg p-4 shadow-lg backdrop-blur-sm ${
              darkMode ? 'bg-gray-800 bg-opacity-50 border border-gray-700' : 'bg-white'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-2xl mb-2">🎯</div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI-Powered Feedback
            </p>
          </motion.div>
          <motion.div 
            className={`rounded-lg p-4 shadow-lg backdrop-blur-sm ${
              darkMode ? 'bg-gray-800 bg-opacity-50 border border-gray-700' : 'bg-white'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-2xl mb-2">🏆</div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Gamification & Badges
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}