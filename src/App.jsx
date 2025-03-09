import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer/Footer";
import Nav from "./component/Nav/Nav";
import Home from "./layout/Home";
import Steps from "./layout/Steps";
import MoreInfo from "./layout/MoreInfo";
import Process from "./layout/Process"; // เปลี่ยนชื่อไฟล์ที่นำเข้า
import ScrollToTop from "./component/ScrollToTop/ScrollToTop"; // นำเข้า ScrollToTop

function App() {
  return (
    <>
      <Router>
        <ScrollToTop /> {/* ใช้ที่นี่ */}
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/steps" element={<Steps />} />
          <Route path="/more-info" element={<MoreInfo />} />
          <Route path="/process" element={<Process />} />{" "}
          {/* อัปเดตชื่อ Route */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
