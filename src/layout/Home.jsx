import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "phosphor-react";

function Home() {
  const navigate = useNavigate(); // สำหรับเปลี่ยนเส้นทาง
  const [selectedFile, setSelectedFile] = useState(null); // เก็บข้อมูลไฟล์ที่เลือก

  // ฟังก์ชันสำหรับคลิกปุ่มเพื่อเปิด input file
  const handleUploadClick = () => {
    document.getElementById("fileUpload").click();
  };

  // ฟังก์ชันจัดการเมื่อเลือกไฟล์
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // เก็บไฟล์ใน state
      // เปลี่ยนไปยังหน้าที่แสดงผล พร้อมส่งข้อมูลไฟล์ไป
      navigate("/process", { state: { image: file } });
    }
  };

  return (
    <section id="main_layout">
      <div className="hero bg-white min-h-screen font-kanit">
        <div className="hero-content text-center">
          <div className="max-w-full">
            <h1 className="text-5xl font-bold ">อัปโหลดภาพถ่ายจอประสาทตา</h1>
            <p className="py-5 text-gray-600">
              กรุณาอัปโหลดภาพถ่ายจอประสาทตาเพื่อทำการจำแนกระดับความรุนแรง
              <br />
              *ข้อกำหนดของไฟล์ที่รองรับ (เช่น JPEG, PNG)
            </p>

            {/* Input File (ซ่อน) */}
            <input
              id="fileUpload"
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* ปุ่มอัปโหลด */}
            <button
              onClick={handleUploadClick}
              className="btn btn-primary text-white"
            >
              <Upload size={24} weight="fill" className="inline-block" />
              อัปโหลดภาพถ่าย
            </button>
          </div>
        </div>
      </div>
    </section>
    
  );
}

export default Home;
