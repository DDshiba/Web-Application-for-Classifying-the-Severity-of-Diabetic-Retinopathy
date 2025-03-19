import os
import tensorflow as tf
import datetime
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
from tensorflow.keras.applications.efficientnet import preprocess_input

# ✅ ปิด GPU เพื่อให้รันได้บน CPU
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
tf.config.set_visible_devices([], 'GPU')

# ✅ สร้าง FastAPI App
app = FastAPI()

# ✅ ตั้งค่า CORS (อนุญาตทุกโดเมน)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Endpoint เช็กว่า API ทำงานได้
@app.get("/")
def home():
    return {"message": "🔥 FastAPI Backend is running on Hugging Face Spaces!"}

# ✅ กำหนดพาธของโมเดล
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
MODEL_PATH = os.path.join(BASE_DIR, "model", "EfficientNetB0_AdamW_freeze100__lr0_00001_1024512_tanh_RGB.keras")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")  
PROCESSED_FOLDER = os.path.join(BASE_DIR, "processed")  
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# ✅ โหลดโมเดลแบบ Lazy Loading
model = None
def load_model():
    global model
    if model is None and os.path.exists(MODEL_PATH):
        print(f"✅ พบไฟล์โมเดลที่: {MODEL_PATH}")
        try:
            model = tf.keras.models.load_model(MODEL_PATH)
            print("✅ โมเดลโหลดสำเร็จ!")
        except Exception as e:
            print(f"❌ โมเดลโหลดไม่สำเร็จ: {e}")

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
def preprocess_image(image, save_path=None):
    image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)
    image = apply_clahe_rgb(image)

    if save_path:
        cv2.imwrite(save_path, cv2.cvtColor(image, cv2.COLOR_RGB2BGR))

    image = image.astype("float32") / 255.0
    image = preprocess_input(image * 255.0)
    return np.expand_dims(image, axis=0)

# ✅ ระดับของ DR และคำอธิบาย
CLASS_LABELS = {
    0: {"label": "0_No_DR", "description": "ไม่พบความผิดปกติ", "level": 0},
    1: {"label": "1_Mild", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับเล็กน้อย", "level": 1},
    2: {"label": "2_Moderate", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับปานกลาง", "level": 2},
    3: {"label": "3_Severe", "description": "ภาวะเบาหวานขึ้นจอประสาทตาระดับรุนแรง", "level": 3},
    4: {"label": "4_Proliferative_DR", "description": "ภาวะเบาหวานขึ้นจอประสาทตาขั้นรุนแรงมาก", "level": 4},
}

# ✅ API รับภาพจาก React และส่งผลวิเคราะห์กลับ
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    load_model()  # โหลดโมเดลเมื่อมีการเรียก API

    if model is None:
        return {"error": "❌ โมเดลโหลดไม่สำเร็จ หรือโมเดลไม่มีอยู่จริง"}

    try:
        # ✅ โหลดภาพจาก Bytes
        img = Image.open(io.BytesIO(await file.read())).convert("RGB")
        img_cv = np.array(img)[:, :, ::-1]  # ✅ แปลง RGB → BGR

        # ✅ บันทึกภาพต้นฉบับ
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        original_img_path = os.path.join(UPLOAD_FOLDER, f"uploaded_{timestamp}.png")
        img.save(original_img_path)

        # ✅ กำหนดพาธสำหรับบันทึกภาพที่ผ่าน CLAHE
        processed_img_path = os.path.join(PROCESSED_FOLDER, f"processed_{timestamp}.png")

        # ✅ พรีโพรเซสภาพ พร้อมบันทึก
        processed_img = preprocess_image(img_cv, save_path=processed_img_path)

        # ✅ ทำการพยากรณ์ด้วยโมเดล
        predictions = model.predict(processed_img)
        predicted_class = int(np.argmax(predictions))  
        confidence = float(np.max(predictions))  
        predicted_info = CLASS_LABELS[predicted_class]

        return {
            "label": predicted_info["label"],
            "confidence": confidence,
            "description": predicted_info["description"],
            "level": predicted_info["level"],
            "input_shape": str(processed_img.shape),
            "output_shape": str(predictions.shape),
            "original_size": img.size,
            "original_image": original_img_path,
            "processed_image": processed_img_path
        }

    except Exception as e:
        return {"error": str(e)}



# ✅ รัน Backend
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))  # เปลี่ยนเป็นพอร์ต 7860 สำหรับ Hugging Face
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)

