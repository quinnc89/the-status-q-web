module.exports = {
  darkMode: ["class"],
  content: ["./index.html"],
  safelist: ["hidden","font-body","text-xs","text-red-400","text-gold","quote-row"],
  theme: { extend: {
    colors: {
      border: "hsl(var(--border))", gold: "hsl(var(--gold))", "navy-mid": "hsl(var(--navy-mid))", "navy-light": "hsl(var(--navy-light))", "blue-soft": "hsl(var(--blue-soft))", background: "hsl(var(--background))", foreground: "hsl(var(--foreground))",
      primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
      muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
      accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
    },
    fontFamily: { display: ["Libre Caslon Display","Georgia","serif"], body: ["DM Sans","system-ui","sans-serif"], mono: ["DM Sans","system-ui","sans-serif"], accent: ["Libre Caslon Text","Georgia","serif"] },
  } },
};
