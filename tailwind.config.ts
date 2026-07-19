import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
        },
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1.5" }],
        "sm": ["0.875rem", { lineHeight: "1.5" }],
        "base": ["1rem", { lineHeight: "1.5" }],
        "lg": ["1.125rem", { lineHeight: "1.5" }],
        "xl": ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      animation: {
        "fade-in":      "fadeIn 0.5s ease-out forwards",
        "slide-up":     "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down":   "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" },                  to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      boxShadow: {
        "subtle": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "card": "0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 0 0 1px rgba(0,0,0,0.03), 0 8px 24px -4px rgba(0,0,0,0.08)",
        "dark-card": "0 0 0 1px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.2)",
        "dark-card-hover": "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -4px rgba(0,0,0,0.4)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
