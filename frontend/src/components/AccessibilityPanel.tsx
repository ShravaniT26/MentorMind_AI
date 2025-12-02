import { useState } from 'react';
import { Volume2, Mic, Subtitles, VolumeX } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

export function AccessibilityPanel() {
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [voiceInputActive, setVoiceInputActive] = useState(false);
  const { darkMode } = useDarkMode();

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Text-to-speech feature activated. Your evaluation results will be read aloud.'
      );
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    setVoiceInputActive(!voiceInputActive);
    // In a real implementation, this would activate voice recognition
    if (!voiceInputActive) {
      alert('Voice input activated. Speak your feedback now.');
    }
  };

  return (
    <div className={`rounded-xl shadow-md p-6 ${
      darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
    }`}>
      <h3 className={`text-xl mb-4 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
        Accessibility Features
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Captions Toggle */}
        <motion.button
          onClick={() => setCaptionsEnabled(!captionsEnabled)}
          className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            captionsEnabled 
              ? darkMode
                ? 'border-green-600 bg-green-600/20 shadow-lg shadow-green-500/20'
                : 'border-green-500 bg-green-50 shadow-md'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Subtitles className={`w-8 h-8 ${
            captionsEnabled ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-600'
          }`} />
          <div className="text-center">
            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Captions</div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {captionsEnabled ? 'On' : 'Off'}
            </div>
          </div>
        </motion.button>

        {/* Audio Toggle */}
        <motion.button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            audioEnabled 
              ? darkMode
                ? 'border-blue-600 bg-blue-600/20 shadow-lg shadow-blue-500/20'
                : 'border-blue-500 bg-blue-50 shadow-md'
              : darkMode
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {audioEnabled ? (
            <Volume2 className="w-8 h-8 text-blue-600" />
          ) : (
            <VolumeX className={`w-8 h-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          )}
          <div className="text-center">
            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Audio</div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {audioEnabled ? 'On' : 'Off'}
            </div>
          </div>
        </motion.button>

        {/* Text-to-Speech */}
        <motion.button
          onClick={handleTextToSpeech}
          className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            darkMode
              ? 'border-gray-600 hover:border-purple-500/50 hover:bg-purple-600/10'
              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 className="w-8 h-8 text-purple-600" />
          <div className="text-center">
            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Text-to-Speech
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Read Results
            </div>
          </div>
        </motion.button>

        {/* Voice Input */}
        <motion.button
          onClick={handleVoiceInput}
          className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
            voiceInputActive 
              ? darkMode
                ? 'border-red-600 bg-red-600/20 shadow-lg shadow-red-500/20'
                : 'border-red-500 bg-red-50 shadow-md'
              : darkMode
              ? 'border-gray-600 hover:border-orange-500/50 hover:bg-orange-600/10'
              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mic className={`w-8 h-8 ${
            voiceInputActive ? 'text-red-600' : 'text-orange-600'
          }`} />
          <div className="text-center">
            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Voice Input
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {voiceInputActive ? 'Listening...' : 'Click to Speak'}
            </div>
          </div>
        </motion.button>
      </div>

      {/* Additional Info */}
      <div className={`mt-6 p-4 rounded-lg ${
        darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50'
      }`}>
        <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          💡 <strong>Tip:</strong> Use keyboard shortcuts for quick access: 
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
          }`}>C</span> for captions, 
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
          }`}>A</span> for audio, 
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white'
          }`}>V</span> for voice input
        </p>
      </div>
    </div>
  );
}