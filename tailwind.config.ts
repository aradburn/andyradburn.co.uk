import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0f1410",
        "surface-elevated": "#1a2118",
        "surface-border": "#2a3328",
        text: "#f5f0e6",
        "text-muted": "#a8a098",
        accent: "#c9a227",
        "accent-dim": "#8b7320",
        "accent-warm": "#b87333",
        "accent-teal": "#2d6a6a",
      },
      fontFamily: {
        sans: ["Arvo", "Georgia", "serif"],
        display: ["Manrope", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-stage":
          "linear-gradient(180deg, transparent 0%, rgba(15,20,16,0.6) 50%, rgba(15,20,16,0.95) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
