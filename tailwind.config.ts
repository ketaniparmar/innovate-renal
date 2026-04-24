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
        sovereign: {
          navy: {
            DEFAULT: '#0A0F1C', // Authority Base (Backgrounds)
            light: '#141D30',   // Raised Surfaces / Cards
            border: '#1E2A45',  // Subtle dividers
          },
          teal: {
            DEFAULT: '#00A8A8', // Intelligence Layer (AI Signals, Active States)
            muted: 'rgba(0, 168, 168, 0.1)',
          },
          gold: {
            DEFAULT: '#C6A85A', // Web fallback for Pantone 871 C (Wealth, Exit Value)
            muted: 'rgba(198, 168, 90, 0.1)',
          },
          red: {
            DEFAULT: '#A6192E', // Execution Accent (Micro-usage only: Warnings, Errors)
            muted: 'rgba(166, 25, 46, 0.1)',
          },
          neutral: {
            white: '#F5F5F2',   // Warm White for primary text
            gray: '#8A94A6',    // Subtitles and disabled states
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;