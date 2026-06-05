import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050506",
        coal: "#101114",
        ash: "#b7b0a6",
        bone: "#f1ece2",
        ember: "#d88a3d",
        wine: "#8f2e35",
        rain: "#91a7b4"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Newsreader", "Georgia", "ui-serif", "serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(216, 138, 61, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
