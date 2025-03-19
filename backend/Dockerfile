FROM python:3.9

# ✅ ติดตั้งไลบรารีที่จำเป็น
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0

# ✅ ตั้งค่า user เพื่อความปลอดภัย
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# ✅ คัดลอก requirements.txt และติดตั้ง dependencies
COPY requirements.txt . 
RUN pip install --upgrade pip && pip install --no-cache-dir --upgrade -r requirements.txt

# ✅ คัดลอกโค้ดทั้งหมด
COPY . .

# ✅ รัน Uvicorn ให้รองรับ Docker
CMD ["python3", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
