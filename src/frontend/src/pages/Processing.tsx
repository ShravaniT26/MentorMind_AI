import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Volume2, 
  Eye, 
  Shield, 
  BarChart3 
} from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number;
}

const steps: ProcessStep[] = [
  {
    id: 'captions',
    title: 'Analyzing Smart Captions',
    description: 'Transcribing audio and generating accessibility-optimized captions',
    icon: FileText,
    duration: 2000
  },
  {
    id: 'audio',
    title: 'Checking Audio Descriptions',
    description: 'Evaluating audio clarity and verbal descriptions for visual content',
    icon: Volume2,
    duration: 2000
  },
  {
    id: 'quality',
    title: 'Evaluating Teaching Quality',
    description: 'Analyzing clarity, engagement, pace, and technical depth',
    icon: Sparkles,
    duration: 2500
  },
  {
    id: 'bias',
    title: 'Applying Bias Mitigation',
    description: 'Ensuring fair evaluation across different teaching styles',
    icon: Shield,
    duration: 1500
  },
  {
    id: 'report',
    title: 'Generating Report',
    description: 'Creating detailed insights and actionable recommendations',
    icon: BarChart3,
    duration: 2000
  }
];

export function Processing() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { darkMode } = useDarkMode();
  
  const evaluationId = searchParams.get('id') || 'demo';

  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => {
        navigate(`/results/${evaluationId}`);
      }, 1000);
      return;
    }

    const currentStepData = steps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, currentStepData.id]);
      setCurrentStep(prev => prev + 1);
    }, currentStepData.duration);

    return () => clearTimeout(timer);
  }, [currentStep, navigate, evaluationId]);

  const progressPercentage = ((currentStep) / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className={`max-w-3xl w-full rounded-2xl shadow-2xl p-8 md:p-12 ${
          darkMode
            ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
            : 'bg-white'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
              darkMode ? 'bg-blue-600/20 border-2 border-blue-500/30' : 'bg-blue-100'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h1 className={`text-3xl md:text-4xl mb-3 ${
            darkMode ? 'text-white font-bold' : 'text-gray-900 font-bold'
          }`}>
            AI Analysis in Progress
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Please wait while we evaluate your teaching session
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Processing...
            </span>
            <span className={darkMode ? 'text-white font-medium' : 'text-gray-900 font-medium'}>
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className={`w-full h-3 rounded-full overflow-hidden ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                    isCompleted
                      ? darkMode
                        ? 'bg-green-600/10 border-green-500/30'
                        : 'bg-green-50 border-green-200'
                      : isCurrent
                      ? darkMode
                        ? 'bg-blue-600/10 border-blue-500/30'
                        : 'bg-blue-50 border-blue-200'
                      : darkMode
                      ? 'bg-gray-700/30 border-gray-600/30'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      isCompleted
                        ? darkMode
                          ? 'bg-green-600/20'
                          : 'bg-green-100'
                        : isCurrent
                        ? darkMode
                          ? 'bg-blue-600/20'
                          : 'bg-blue-100'
                        : darkMode
                        ? 'bg-gray-600/20'
                        : 'bg-gray-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : isCurrent ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="w-6 h-6 text-blue-600" />
                        </motion.div>
                      ) : (
                        <StepIcon className={`w-6 h-6 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`font-semibold ${
                          isCompleted || isCurrent
                            ? darkMode
                              ? 'text-white'
                              : 'text-gray-900'
                            : darkMode
                            ? 'text-gray-500'
                            : 'text-gray-500'
                        }`}>
                          {isCurrent && '🔄 '}
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <motion.span
                            className={`text-xs px-2 py-1 rounded-full ${
                              darkMode
                                ? 'bg-green-600/20 text-green-400'
                                : 'bg-green-100 text-green-700'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            Complete
                          </motion.span>
                        )}
                        {isCurrent && (
                          <motion.span
                            className={`text-xs px-2 py-1 rounded-full ${
                              darkMode
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            In Progress
                          </motion.span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isCompleted || isCurrent
                          ? darkMode
                            ? 'text-gray-300'
                            : 'text-gray-600'
                          : darkMode
                          ? 'text-gray-600'
                          : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer Message */}
        <motion.div
          className={`mt-8 p-4 rounded-lg text-center ${
            darkMode
              ? 'bg-blue-600/10 border border-blue-500/20'
              : 'bg-blue-50 border border-blue-200'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className={`text-sm ${
            darkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            💡 <strong>Tip:</strong> Your evaluation results will include timestamped evidence and actionable feedback
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}