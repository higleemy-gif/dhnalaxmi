import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Dhana Laxmi Construction logo
        navy: {
          DEFAULT: "#03254D",
          50: "#eef2f7",
          100: "#d5dfea",
          200: "#aabfd6",
          300: "#7194b8",
          400: "#3f6491",
          500: "#1d4472",
          600: "#0d3560",
          700: "#03254D",
          800: "#021d3d",
          900: "#01152c",
        },
        gold: {
          DEFAULT: "#CE811C",
          50: "#fbf4e7",
          100: "#f4e2c1",
          200: "#e9c583",
          300: "#dea849",
          400: "#d69430",
          500: "#CE811C",
          600: "#a86616",
          700: "#824f12",
          800: "#5d380d",
          900: "#3a2308",
        },
        ink: "#172033",
        muted: "#667085",
        line: "#E5E7EB",
        surface: "#F7F8FA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)",
        "card-hover": "0 8px 30px rgba(3,37,77,0.14)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
