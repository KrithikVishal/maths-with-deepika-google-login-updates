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
        blueDeep: "#183A8F",
        navy: "#102A56",
        coral: "#FF6B5F",
        gold: "#FFD166",
        beige: "#FFF8EC",
        babyBlue: "#EAF3FF",
        mint: "#CFF3E2",
        lightPeach: "#FFE8DD",
        softPeach: "#FFF0E8",
        borderSoft: "#D8E2F3",
        alert: "#FF6B5F",
        ink: "#102A56",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 42, 86, 0.08)",
      },
      borderRadius: {
        soft: "1.75rem",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "800",
      },
    },
  },
  plugins: [],
};

export default config;
