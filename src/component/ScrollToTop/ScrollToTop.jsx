import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // เลื่อนกลับไปบนสุดของหน้า
  }, [pathname]); // ทำงานทุกครั้งที่ path เปลี่ยน

  return null;
}

export default ScrollToTop;
