import { useState } from "react";
import { Link } from "react-router-dom";
import { List, X } from "phosphor-react"; // ไอคอน Hamburger และ Close

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // สร้าง State เปิด/ปิดเมนู

  return (
    <div className="navbar bg-white sticky top-0 left-0 w-full z-50 shadow-md font-kanit">
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
          className="btn btn-square btn-ghost"
        >
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* ✅ เมนูหลัก (เงาเฉพาะในมือถือ) */}
      <div
        className={`absolute top-16 left-0 w-full bg-white md:static md:flex md:items-center md:w-auto transition-all duration-200 ease-in-out 
          ${isOpen ? "block shadow-lg" : "hidden"} md:shadow-none`}
      >
        <ul className="menu menu-vertical md:menu-horizontal px-4 md:px-1 font-kanit border-none shadow-none bg-transparent">
          <li>
            <Link
              to="/"
              className="hover:text-primary focus:text-primary font-kanit"
              onClick={() => setIsOpen(false)}
            >
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link
              to="/steps"
              className="hover:text-primary focus:text-primary font-kanit"
              onClick={() => setIsOpen(false)}
            >
              ขั้นตอน
            </Link>
          </li>
          <li>
            <Link
              to="/more-info"
              className="hover:text-primary focus:text-primary font-kanit"
              onClick={() => setIsOpen(false)}
            >
              ข้อมูลเพิ่มเติม
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
