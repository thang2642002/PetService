/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          // Cấu hình độ rộng tối đa ở các điểm dừng
          sm: "100%",
          md: "100%",
          lg: "1024px", // Căng ra đến 1024px ở màn hình lớn
          xl: "1280px", // Căng ra đến 1280px ở màn hình rất lớn
          "2xl": "1536px", // Căng ra đến 1536px ở màn hình cực lớn
        },
      },
    },
  },
  plugins: [],
};
