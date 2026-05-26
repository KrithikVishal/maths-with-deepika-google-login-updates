import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blueDeep: "#1F3C88",
        coral: "#FF6F61",
        gold: "#FFC107",
        beige: "#FFF5E1",
        alert: "#C2292A",
        ink: "#26324A",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(31, 60, 136, 0.08)",
      },
      borderRadius: {
        soft: "1.25rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
