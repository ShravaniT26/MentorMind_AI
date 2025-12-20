import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, FileVideo, Loader2, Ear, Eye, Sparkles, Link2, CheckCircle2 } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

type AccessibilityMode = 'deaf' | 'blind' | 'easy' | 'all' | null;
type UploadMethod = 'file' | 'url';

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('file');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>(null);
  const [urlError, setUrlError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      // Check if it's a valid video URL (YouTube, Vimeo, or direct video file)
      const validDomains = ['youtube.com', 'youtu.be', 'vimeo.com'];
      const isValidDomain = validDomains.some(domain => urlObj.hostname.includes(domain));
      const isVideoFile = /\.(mp4|mov|avi|webm)$/i.test(urlObj.pathname);
      return isValidDomain || isVideoFile;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    if (url && !validateUrl(url)) {
      setUrlError('Please enter a valid video URL (YouTube, Vimeo, or direct video link)');
    } else {
      setUrlError('');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('video/')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if ((!file && !videoUrl) || (videoUrl && urlError)) return;
    
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call - send accessibility mode to backend
    console.log('Uploading with accessibility mode:', accessibilityMode);
    console.log('Upload method:', uploadMethod, file ? file.name : videoUrl);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Mock evaluation ID
      const evaluationId = Math.random().toString(36).substring(7);
      
      setTimeout(() => {
        navigate(`/processing?id=${evaluationId}`);
      }, 500);
    }, 3500);
  };

  const removeFile = () => {
    setFile(null);
    setVideoUrl('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasVideoSource = file || (videoUrl && !urlError);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl md:text-5xl mb-4 ${
          darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
        }`}>
          Upload Mentoring Session
        </h1>
        <p className={`text-lg md:text-xl ${
          darkMode ? 'text-gray-300 font-medium' : 'text-gray-600'
        }`}>
          Upload your video to receive AI-powered evaluation and feedback
        </p>
      </motion.div>

      <motion.div 
        className={`rounded-xl shadow-md p-8 ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Upload Method Tabs */}
        {!file && !videoUrl && (
          <div className="flex gap-4 mb-6">
            <motion.button
              onClick={() => setUploadMethod('file')}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                uploadMethod === 'file'
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileVideo className="w-5 h-5" />
              Upload File
            </motion.button>
            <motion.button
              onClick={() => setUploadMethod('url')}
              className={`flex-1 py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                uploadMethod === 'url'
                  ? darkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-md'
                  : darkMode
                  ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link2 className="w-5 h-5" />
              Paste URL
            </motion.button>
          </div>
        )}

        {!hasVideoSource ? (
          uploadMethod === 'file' ? (
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              dragActive 
                ? darkMode
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-500 bg-blue-50'
                : darkMode
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <motion.div 
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-100'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <UploadIcon className="w-10 h-10 text-blue-600" />
            </motion.div>
            <h3 className={`text-xl mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
              Drag and drop your video here
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>or</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/mov,video/avi,video/webm"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <motion.label
              htmlFor="file-upload"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileVideo className="w-5 h-5" />
              Browse Files
            </motion.label>
            <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Supported formats: MP4, MOV, AVI, WEBM (Max size: 500MB)
            </p>
          </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Paste Video URL
                </label>
                <div className="relative">
                  <Link2 className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={handleUrlChange}
                    placeholder="https://youtube.com/watch?v=... or https://example.com/video.mp4"
                    className={`w-full pl-12 pr-4 py-4 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                        : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
                    }`}
                  />
                  {videoUrl && !urlError && (
                    <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {urlError && (
                  <p className="mt-2 text-sm text-red-500">{urlError}</p>
                )}
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Supported: YouTube, Vimeo, or direct video links (.mp4, .mov, .avi, .webm)
                </p>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <FileVideo className="w-8 h-8 text-blue-600" />
                <div>
                  <p className={darkMode ? 'text-white' : 'text-gray-900'}>{file ? file.name : videoUrl}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Video URL'}
                  </p>
                </div>
              </div>
              {!uploading && (
                <motion.button
                  onClick={removeFile}
                  className={`p-2 rounded-lg transition-all duration-150 ${
                    darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </motion.button>
              )}
            </div>

            {/* Accessibility Mode Selection */}
            <div className="mb-6">
              <h3 className={`text-lg mb-3 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
                Who is this session accessible for?
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose a mode to optimize the evaluation for different accessibility needs
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.button
                  type="button"
                  onClick={() => setAccessibilityMode(accessibilityMode === 'all' ? null : 'all')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    accessibilityMode === 'all'
                      ? darkMode
                        ? 'border-green-600 bg-green-600/20 shadow-lg shadow-green-500/30'
                        : 'border-green-600 bg-green-50 shadow-md'
                      : darkMode
                      ? 'border-gray-600 hover:border-green-500/50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className={`w-8 h-8 ${accessibilityMode === 'all' ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div className="text-center">
                      <h4 className={darkMode ? 'text-white mb-1' : 'text-gray-900 mb-1'}>All Students</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Optimized for everyone
                      </p>
                    </div>
                    {accessibilityMode === 'all' && (
                      <div className="mt-2 px-3 py-1 bg-green-600 text-white rounded-full text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setAccessibilityMode(accessibilityMode === 'deaf' ? null : 'deaf')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    accessibilityMode === 'deaf'
                      ? darkMode
                        ? 'border-blue-600 bg-blue-600/20 shadow-lg shadow-blue-500/30'
                        : 'border-blue-600 bg-blue-50 shadow-md'
                      : darkMode
                      ? 'border-gray-600 hover:border-blue-500/50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Ear className={`w-8 h-8 ${accessibilityMode === 'deaf' ? 'text-blue-600' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div className="text-center">
                      <h4 className={darkMode ? 'text-white mb-1' : 'text-gray-900 mb-1'}>DEAF Mode</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Enhanced captions & visual feedback
                      </p>
                    </div>
                    {accessibilityMode === 'deaf' && (
                      <div className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setAccessibilityMode(accessibilityMode === 'blind' ? null : 'blind')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    accessibilityMode === 'blind'
                      ? darkMode
                        ? 'border-purple-600 bg-purple-600/20 shadow-lg shadow-purple-500/30'
                        : 'border-purple-600 bg-purple-50 shadow-md'
                      : darkMode
                      ? 'border-gray-600 hover:border-purple-500/50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Eye className={`w-8 h-8 ${accessibilityMode === 'blind' ? 'text-purple-600' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div className="text-center">
                      <h4 className={darkMode ? 'text-white mb-1' : 'text-gray-900 mb-1'}>BLIND Mode</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Audio clarity & detailed descriptions
                      </p>
                    </div>
                    {accessibilityMode === 'blind' && (
                      <div className="mt-2 px-3 py-1 bg-purple-600 text-white rounded-full text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setAccessibilityMode(accessibilityMode === 'easy' ? null : 'easy')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    accessibilityMode === 'easy'
                      ? darkMode
                        ? 'border-orange-600 bg-orange-600/20 shadow-lg shadow-orange-500/30'
                        : 'border-orange-600 bg-orange-50 shadow-md'
                      : darkMode
                      ? 'border-gray-600 hover:border-orange-500/50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className={`w-8 h-8 ${accessibilityMode === 'easy' ? 'text-orange-600' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div className="text-center">
                      <h4 className={darkMode ? 'text-white mb-1' : 'text-gray-900 mb-1'}>EASY Mode</h4>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Simplified feedback & guidance
                      </p>
                    </div>
                    {accessibilityMode === 'easy' && (
                      <div className="mt-2 px-3 py-1 bg-orange-600 text-white rounded-full text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.button>
              </div>
            </div>

            {uploading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Uploading and processing...
                  </span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}>{progress}%</span>
                </div>
                <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <motion.button
              onClick={handleUpload}
              disabled={uploading || !hasVideoSource}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              }`}
              whileHover={!uploading && hasVideoSource ? { scale: 1.02 } : {}}
              whileTap={!uploading && hasVideoSource ? { scale: 0.98 } : {}}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5" />
                  Start Evaluation
                </>
              )}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <motion.div 
          className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-blue-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-3xl mb-2">⚡</div>
          <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
            Fast Processing
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            AI evaluation completes in minutes, not hours
          </p>
        </motion.div>
        
        <motion.div 
          className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-purple-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-3xl mb-2">🔒</div>
          <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
            Secure & Private
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your videos are encrypted and only accessible to you
          </p>
        </motion.div>
        
        <motion.div 
          className={`p-6 rounded-xl shadow-sm transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:shadow-lg hover:shadow-green-500/20' 
              : 'bg-white hover:shadow-md'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-3xl mb-2">📊</div>
          <h4 className={`mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
            Detailed Reports
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get actionable insights with timestamped evidence
          </p>
        </motion.div>
      </div>
    </div>
  );
}