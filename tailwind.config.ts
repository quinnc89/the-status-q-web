import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: "#0D1117",
        surface: "#161B24",
        raised: "#1E2530",
        gold: "#C9A84C",
        "gold-light": "#E8D48B",
        ivory: "#F5F0E8",
        silver: "#A0A0AB",
        slate: "#6B7280",
        ash: "#4A4F5C",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
