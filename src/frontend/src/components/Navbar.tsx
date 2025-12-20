import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Upload, BarChart3, Trophy, Home, LogIn, User, MessageSquare, Edit3, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion, AnimatePresence } from 'motion/react';
import { authAPI } from '../utils/api';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  useEffect(() => {
    const name = localStorage.getItem('userName');
    setUserName(name);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    authAPI.logout();
    setUserName(null);
    navigate('/login');
  };
  
  return (
    <motion.nav 
      className={`shadow-md sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#0a0a0a]/80 border-b border-white/[0.08]' 
          : 'bg-white bg-opacity-90'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              MentorVision AI
            </span>
          </Link>
          
          <div className="flex gap-2 items-center">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/dashboard') 
                  ? darkMode
                    ? 'bg-white/[0.08] text-white shadow-lg shadow-blue-500/20 border border-white/[0.08]'
                    : 'bg-blue-600 text-white shadow-md scale-105'
                  : darkMode 
                  ? 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200' 
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/upload') 
                  ? darkMode
                    ? 'bg-white/[0.08] text-white shadow-lg shadow-blue-500/20 border border-white/[0.08]'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-5 h-5" />
              Upload
            </Link>
            <Link 
              to="/edit-video" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/edit-video') 
                  ? darkMode
                    ? 'bg-white/[0.08] text-white shadow-lg shadow-blue-500/20 border border-white/[0.08]'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              Edit Video
            </Link>
            <Link 
              to="/feedback" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/feedback') 
                  ? darkMode
                    ? 'bg-white/[0.08] text-white shadow-lg shadow-blue-500/20 border border-white/[0.08]'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Feedback
            </Link>
            <Link 
              to="/leaderboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/leaderboard') 
                  ? darkMode
                    ? 'bg-white/[0.08] text-white shadow-lg shadow-blue-500/20 border border-white/[0.08]'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Trophy className="w-5 h-5" />
              Leaderboard
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-150 hover:scale-110 ${
                darkMode 
                  ? 'bg-white/[0.05] text-yellow-400 hover:bg-white/[0.08] border border-white/[0.08]' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {userName ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-white/[0.05] border border-white/[0.08]' : 'bg-gray-100'
                }`}>
                  <User className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.05]' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}