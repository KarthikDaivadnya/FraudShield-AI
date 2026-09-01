/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ledger: {
          950: "#080D17",
          900: "#0C1220",
          850: "#101828",
          800: "#131C2E",
          700: "#1A2438",
          600: "#233149",
          500: "#324361",
          400: "#5A6E8F",
          300: "#8593AC",
          200: "#B7C1D6",
          100: "#E7ECF5",
        },
        signal: {
          clear: "#2FD8AA",
          clearDim: "#1A5C4C",
          watch: "#F0AE3C",
          watchDim: "#5C481A",
          alert: "#F2542D",
          alertDim: "#5C271A",
        },
        wire: "#5EA1FF",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "28px 28px",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
