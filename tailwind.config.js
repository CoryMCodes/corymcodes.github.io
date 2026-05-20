module.exports = {
  content: [
    "./*.md",
    "./*.html",
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./devlog/**/*.md",
    "./projects/**/*.md"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0B1020",
        surface: "#111827",
        elevated: "#1F2937",
        line: "#374151",
        accent: "#7C3AED",
        accentHover: "#8B5CF6",
        textPrimary: "#F9FAFB",
        textSecondary: "#9CA3AF"
      },
      fontFamily: {
        sans: ["Inter", "Geist", "IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Berkeley Mono", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124, 58, 237, 0.18), 0 20px 80px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
}
