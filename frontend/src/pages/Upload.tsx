import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, FileVideo, Loader2, Ear, Eye, Sparkles } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { motion } from 'framer-motion';

type AccessibilityMode = 'deaf' | 'blind' | 'easy' | 'all' | null;

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const BACKEND_URL = "http://localhost:8000/api/v1/upload";  // IMPORTANT

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

  // -------------------------
  // ⭐ UPDATED UPLOAD LOGIC
  // -------------------------
  const handleUpload = async () => {
    if (!file) return;
    if (!accessibilityMode) {
      alert("Please select an accessibility mode.");
      return;
    }

    setUploading(true);
    setProgress(5);

    // Create FormData for FastAPI
    const formData = new FormData();
    formData.append("video_file", file);
    formData.append("mode", accessibilityMode);

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        clearInterval(interval);
        setUploading(false);
        alert("Upload failed. Backend error.");
        return;
      }

      const data = await response.json();

      // Example backend response:
      // { job_id: "abc123" }
      const jobId = data.job_id;
      console.log("Job ID:", jobId);

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        navigate(`/results/${jobId}`); // Redirect to results
      }, 600);

    } catch (err) {
      clearInterval(interval);
      setUploading(false);
      console.error(err);
      alert("Could not connect to backend.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* UI - UNCHANGED */}
      {/* ------------ FULL UI SAME AS BEFORE ------------ */}
      {/* ❗ Skipping UI for length — keep your original UI below */}
      {/* Paste your original UI from here downward, unchanged */}
    </div>
  );
}
