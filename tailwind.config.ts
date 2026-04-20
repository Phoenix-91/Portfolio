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
        background: "#26282e",
        "bg-secondary": "#2e3038",
        "bg-card": "rgba(255,255,255,0.04)",
        accent: {
          blue: "#4f8ef7",
          purple: "#7c3aed",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #4f8ef7, #7c3aed)",
        "gradient-text":
          "linear-gradient(90deg, #22d3ee 0%, #4f8ef7 50%, #7c3aed 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(79,142,247,0.3)",
        "glow-purple": "0 0 30px rgba(124,58,237,0.3)",
        "glow-cyan": "0 0 30px rgba(34,211,238,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
