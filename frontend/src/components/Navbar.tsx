import { Link, useLocation } from 'react-router-dom';
import { Upload, BarChart3, Trophy, Home, LogIn, User, MessageSquare, Edit3, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

export function Navbar() {
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  useEffect(() => {
    const name = localStorage.getItem('userName');
    setUserName(name);
  }, [location]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setUserName(null);
  };
  
  return (
    <nav className={`shadow-md sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 bg-opacity-90 border-b border-gray-700' 
        : 'bg-white bg-opacity-90'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              MentorVision AI
            </span>
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link 
              to="/home" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/home') 
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-blue-600 text-white shadow-md scale-105'
                  : darkMode 
                  ? 'text-gray-300 hover:bg-gray-800 hover:scale-105' 
                  : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/upload') 
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
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
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Student Feedback
            </Link>
            <Link 
              to="/leaderboard" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive('/leaderboard') 
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-100 text-blue-700'
                  : darkMode 
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
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
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:shadow-lg hover:shadow-yellow-500/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {userName ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100'
                }`}>
                  <User className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    darkMode 
                      ? 'text-gray-500 hover:text-gray-400 hover:bg-gray-800/50' 
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
    </nav>
  );
}