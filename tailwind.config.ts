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
        background: "var(--background)",
        foreground: "var(--foreground)",
        discover: "#2997FF",
        design: "#5AC8FA",
        money: "#FFD60A",
        brand: "#BF5AF2",
        sell: "#FF453A",
        launch: "#30D158",
        g: {
          50: "#FAFAFA",
          100: "#F5F5F7",
          200: "#E8E8ED",
          400: "#86868B",
          600: "#6E6E73",
          800: "#1D1D1F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      animation: {
        "orb-spin": "orbSpin 12s linear infinite",
        "scroll-bob": "scrollBob 1.5s ease-in-out infinite",
      },
      keyframes: {
        orbSpin: {
          to: { transform: "rotate(360deg)" },
        },
        scrollBob: {
          "0%, 100%": { opacity: "1", transform: "translateX(-50%) translateY(0)" },
          "50%": { opacity: "0.3", transform: "translateX(-50%) translateY(8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
