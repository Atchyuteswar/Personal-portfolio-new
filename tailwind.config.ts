import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#FAF7F2",
          warm: "#F3EFE6",
          card: "#FFFFFF",
          border: "#E4DEC9",
        },
        obsidian: {
          DEFAULT: "#0D0F12",
          elevated: "#15191E",
          card: "#181C22",
          border: "#262C36",
        },
        crimson: {
          DEFAULT: "#9E2A2B",
          light: "#C84B31",
          muted: "#F9EAE8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
