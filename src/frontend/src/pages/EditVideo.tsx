import { useState } from 'react';
import { Video, Edit3, FileText, Mic, Captions, Save, Play, Trash2, Plus } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'motion/react';

interface VideoItem {
  id: string;
  title: string;
  uploadDate: string;
  duration: string;
  thumbnail: string;
  accessibilityMode: string;
  notes: string[];
  voiceNotes: string[];
  captions: CaptionItem[];
}

interface CaptionItem {
  id: string;
  timestamp: string;
  text: string;
}

// Mock uploaded videos
const mockVideos: VideoItem[] = [
  {
    id: 'vid001',
    title: 'Introduction to Data Structures',
    uploadDate: '2024-11-28',
    duration: '45:30',
    thumbnail: '🎥',
    accessibilityMode: 'All Students',
    notes: ['Covered basic arrays and linked lists', 'Students seemed engaged'],
    voiceNotes: ['voice_note_1.mp3'],
    captions: [
      { id: 'c1', timestamp: '00:15', text: 'Welcome everyone to today\'s session' },
      { id: 'c2', timestamp: '01:30', text: 'We will start with arrays' },
    ]
  },
  {
    id: 'vid002',
    title: 'Advanced Python Concepts',
    uploadDate: '2024-11-25',
    duration: '52:15',
    thumbnail: '📹',
    accessibilityMode: 'DEAF Mode',
    notes: ['Focus on decorators and generators'],
    voiceNotes: [],
    captions: [
      { id: 'c3', timestamp: '00:10', text: 'Hello students, today we discuss decorators' },
    ]
  },
  {
    id: 'vid003',
    title: 'Machine Learning Basics',
    uploadDate: '2024-11-22',
    duration: '38:45',
    thumbnail: '🎬',
    accessibilityMode: 'BLIND Mode',
    notes: ['Explained supervised vs unsupervised learning'],
    voiceNotes: ['voice_note_2.mp3'],
    captions: []
  }
];

export function EditVideo() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [captions, setCaptions] = useState<CaptionItem[]>([]);
  const [newCaptionTime, setNewCaptionTime] = useState('');
  const [newCaptionText, setNewCaptionText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { darkMode } = useDarkMode();

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setNotes(video.notes);
    setCaptions(video.captions);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleAddCaption = () => {
    if (newCaptionTime && newCaptionText) {
      const newCaption: CaptionItem = {
        id: `c${Date.now()}`,
        timestamp: newCaptionTime,
        text: newCaptionText
      };
      setCaptions([...captions, newCaption].sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
      setNewCaptionTime('');
      setNewCaptionText('');
    }
  };

  const handleEditCaption = (id: string, newText: string) => {
    setCaptions(captions.map(cap => cap.id === id ? { ...cap, text: newText } : cap));
  };

  const handleDeleteCaption = (id: string) => {
    setCaptions(captions.filter(cap => cap.id !== id));
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert('Voice recording started. Click again to stop.');
    } else {
      alert('Voice recording saved!');
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', { notes, captions });
    alert('Changes saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center gap-3 mb-4">
          <Edit3 className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <h1 className={`text-4xl md:text-5xl ${
            darkMode ? 'text-white font-bold drop-shadow-lg' : 'text-gray-900'
          }`}>
            Edit Your Videos
          </h1>
        </div>
        <p className={`text-lg md:text-xl ${
          darkMode ? 'text-gray-300 font-medium' : 'text-gray-600'
        }`}>
          Manage your uploaded videos, add notes, voice recordings, and edit captions
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video List */}
        <div className="lg:col-span-1">
          <motion.div 
            className={`rounded-xl shadow-md p-6 ${
              darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-xl mb-4 ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
              Your Videos
            </h2>
            <div className="space-y-3">
              {mockVideos.map((video, index) => (
                <motion.button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedVideo?.id === video.id
                      ? darkMode
                        ? 'border-purple-600 bg-purple-600/20 shadow-lg shadow-purple-500/30'
                        : 'border-purple-600 bg-purple-50 shadow-md'
                      : darkMode
                      ? 'border-gray-700 hover:border-purple-500/50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{video.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {video.duration}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {video.uploadDate}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {video.accessibilityMode}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Edit Panel */}
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <div className="space-y-6">
              {/* Video Preview */}
              <motion.div 
                className={`rounded-xl shadow-md p-6 ${
                  darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className={`text-2xl ${darkMode ? 'text-white font-semibold' : 'text-gray-900'}`}>
                      {selectedVideo.title}
                    </h2>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Session ID: {selectedVideo.id}
                    </p>
                  </div>
                  <motion.button 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      darkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-4 h-4" />
                    Preview
                  </motion.button>
                </div>
                <div className={`rounded-lg h-64 flex items-center justify-center ${
                  darkMode ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50' : 'bg-gradient-to-br from-purple-100 to-blue-100'
                }`}>
                  <div className="text-center">
                    <Video className={`w-16 h-16 mx-auto mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Video Preview</p>
                  </div>
                </div>
              </motion.div>

              {/* Notes Section */}
              <motion.div 
                className={`rounded-xl shadow-md p-6 ${
                  darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h3 className={`text-xl ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Session Notes</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  {notes.map((note, index) => (
                    <motion.div 
                      key={index} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        darkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-50'
                      }`}
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <span className="text-green-600 mt-1">•</span>
                      <p className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{note}</p>
                      <motion.button
                        onClick={() => handleDeleteNote(index)}
                        className={`p-1 rounded transition-colors ${
                          darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  />
                  <motion.button
                    onClick={handleAddNote}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                      darkMode
                        ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </motion.button>
                </div>
              </motion.div>

              {/* Voice Recording Section */}
              <motion.div 
                className={`rounded-xl shadow-md p-6 ${
                  darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Mic className="w-6 h-6 text-orange-600" />
                  <h3 className={`text-xl ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Voice Notes</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  {selectedVideo.voiceNotes.map((voiceNote, index) => (
                    <motion.div 
                      key={index} 
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        darkMode ? 'bg-orange-600/20 border border-orange-500/30' : 'bg-orange-50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Mic className="w-5 h-5 text-orange-600" />
                      <span className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{voiceNote}</span>
                      <motion.button 
                        className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Play
                      </motion.button>
                      <motion.button 
                        className={`p-1 rounded transition-colors ${
                          darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={handleToggleRecording}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isRecording
                      ? darkMode
                        ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30'
                        : 'bg-red-600 text-white hover:bg-red-700'
                      : darkMode
                      ? 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/30'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mic className="w-5 h-5" />
                  {isRecording ? 'Stop Recording' : 'Start Voice Recording'}
                </motion.button>
              </motion.div>

              {/* Captions Editing */}
              <motion.div 
                className={`rounded-xl shadow-md p-6 ${
                  darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Captions className="w-6 h-6 text-blue-600" />
                  <h3 className={`text-xl ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>Edit Captions</h3>
                </div>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {captions.map((caption) => (
                    <motion.div 
                      key={caption.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        darkMode ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-blue-50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="px-3 py-1 bg-blue-600 text-white rounded text-sm shrink-0">
                        {caption.timestamp}
                      </div>
                      <input
                        type="text"
                        value={caption.text}
                        onChange={(e) => handleEditCaption(caption.id, e.target.value)}
                        className={`flex-1 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                        }`}
                      />
                      <motion.button
                        onClick={() => handleDeleteCaption(caption.id)}
                        className={`p-1 rounded transition-colors ${
                          darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCaptionTime}
                      onChange={(e) => setNewCaptionTime(e.target.value)}
                      placeholder="00:00"
                      className={`w-24 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                      }`}
                    />
                    <input
                      type="text"
                      value={newCaptionText}
                      onChange={(e) => setNewCaptionText(e.target.value)}
                      placeholder="Caption text..."
                      className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border border-gray-300'
                      }`}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCaption()}
                    />
                    <motion.button
                      onClick={handleAddCaption}
                      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        darkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.button
                onClick={handleSaveChanges}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-200 ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-5 h-5" />
                Save All Changes
              </motion.button>
            </div>
          ) : (
            <motion.div 
              className={`rounded-xl shadow-md p-12 text-center ${
                darkMode ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' : 'bg-white'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Video className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl mb-2 ${darkMode ? 'text-white font-medium' : 'text-gray-900'}`}>
                No Video Selected
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Select a video from the list to start editing
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
