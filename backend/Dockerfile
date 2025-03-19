FROM python:3.9

# ✅ ติดตั้งไลบรารีระบบที่จำเป็นสำหรับ OpenCV และ TensorFlow
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0

# ✅ สร้าง user และใช้ user นี้แทน root
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# ✅ ตั้งค่า working directory
WORKDIR /app

# ✅ คัดลอก requirements.txt และติดตั้ง dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir --upgrade -r requirements.txt

# ✅ คัดลอกโค้ดทั้งหมด
COPY . .

# ✅ รัน FastAPI บนพอร์ต 7860 (จำกัด worker 1 ตัวเพื่อลด RAM)
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860", "--workers", "1"]
