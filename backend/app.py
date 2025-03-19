import os
import tensorflow as tf
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import uvicorn
from functools import lru_cache
from tensorflow.keras.applications.efficientnet import preprocess_input

# ✅ ปิด GPU เพื่อป้องกันปัญหาบน Hugging Face
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
tf.config.set_visible_devices([], 'GPU')

# ✅ สร้าง FastAPI App
app = FastAPI(
    title="DeepEye API",
    description="API for DR Classification",
    docs_url="/docs",
    redoc_url="/redoc",
)

print("✅ API Started on Hugging Face Spaces!")

# ✅ ตั้งค่า CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Debug เช็ก API ที่โหลด
@app.get("/debug-endpoints")
def debug_endpoints():
    return {"endpoints": [route.path for route in app.routes]}

# ✅ API Health Check
@app.get("/")
def home():
    return {"message": "🔥 FastAPI Backend is running on Hugging Face Spaces!"}

@app.get("/ping")
def ping():
    return {"status": "success", "message": "✅ API is live!"}

# ✅ โหลดโมเดลแบบ Lazy Loading
model_path = os.path.join("EfficientNetB0_AdamW_freeze100__lr0_00001_1024512_tanh_RGB.keras")

@lru_cache()
def load_model():
    if os.path.exists(model_path):
        print(f"✅ พบไฟล์โมเดลที่: {model_path}")
        return tf.keras.models.load_model(model_path)
    print(f"❌ ไม่พบไฟล์โมเดลที่: {model_path}")
    return None

# ✅ ฟังก์ชันปรับ Contrast ของภาพโดยใช้ CLAHE (RGB)
def apply_clahe_rgb(image):
    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    r, g, b = cv2.split(rgb_img)
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(12, 12))
    r_clahe = clahe.apply(r)
    g_clahe = clahe.apply(g)
    b_clahe = clahe.apply(b)
    return cv2.merge((r_clahe, g_clahe, b_clahe))

# ✅ ฟังก์ชันพรีโพรเซสซิงภาพ
def preprocess_image(image):
    image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)
    image = apply_clahe_rgb(image)
    image = image.astype("float32") / 255.0
    return np.expand_dims(preprocess_input(image * 255.0), axis=0)

# ✅ ระดับของ DR และคำอธิบาย
CLASS_LABELS = {
    0: {"label": "0_No_DR", "description": "ไม่พบความผิดปกติ", "level": 0},
    1: {"label": "1_Mild", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับเล็กน้อย", "level": 1},
    2: {"label": "2_Moderate", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับปานกลาง", "level": 2},
    3: {"label": "3_Severe", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับรุนแรง", "level": 3},
    4: {"label": "4_Proliferative_DR", "description": "ภาวะเบาหวานขึ้นจอประสาทตาขั้นรุนแรงมาก", "level": 4},
}

# ✅ ฟังก์ชันจัดรูปแบบค่า Softmax Output ให้เป็นข้อความอ่านง่าย
def format_output(predictions, predicted_class):
    output_text = "\n📊 ค่าเอาต์พุตของโมเดล:\n"
    for i, prob in enumerate(predictions[0]):  # ดึงค่าออกจาก batch
        output_text += f"คลาส {i} ({CLASS_LABELS[i]['label']}) → {prob:.6f} (≈ {prob*100:.2f}%)"
        if i == predicted_class:
            output_text += " ✅ (โมเดลเลือกคลาสนี้)"
        output_text += "\n"
    return output_text

# ✅ API วิเคราะห์ภาพ
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    print("✅ API /analyze ถูกเรียกแล้ว!")  # ✅ DEBUG LOG
    model = load_model()  # ✅ โหลดโมเดลถ้ายังไม่ได้โหลด

    if model is None:
        return {"error": "❌ โมเดลโหลดไม่สำเร็จ หรือโมเดลไม่มีอยู่จริง"}

    try:
        # ✅ โหลดภาพจาก Bytes
        img = Image.open(io.BytesIO(await file.read())).convert("RGB")
        img_cv = np.array(img)[:, :, ::-1]  # ✅ แปลง RGB → BGR

        # ✅ พรีโพรเซสภาพ
        processed_img = preprocess_image(img_cv)

        # ✅ ทำการพยากรณ์ด้วยโมเดล
        predictions = model.predict(processed_img)
        predicted_class = int(np.argmax(predictions))  
        confidence = float(np.max(predictions))  
        predicted_info = CLASS_LABELS[predicted_class]

        print(format_output(predictions, predicted_class))  # ✅ ใช้ฟังก์ชัน format_output()
        
        return {
            "label": predicted_info["label"],
            "confidence": confidence,
            "description": predicted_info["description"],
            "level": predicted_info["level"]
        }

    except Exception as e:
        return {"error": str(e)}

# ✅ รัน FastAPI โดยใช้ Uvicorn
if __name__ == "__main__":
    print("🚀 Starting Uvicorn Server...")
    uvicorn.run(app, host="0.0.0.0", port=7860, log_level="debug")