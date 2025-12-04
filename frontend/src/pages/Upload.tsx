import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload as UploadIcon,
  X,
  FileVideo,
  Loader2,
  Ear,
  Eye,
  Sparkles,
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { motion } from "framer-motion";

type AccessibilityMode = "deaf" | "blind" | "easy" | "all" | null;

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [accessibilityMode, setAccessibilityMode] =
    useState<AccessibilityMode>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  
  const SCORE_API = "http://localhost:8000/api/v1/score"; // scoring endpoint
  const MODE_API = "http://localhost:8000/api/v1/upload"; // accessibility mode endpoint

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0] && e.dataTransfer.files[0].type.startsWith("video/")) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // ⭐ MAIN UPLOAD LOGIC
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(5);

    const formData = new FormData();
    formData.append("video_file", file);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      // ⭐ If a mode is selected → send to MODE_API
      if (accessibilityMode !== null && accessibilityMode !== "all") {
        formData.append("mode", accessibilityMode);

        const res = await fetch(MODE_API, {
          method: "POST",
          body: formData,
        });

        clearInterval(interval);
        setProgress(100);

        if (!res.ok) {
          alert("Accessibility mode processing failed.");
        } else {
          const data = await res.json();
          alert(`Accessibility version generated: ${data.output_file}`);
        }

        setUploading(false);
        return;
      }

      // ⭐ No accessibility mode → real scoring
      const res = await fetch(SCORE_API, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        clearInterval(interval);
        alert("Scoring failed.");
        setUploading(false);
        return;
      }

      const data = await res.json(); // { evaluation_id: "xyz123", scores: {...} }

      clearInterval(interval);
      setProgress(100);

      // ⭐ Redirect to results page
      setTimeout(() => {
        navigate(`/results/${data.evaluation_id}`, {
          state: data.scores, // available as location.state
        });
      }, 600);
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert("Unable to connect to backend.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ⭐ Keep your original UI below (unchanged) */}
      {/* PLACE YOUR EXISTING FULL UI CODE HERE */}
    </div>
  );
}
