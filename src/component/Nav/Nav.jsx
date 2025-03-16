import { useState } from "react";
import { Link } from "react-router-dom";
import { List, X } from "phosphor-react"; // ไอคอน Hamburger และ Close

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // สร้าง State เปิด/ปิดเมนู

  return (
    <>
      {/* Navbar Bar */}
      <div className="navbar bg-base-100 sticky top-0 left-0 w-full z-50 shadow-md font-kanit">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            <img src="/LOGO.svg" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Hamburger Button (เฉพาะ Mobile) */}
        <div className="flex-none md:hidden font-kanit">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-square btn-ghost "
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* ✅ เมนูแฮมเบอร์เกอร์ พร้อมพื้นหลังเบลอ */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* ✅ เมนูหลัก */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ปุ่มปิดเมนู */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          <X size={24} />
        </button>

        {/* เมนูรายการ */}
        <ul className="flex flex-col mt-16 p-6 space-y-4 font-kanit">
          <li>
            <Link
              to="/"
              className="text-lg hover:text-primary focus:text-primary"
              onClick={() => setIsOpen(false)}
            >
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link
              to="/steps"
              className="text-lg hover:text-primary focus:text-primary"
              onClick={() => setIsOpen(false)}
            >
              ขั้นตอน
            </Link>
          </li>
          <li>
            <Link
              to="/more-info"
              className="text-lg hover:text-primary focus:text-primary"
              onClick={() => setIsOpen(false)}
            >
              ข้อมูลเพิ่มเติม
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
