import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#030712",
        "dark-surface": "#0d1117",
        "dark-card": "#111827",
        "neon-cyan": "#00f5ff",
        "neon-purple": "#bf00ff",
        "neon-pink": "#ff007a",
        "neon-green": "#00ff88",
      },
    },
  },
  plugins: [],
};
export default config;
