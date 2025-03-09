import os
import datetime
import cv2
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
from tensorflow.keras.applications.efficientnet import preprocess_input

# ✅ สร้าง Flask App
app = Flask(__name__)
CORS(app)

# ✅ กำหนดพาธของโมเดล
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
MODEL_PATH = os.path.join(BASE_DIR, "model", "EfficientNetB0_AdamW_freeze100__lr0_00001_1024512_tanh_RGB.keras")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")  
PROCESSED_FOLDER = os.path.join(BASE_DIR, "processed")  
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# ✅ โหลดโมเดล EfficientNetB0
model = None
if os.path.exists(MODEL_PATH):
    print(f"✅ พบไฟล์โมเดลที่: {MODEL_PATH}")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("✅ โมเดลโหลดสำเร็จ!")
    except Exception as e:
        print(f"❌ โมเดลโหลดไม่สำเร็จ: {e}")
else:
    print(f"❌ ไม่พบไฟล์โมเดลที่: {MODEL_PATH}")

# ✅ ฟังก์ชันปรับ Contrast ของภาพโดยใช้ CLAHE (RGB)
def apply_clahe_rgb(image):
    """
    ใช้ CLAHE กับช่องสี R, G, B ของภาพ RGB
    """
    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # แปลงจาก BGR → RGB
    r, g, b = cv2.split(rgb_img)  # แยกแต่ละช่องสี

    # ✅ ใช้ CLAHE กับแต่ละช่องสี
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(12, 12))
    r_clahe = clahe.apply(r)
    g_clahe = clahe.apply(g)
    b_clahe = clahe.apply(b)

    # ✅ รวมกลับเป็นภาพ RGB
    clahe_rgb_img = cv2.merge((r_clahe, g_clahe, b_clahe))
    return clahe_rgb_img

# ✅ ฟังก์ชันพรีโพรเซสซิงภาพ
def preprocess_image(image, save_path=None):
    """
    1. รีไซส์เป็น (224, 224)
    2. ใช้ CLAHE ปรับ Contrast
    3. บันทึกภาพก่อน Normalize
    4. Normalize แบบ EfficientNetB0 (ใช้ preprocess_input())
    """
    image = cv2.resize(image, (224, 224), interpolation=cv2.INTER_AREA)  # Resize
    image = apply_clahe_rgb(image)  # ใช้ CLAHE

    # ✅ บันทึกภาพก่อน Normalize (ถ้ามีพาธที่กำหนด)
    if save_path:
        cv2.imwrite(save_path, cv2.cvtColor(image, cv2.COLOR_RGB2BGR))

    image = image.astype("float32") / 255.0  # Normalize เป็น [0,1]
    image = preprocess_input(image * 255.0)  # ปรับให้เข้ากับโมเดล
    image = np.expand_dims(image, axis=0)  # เพิ่ม batch dimension

    return image

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
   
# ✅ API รับภาพจาก React และส่งผลวิเคราะห์กลับ
@app.route("/analyze", methods=["POST"])
def analyze():
    if model is None:
        return jsonify({"error": "❌ โมเดลโหลดไม่สำเร็จ หรือโมเดลไม่มีอยู่จริง"}), 500

    try:
        # ✅ รับไฟล์ภาพจาก React
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "❌ ไม่พบไฟล์ที่อัปโหลด"}), 400

        # ✅ โหลดภาพจาก Bytes
        img = Image.open(io.BytesIO(file.read())).convert("RGB")
        img_cv = np.array(img)[:, :, ::-1]  # ✅ แปลง RGB → BGR สำหรับ OpenCV

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

        # ✅ Debug Log ข้อมูลทั้งหมด
        print("\n🔍 DEBUG LOG")
        print(f"📥 ขนาดของภาพที่ได้รับ: {img.size}")
        print(f"💾 รูปต้นฉบับบันทึกที่: {original_img_path}") 
        print(f"🎨 รูปที่รีไซต์และปรับ Contrast แล้วบันทึกที่: {processed_img_path}") 
        print(f"🔄 ขนาดของอินพุตที่ใส่เข้าโมเดล: {processed_img.shape}")
        print(f"🔄 Min-Max ของพิกเซลก่อนเข้าโมเดล: {processed_img.min()} - {processed_img.max()}")
        print(f"📤 ขนาดของเอาต์พุตที่ออกจากโมเดล: {predictions.shape}")  # ✅ ควรเป็น (1, 5)
        print(format_output(predictions, predicted_class))  # ✅ ใช้ฟังก์ชัน format_output()
        print(f"✅ ผลลัพธ์ที่ส่งกลับไป: {{'label': {predicted_info['label']}, 'confidence': {confidence}}}")
        print(f"🔄 Min-Max ของพิกเซลก่อนเข้าโมเดล: {processed_img.min()} - {processed_img.max()}")
        print(f"🔍 Debug: label={predicted_info['label']}, level={predicted_info['level']}")

        # ✅ ส่งผลลัพธ์กลับไปให้ React
        response = {
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
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ รัน Backend
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
