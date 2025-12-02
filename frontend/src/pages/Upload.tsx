import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
  const location = useLocation();
  const mode = location.state?.mode || "easy"; // deaf, blind, easy

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/process",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      navigate("/results", {
        state: {
          output: res.data,
          mode: mode,
          file: file,
        }
      });

    } catch (err) {
      console.error(err);
      alert("Backend Error! Check FastAPI logs.");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Video ({mode} mode)</h2>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload} style={{ marginTop: "20px" }}>
        Upload & Process
      </button>
    </div>
  );
};

export default Upload;
