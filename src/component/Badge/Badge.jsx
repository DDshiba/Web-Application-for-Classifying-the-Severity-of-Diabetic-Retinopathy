const Badge = ({ level }) => {
    const levelColors = {
      0: "badge-success font-bold",   // ✅ สีเขียว (No DR)
      1: "badge-warning font-bold",   // ✅ สีเหลือง (Mild)
      2: "badge-orange bg-orange text-white font-bold",  // ✅ สีส้ม (Moderate)
      3: "badge-error font-bold",     // ✅ สีแดง (Severe)
      4: "badge-purple bg-purple text-white font-bold", // ✅ สีม่วง (Proliferative DR)
    };
  
    return (
      <span className={`badge ${levelColors[level] || "badge-neutral"} text-white text-xs`}>
        ระดับ {level}
      </span>
    );
  };
  export default Badge;
  