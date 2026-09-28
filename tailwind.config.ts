import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0B0B0A",
        surface: "#111110",
        ink: "#F1F0EB",
        muted: "#A5A39D",
        line: "#292825",
        accent: "#C8FF4D",
        investigate: "#D9A15B",
        system: "#7FA8D9",
        protect: "#4FB8A8",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1280px",
      },
      fontSize: {
        "display-lg": ["96px", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-md": ["64px", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "display-mobile": ["44px", { lineHeight: "1.04", letterSpacing: "-0.01em" }],
        meta: ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      transitionTimingFunction: {
        engineered: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
