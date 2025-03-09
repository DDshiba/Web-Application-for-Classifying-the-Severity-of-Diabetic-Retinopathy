import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Badge from "../component/Badge/Badge"; // ✅ นำเข้า Badge Component


function Process() {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(location.state?.image || null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log("📥 Debug จาก Backend:", analysisResult);

  if (!image) {
    return (
      <div className="hero bg-white min-h-screen flex flex-col items-center justify-center text-center">
        <img
          src={process.env.PUBLIC_URL + "/bug-fixing-animate.svg"}
          alt="No image"
          className="w-64 mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">ไม่มีภาพที่อัปโหลด</h1>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-4 text-white"
        >
          กลับไปหน้าอัปโหลด
        </button>
      </div>
    );
  }

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("เกิดข้อผิดพลาดในการประมวลผล");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(event.target.files[0]);
      setAnalysisResult(null);
    }
  };

  return (
    <div className="hero bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">ผลการวิเคราะห์ภาพ</h1>
      {/* ✅ แสดงภาพที่อัปโหลด */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          className="w-full max-w-[300px] rounded-lg shadow-lg mb-6 px-4"
        />
      )}
      {/* ✅ ปุ่มวิเคราะห์ และเลือกภาพใหม่ */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handleAnalyze}
          className="btn btn-primary text-white"
          disabled={loading || !image}
        >
          {loading ? "กำลังวิเคราะห์..." : "วิเคราะห์"}
        </button>

        <label
          htmlFor="file-upload"
          className="btn bg-neutral-content cursor-pointer"
        >
          เปลี่ยนรูป
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {/* ✅ แสดงผลลัพธ์การวิเคราะห์ */}
      {analysisResult && (

        <div className="w-full max-w-2xl bg-base-200 rounded-lg p-5 text-neutral">
          <div className="flex flex-wrap items-center justify-between">
            {/* ✅ ส่วนของผลลัพธ์ */}
            <div className="flex items-center gap-2 ">
              <h2 className="text-xl font-bold">ผลวิเคราะห์ :</h2>
              <span className=" text-xl font-bold mr-3">{analysisResult.label}</span>
              {/* ✅ ใช้ Component Badge */}
              <Badge level={analysisResult.level} />
            </div>

            {/* ✅ ส่วนของความมั่นใจ 
            <p className="text-green-600 font-bold text-right md:text-left">
              ความมั่นใจ: {Math.round(analysisResult.confidence * 100)}%
            </p>*/}
          </div>

          {/* ✅ คำอธิบายระดับ */}
          <p className="text-gray-700 text-sm mt-2">
            {analysisResult.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default Process;
