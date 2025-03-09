/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'Noto Sans Thai', 'sans-serif'],
      },
      colors: {
        orange: {
          light: '#FFB74D',  // สีส้มอ่อน
          DEFAULT: '#FF9800', // สีส้มหลัก
          dark: '#E65100',   // สีส้มเข้ม
        },
        purple: {
          light: '#D8B4FE',  // สีม่วงอ่อน
          DEFAULT: '#A855F7', // สีม่วงหลัก
          dark: '#6B21A8',   // สีม่วงเข้ม
        },
      },
    },
  },


  plugins: [require('daisyui')],
}

