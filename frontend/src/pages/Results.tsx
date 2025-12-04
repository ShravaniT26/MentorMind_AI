import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MetricCard } from '../components/MetricCard';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { SuggestedVideos } from '../components/SuggestedVideos';
import { Download, Share2 } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';
import { ResultsGraph } from "../components/ResultsGraph";


// ⭐ FIXED — correct base URL (no {id} here)
const BACKEND_URL = "http://localhost:8000/api/v1/results";

const handleShare = () => {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "MentorMind AI Report",
      text: "Here is my teaching evaluation report!",
      url
    }).catch(err => console.log("Share canceled", err));
  } 
  else {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  }
};


export function Results() {
  const { id } = useParams();
  const [showAccessibility, setShowAccessibility] = useState(false);
  const { darkMode } = useDarkMode();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // ⭐ Fetch evaluation results from backend
  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch(`${BACKEND_URL}/${id}`);

        if (!res.ok) {
          throw new Error("Evaluation still processing or job not found.");
        }

        const data = await res.json();

        // ⭐ Transform backend response
        const transformed = {
          overallScore: data.overall?.toFixed(1) || 0,
          pointsEarned: Math.round((data.overall || 0) * 25),
          weeklyImprovement: "+12%",
          badgesEarned: [
            ...(data?.clarity > 0.8 ? [{ id: 1, name: "Clarity Master", icon: "🎯" }] : []),
            ...(data?.engagement > 0.8 ? [{ id: 2, name: "Engagement Pro", icon: "💡" }] : [])
          ],
          metrics: [
            {
              name: "Clarity",
              score: (data?.clarity || 0) * 10,
              color: "yellow",
              icon: "🎯",
              suggestion: data.feedback?.clarity || "No clarity feedback",
              evidenceClips: []
            },
            {
              name: "Engagement",
              score: (data?.engagement || 0) * 10,
              color: "blue",
              icon: "💡",
              suggestion: data.feedback?.engagement || "No engagement feedback",
              evidenceClips: []
            },
            {
              name: "Communication",
              score: (data?.communication || 0) * 10,
              color: "green",
              icon: "💬",
              suggestion: data.feedback?.communication || "No communication feedback",
              evidenceClips: []
            },
            {
              name: "Technical Depth",
              score: (data?.technical_depth || 0) * 10,
              color: "purple",
              icon: "🔬",
              suggestion: data.feedback?.technical_depth || "No technical depth feedback",
              evidenceClips: []
            },
            {
              name: "Interaction",
              score: (data?.interaction || 0) * 10,
              color: "orange",
              icon: "🤝",
              suggestion: data.feedback?.interaction || "No interaction feedback",
              evidenceClips: []
            }
          ]
        };

        setResults(transformed);
        setLoading(false);

      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchResults();
  }, [id]);

  // ⭐ Loader
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <p className="mt-4 text-xl text-gray-600">Fetching evaluation results...</p>
      </div>
    );
  }

  // ⭐ Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <p className="text-gray-600">Please wait a moment and refresh.</p>
      </div>
    );
  }

  const data = results;

  // ⭐ UI BELOW IS EXACT SAME (unchanged)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className={`text-4xl mb-2 ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}>
              Evaluation Results
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Session ID: {id}</p>
          </div>

          <div className="flex gap-3">
            <motion.button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.button>

            <motion.button 
               onClick={handleShare}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                 darkMode
                  ? 'border border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border border-gray-300 hover:bg-gray-50'
               }`}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
>
                <Share2 className="w-4 h-4" />
                Share
            </motion.button>
          </div>
        </div>

        {/* Overall Score */}
        <div className={`rounded-xl p-6 ${
          darkMode ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700/30'
                  : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}>
          <div className="text-center">
            <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Overall Score</p>

            <motion.div 
              className={`text-6xl mb-2 ${darkMode ? 'text-white font-bold' : 'text-gray-900'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              {data.overallScore}
            </motion.div>

            <div className={`text-xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>out of 10</div>
          </div>
        </div>

      </motion.div>

      {/* Gamification Panel */}
      <motion.div 
        className={`rounded-xl shadow-md p-8 mb-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className={`text-2xl mb-6 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
          Session Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-yellow-600/20 border border-yellow-500/30' : 'bg-yellow-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">🏆</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {data.pointsEarned}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Points Earned</p>
          </motion.div>

          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">📈</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {data.weeklyImprovement}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Weekly Improvement</p>
          </motion.div>

          <motion.div 
            className={`text-center p-6 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-purple-50'
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-4xl mb-2">🎖️</div>
            <div className={`text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {data.badgesEarned.length}
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>New Badges</p>
          </motion.div>
        </div>

        <div className="mt-6">
          <BadgeDisplay badges={data.badgesEarned} />
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
            Parameter-wise Analysis
          </h2>

          <motion.button
            onClick={() => setShowAccessibility(!showAccessibility)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAccessibility ? 'Hide' : 'Show'} Accessibility Features
          </motion.button>
        </div>

        {showAccessibility && (
          <div className="mb-6">
            <AccessibilityPanel />
          </div>
        )}

        {/* 🔥 Graph Section */}
        <ResultsGraph metrics={data.metrics} />

        <div className="grid md:grid-cols-2 gap-6">
         {data.metrics.map((metric: any) => (
          <MetricCard key={metric.name} metric={metric} />
         ))}
        </div>


        <div className="grid md:grid-cols-2 gap-6">
          {data.metrics.map((metric: any) => (
            <MetricCard key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <SuggestedVideos />
      </div>

    </div>
  );
}
