import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Award, 
  Video, 
  Users, 
  Target, 
  Clock,
  Upload,
  BookOpen,
  Zap,
  Calendar,
  Home,
  Info
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { PerformanceChart } from '../components/PerformanceChart';
import { CircularProgress } from '../components/CircularProgress';

export function Dashboard() {
  const { darkMode } = useDarkMode();
  const userName = localStorage.getItem('userName') || 'Mentor';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
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

  const scaleUpVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  // Mock data
  const dashboardStats = {
    totalSessions: 34,
    averageScore: 0.82,
    totalPoints: 2450,
    badges: 12,
    weeklyImprovement: '+12%',
    hoursTracked: 68,
    studentsReached: 245,
    streakDays: 15,
  };

  const recentSessions = [
    { id: 1, title: 'Introduction to React Hooks', date: '2024-12-14', score: 0.89, duration: '45 min' },
    { id: 2, title: 'Advanced JavaScript Patterns', date: '2024-12-13', score: 0.85, duration: '52 min' },
    { id: 3, title: 'CSS Grid & Flexbox', date: '2024-12-12', score: 0.82, duration: '38 min' },
    { id: 4, title: 'Node.js Best Practices', date: '2024-12-11', score: 0.87, duration: '48 min' },
  ];

  const upcomingSessions = [
    { id: 1, title: 'TypeScript Fundamentals', date: '2024-12-16', time: '10:00 AM' },
    { id: 2, title: 'Database Design Workshop', date: '2024-12-17', time: '2:00 PM' },
    { id: 3, title: 'API Development with Express', date: '2024-12-18', time: '11:00 AM' },
  ];

  const quickActions = [
    { icon: Upload, label: 'Upload Session', link: '/upload', color: 'blue' },
    { icon: BookOpen, label: 'View Feedback', link: '/feedback', color: 'green' },
    { icon: Award, label: 'Leaderboard', link: '/leaderboard', color: 'purple' },
    { icon: Video, label: 'Edit Videos', link: '/edit-video', color: 'orange' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl md:text-5xl mb-2 ${
          darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
        }`}>
          Welcome back, {userName}! 👋
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300 font-medium' : 'text-gray-600'}`}>
          Here's your teaching performance overview
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          const colorMap: Record<string, string> = {
            blue: darkMode ? 'from-blue-600 to-blue-700' : 'from-blue-500 to-blue-600',
            green: darkMode ? 'from-green-600 to-green-700' : 'from-green-500 to-green-600',
            purple: darkMode ? 'from-purple-600 to-purple-700' : 'from-purple-500 to-purple-600',
            orange: darkMode ? 'from-orange-600 to-orange-700' : 'from-orange-500 to-orange-600',
          };

          return (
            <Link key={index} to={action.link}>
              <motion.div
                className={`p-6 rounded-xl bg-gradient-to-br ${colorMap[action.color]} text-white shadow-md`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Icon className="w-8 h-8 mb-2" />
                <p className="font-medium">{action.label}</p>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Sessions"
          value={dashboardStats.totalSessions}
          icon={Video}
          trend="+3"
          trendUp={true}
          color="blue"
        />
        <StatsCard
          title="Average Score"
          value={dashboardStats.averageScore}
          icon={Target}
          trend={dashboardStats.weeklyImprovement}
          trendUp={true}
          decimals={2}
          color="green"
        />
        <StatsCard
          title="Total Points"
          value={dashboardStats.totalPoints}
          icon={TrendingUp}
          trend="+245"
          trendUp={true}
          color="purple"
        />
        <StatsCard
          title="Badges Earned"
          value={dashboardStats.badges}
          icon={Award}
          trend="+2"
          trendUp={true}
          color="yellow"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Hours Tracked"
          value={dashboardStats.hoursTracked}
          icon={Clock}
          trend="+8"
          trendUp={true}
          color="orange"
        />
        <StatsCard
          title="Students Reached"
          value={dashboardStats.studentsReached}
          icon={Users}
          trend="+32"
          trendUp={true}
          color="blue"
        />
        <StatsCard
          title="Day Streak"
          value={dashboardStats.streakDays}
          icon={Zap}
          trend="+2"
          trendUp={true}
          suffix=" days"
          color="green"
        />
      </div>

      {/* Performance Chart */}
      <div className="mb-8">
        <PerformanceChart />
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Recent Sessions */}
        <motion.div
          className={`rounded-xl shadow-md p-6 ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Recent Sessions
          </h2>
          <div className="space-y-4">
            {recentSessions.map((session, index) => (
              <motion.div
                key={session.id}
                className={`p-4 rounded-lg transition-all ${
                  darkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className={`mb-1 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {session.date}
                      </span>
                      <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {session.duration}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <CircularProgress score={session.score} size={60} color="blue" strokeWidth={4} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to="/home">
            <motion.button
              className={`w-full mt-4 py-3 rounded-lg transition-all ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Sessions
            </motion.button>
          </Link>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          className={`rounded-xl shadow-md p-6 ${
            darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Upcoming Sessions
          </h2>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                className={`p-4 rounded-lg transition-all ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30' 
                    : 'bg-gradient-to-r from-purple-50 to-blue-50'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ x: -5 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-purple-600/20' : 'bg-purple-100'
                  }`}>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-1 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
                      {session.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {session.date}
                      </span>
                      <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>
                        {session.time}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button
            className={`w-full mt-4 py-3 rounded-lg transition-all ${
              darkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule New Session
          </motion.button>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        className={`rounded-xl shadow-md p-8 ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/30' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="text-center mb-6">
          <h2 className={`text-2xl mb-2 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Your Teaching Impact
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Keep up the great work! You're making a difference.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center">
            <CircularProgress score={0.89} size={100} color="yellow" label="Clarity" />
          </div>
          <div className="text-center">
            <CircularProgress score={0.85} size={100} color="blue" label="Engagement" />
          </div>
          <div className="text-center">
            <CircularProgress score={0.78} size={100} color="green" label="Filler" />
          </div>
          <div className="text-center">
            <CircularProgress score={0.84} size={100} color="orange" label="Pace" />
          </div>
          <div className="text-center">
            <CircularProgress score={0.80} size={100} color="purple" label="Technical" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}