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
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentHover: "rgb(var(--color-accent-hover) / <alpha-value>)",
        textPrimary: "rgb(var(--color-text-primary) / <alpha-value>)",
        textSecondary: "rgb(var(--color-text-secondary) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["Inter", "Geist", "IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Berkeley Mono", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "var(--shadow-glow)"
      }
    }
  },
  plugins: []
}
