import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Courier New", "monospace"],
      },
      colors: {
        atelier: {
          accent: "#991B1B",
          bg: "#FAFAF9",
          darkbg: "#0F0E0E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
