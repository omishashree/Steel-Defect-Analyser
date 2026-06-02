import os
import shutil
import numpy as np

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# ==============================
# LOAD TRAINED MODEL
# ==============================

model = load_model("model/steel_defect_mobilenet.h5")

# ==============================
# CLASS LABELS
# ==============================

class_names = [
    "crazing",
    "inclusion",
    "patches",
    "pitted_surface",
    "rolled_in_scale",
    "scratches"
]

# ==============================
# IMAGE SETTINGS
# ==============================

IMG_SIZE = 224

# ==============================
# CREATE FASTAPI APP
# ==============================

app = FastAPI()

# ==============================
# ENABLE CORS
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# CREATE UPLOADS FOLDER
# ==============================

os.makedirs("uploads", exist_ok=True)

# ==============================
# HOME ROUTE
# ==============================

@app.get("/")
def home():

    return {
        "message": "Steel Defect Analyzer API Running Successfully"
    }

# ==============================
# PREDICTION FUNCTION
# ==============================

def predict_defect(img_path):

    # Load image
    img = image.load_img(
        img_path,
        target_size=(IMG_SIZE, IMG_SIZE)
    )

    # Convert to array
    img_array = image.img_to_array(img)

    # Normalize
    img_array = img_array / 255.0

    # Expand dimensions
    img_array = np.expand_dims(img_array, axis=0)

    # Prediction
    prediction = model.predict(img_array)

    predicted_class = class_names[np.argmax(prediction)]

    confidence = float(np.max(prediction) * 100)

    return {
        "prediction": predicted_class,
        "confidence": round(confidence, 2)
    }

# ==============================
# PREDICTION API
# ==============================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Save uploaded image
    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Predict defect
    result = predict_defect(file_path)

    return result