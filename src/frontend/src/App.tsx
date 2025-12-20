import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnimatedBackground } from './components/AnimatedBackground';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Upload } from './pages/Upload';
import { Processing } from './pages/Processing';
import { Results } from './pages/Results';
import { Leaderboard } from './pages/Leaderboard';
import { StudentFeedbackPage } from './pages/StudentFeedbackPage';
import { EditVideo } from './pages/EditVideo';
import { Dashboard } from './pages/Dashboard';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  
  // Check if user is logged in and not on login page
  const isLoggedIn = localStorage.getItem('userName');
  const showNavbar = location.pathname !== '/login' && isLoggedIn;
  
  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-[#0a0a0a]' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <AnimatedBackground />
      <div className="relative z-10">
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/edit-video" element={<EditVideo />} />
          <Route path="/feedback" element={<StudentFeedbackPage />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}