import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: "#101820",
          900: "#0A1015",
          800: "#16212A",
          700: "#22313C",
          600: "#334550",
        },
        technical: "#F0F3F5",
        amber: {
          DEFAULT: "#F5A623",
          300: "#F9C46B",
          400: "#F7B84B",
          500: "#F5A623",
          600: "#D88E0F",
          700: "#9A6206",
        },
        electric: {
          DEFAULT: "#20B8B2",
          600: "#15928D",
          700: "#0F7C78",
        },
        mist: "#D8E0E5",
        danger: "#B84033",
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xs: "2px",
        sm: "3px",
      },
      transitionTimingFunction: {
        precise: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
