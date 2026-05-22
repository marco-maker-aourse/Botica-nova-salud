/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d8ecff",
          500: "#0f6cbd",
          600: "#0c5da6",
          700: "#08497f",
        },
        accent: {
          100: "#dff6eb",
          500: "#2f9e73",
          600: "#257d5b",
        },
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 108, 189, 0.12)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(15, 108, 189, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(47, 158, 115, 0.16), transparent 32%)",
      },
    },
  },
  plugins: [],
};
