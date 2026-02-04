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
        surface: "#01261C",
        "surface-elevated": "#014034",
        "surface-border": "#BF9F63",
        text: "#F2DEA0",
        "text-muted": "#BF9F63",
        accent: "#f8eecf",
        "accent-dim": "#3d8a6a",
        "accent-warm": "#BF9F63",
      },
      fontFamily: {
        sans: ["Arvo", "Georgia", "serif"],
        display: ["Manrope", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-stage":
          "linear-gradient(180deg, transparent 0%, rgba(1,64,52,0.6) 50%, rgba(1,64,52,0.95) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
