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
        // --- Added Native Background/Foreground ---
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        sovereign: {
          navy: {
            DEFAULT: '#0A0F1C', // Authority Base
            light: 'var(--color-sovereign-navy-light)',   // Mapped to CSS var
            border: 'var(--color-sovereign-navy-border)',  // Mapped to CSS var
          },
          teal: {
            DEFAULT: 'var(--color-sovereign-teal)', // Mapped to CSS var
            muted: 'rgba(0, 168, 168, 0.1)',
          },
          gold: {
            DEFAULT: 'var(--color-sovereign-gold)', // Mapped to CSS var
            muted: 'rgba(198, 168, 90, 0.1)',
          },
          red: {
            DEFAULT: '#A6192E', 
            muted: 'rgba(166, 25, 46, 0.1)',
          },
          neutral: {
            white: '#F5F5F2',   
            gray: '#8A94A6',    
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