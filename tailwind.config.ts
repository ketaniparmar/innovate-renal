module.exports = {
  theme: {
    extend: {
      colors: {
        background: "#010810", // Absolute base
        surface: "#0A1118",   // Slightly elevated
        gold: {
          DEFAULT: "#D4AF37",
          glow: "rgba(212, 175, 55, 0.15)", // Soft glow
        },
        blue: {
          DEFAULT: "#3B82F6",
          glow: "rgba(59, 130, 246, 0.15)",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.05)",
        }
      },
      fontFamily: {
        // 'Inter' for numbers/data, 'Plus Jakarta Sans' for premium headings
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'], 
        mono: ['"JetBrains Mono"', 'monospace'], // For AI code/data blocks
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.2)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.2)',
        'glass-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }
    }
  }
}