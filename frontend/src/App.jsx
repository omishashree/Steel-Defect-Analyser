import { useState } from "react";
import axios from "axios";
import { FaUpload, FaRobot } from "react-icons/fa";
import "./App.css";

const defectDescriptions = {
  crazing:
    "Surface cracks caused by thermal or mechanical stress.",

  inclusion:
    "Foreign material trapped inside the steel surface.",

  patches:
    "Localized irregular areas with different surface appearance.",

  pitted_surface:
    "Small cavities or pits formed on the surface.",

  rolled_in_scale:
    "Oxide scale pressed into the steel during rolling.",

  scratches:
    "Linear marks caused by friction or mechanical abrasion."
};

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));

    setPrediction("");
    setConfidence("");
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = () => {
    if (confidence >= 95) return "#00ff88";
    if (confidence >= 80) return "#00d4ff";
    if (confidence >= 60) return "#ffb703";
    return "#ff4d4d";
  };

  return (
    <div className="app">
      <div className="overlay" />

      <div className="glass-card">
        <h1 className="title">
          <FaRobot />
          Steel Defect Analyzer AI
        </h1>

        <p className="subtitle">
          AI-Powered Industrial Surface Inspection System
        </p>

        <label className="upload-box">
          <FaUpload size={32} />

          <span>Upload Steel Surface Image</span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button
          className="analyze-btn"
          onClick={handlePredict}
        >
          Analyze Image
        </button>

        {loading && (
          <div className="loading">
            Analyzing with AI...
          </div>
        )}

        {prediction && (
          <div className="result-card">
            <h2>Prediction Result</h2>

            <div
              className="confidence-badge"
              style={{
                backgroundColor: getConfidenceColor()
              }}
            >
              {confidence}%
            </div>

            <p className="prediction-text">
              {prediction
                .replaceAll("_", " ")
                .toUpperCase()}
            </p>

            <p className="description">
              {defectDescriptions[prediction]}
            </p>

            <div className="progress-container">
              <div
                className="progress-fill"
                style={{
                  width: `${confidence}%`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;