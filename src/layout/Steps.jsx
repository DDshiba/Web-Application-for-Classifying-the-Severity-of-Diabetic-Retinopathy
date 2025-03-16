import UploadIcon from "../assets/upload.svg";
import AnalysisIcon from "../assets/analysis.svg";
import ResultIcon from "../assets/result.svg";

function Steps() {
  return (
    <div className="hero bg-white min-h-screen flex items-center justify-center font-kanit">
      <div className="max-w-[1110px] w-full text-center mb-20 mt-20 ml-10 mr-10">
        <h1 className="text-5xl font-bold  mb-20 text-center">
          ขั้นตอนการทำงาน
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <img src={UploadIcon} alt="Step 1" className="w-64 h-64 mb-4" />
            <h2 className="text-xl font-bold mb-2">1. อัปโหลดภาพถ่าย</h2>
            <p className="text-gray-600">
              อัปโหลดภาพถ่ายจอประสาทตา
              <br />
              เพื่อวิเคราะห์ระดับความรุนแรงของ
              <br />
              โรคเบาหวานขึ้นตา
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <img src={AnalysisIcon} alt="Step 2" className="w-64 h-64 mb-4" />
            <h2 className="text-xl font-bold mb-2">2. วิเคราะห์</h2>
            <p className="text-gray-600">กดปุ่มวิเคราะห์เพื่อทำการวิเคราะห์<br />และรอผลสักครู่</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <img src={ResultIcon} alt="Step 3" className="w-64 h-64 mb-4" />
            <h2 className="text-xl font-bold mb-2">3. ผลลัพธ์</h2>
            <p className="text-gray-600">
              ผลวิเคราะห์บอกภาวะระดับความรุนแรง
              <br />
              ของโรคเบาหวานขึ้นตา
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
