import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Moon, Sun, Bell, User, LogOut, Home, Upload, Award, TrendingUp, MessageSquare, Video, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const notifications = [
  { id: 1, text: 'New badge unlocked: Clarity Master 🎯', time: '5 min ago', unread: true },
  { id: 2, text: 'You moved up 3 ranks on the leaderboard!', time: '1 hour ago', unread: true },
  { id: 3, text: 'Your latest session scored 0.89', time: '2 hours ago', unread: false },
  { id: 4, text: 'Weekly report is now available', time: '1 day ago', unread: false },
];

export function EnhancedNavbar() {
  const { darkMode, setDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const userName = localStorage.getItem('userName') || 'Mentor';
  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/leaderboard', label: 'Leaderboard', icon: TrendingUp },
    { path: '/feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 border-b border-gray-800 shadow-lg shadow-black/20' 
        : 'bg-white/80 border-b border-gray-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <motion.div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="w-6 h-6 text-white" />
            </motion.div>
            <span className={`text-xl font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              MentorVision AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                      isActive(link.path)
                        ? darkMode
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-blue-600 text-white shadow-md'
                        : darkMode
                        ? 'text-gray-300 hover:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all duration-200 relative ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl overflow-hidden ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          className={`p-4 border-b transition-colors ${
                            darkMode 
                              ? 'border-gray-700 hover:bg-gray-700/50' 
                              : 'border-gray-100 hover:bg-gray-50'
                          } ${notif.unread ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50' : ''}`}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {notif.text}
                            </p>
                            {notif.unread && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                            )}
                          </div>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {notif.time}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                onClick={() => setShowProfile(!showProfile)}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
                }`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block">{userName}</span>
              </motion.button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden ${
                      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {userName}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Mentor
                      </p>
                    </div>
                    <div className="p-2">
                      <motion.button
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </motion.button>
                      <Link to="/edit-video">
                        <motion.button
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                            darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <Video className="w-4 h-4" />
                          <span>My Videos</span>
                        </motion.button>
                      </Link>
                      <motion.button
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </motion.button>
                    </div>
                    <div className={`p-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <motion.button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                          darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="md:hidden py-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} to={link.path} onClick={() => setShowMobileMenu(false)}>
                    <div
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        isActive(link.path)
                          ? darkMode
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
