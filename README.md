# 🔍 Steel Defect Analyzer AI

An AI-powered industrial surface inspection system that automatically detects and classifies steel surface defects using Deep Learning and Computer Vision.

## 🚀 Live Demo

### Frontend

https://steel-defect-analyser-frontend.onrender.com

### Backend API

https://steel-defect-analyser.onrender.com

### API Documentation

https://steel-defect-analyser.onrender.com/docs

---

# 📌 Overview

Steel Defect Analyzer AI is a web-based application that allows users to upload steel surface images and receive real-time defect predictions.

The system uses a MobileNetV2-based Convolutional Neural Network trained on steel defect images to classify defects into multiple categories.

---

# ✨ Features

* Upload steel surface images
* Real-time defect detection
* Confidence score prediction
* Interactive modern UI
* FastAPI backend
* MobileNetV2 deep learning model
* REST API support
* Responsive design

---

# 🧠 Defect Classes

The model can classify the following defects:

1. Crazing
2. Inclusion
3. Patches
4. Pitted Surface
5. Rolled-In Scale
6. Scratches

---

# 🏗️ System Architecture

Frontend (React + Vite)
⬇
Backend API (FastAPI)
⬇
MobileNetV2 Model
⬇
Prediction Result

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Icons
* CSS3

## Backend

* FastAPI
* TensorFlow
* Keras
* NumPy
* Pillow

## Deep Learning

* MobileNetV2
* Transfer Learning
* Data Augmentation

## Deployment

* Render (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```text
Steel-Defect-Analyser-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── model/
│   ├── uploads/
│   └── requirements.txt
│
└── training/
    └── training.ipynb
```

# 📸 Screenshots

## Home Page

<!-- Add Screenshot Here -->

![Home Page](screenshots/home.png)

---

## Image Upload

<!-- Add Screenshot Here -->

<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/95342649-222b-439f-9584-fd3c4127c640" />


---

## Prediction Result

<img width="1889" height="932" alt="image" src="https://github.com/user-attachments/assets/063b4112-65bb-4166-b0f7-f05ba441a0e2" />


---

## API Documentation

<img width="1903" height="944" alt="image" src="https://github.com/user-attachments/assets/9718632d-0349-4e04-b7d1-e7f88e4d4804" />

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone <repository-url>
cd Steel-Defect-Analyser-AI
```

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔌 API Endpoint

## Predict Defect

```http
POST /predict
```

### Request

Upload an image file using multipart/form-data.

### Response

```json
{
  "prediction": "scratches",
  "confidence": 98.45
}
```

---

# 🎯 Future Improvements

* Additional defect categories
* Unknown defect detection
* Model explainability using Grad-CAM
* User authentication
* Defect history tracking
* Production-grade monitoring

---

# 👩‍💻 Author

Omisha

Built using Deep Learning, FastAPI, React, and TensorFlow.

---

# ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

