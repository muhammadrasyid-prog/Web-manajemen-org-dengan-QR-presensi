import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary": "#004335",
        "on-primary-container": "#8bd2bb",
        "on-secondary-container": "#506a60",
        "on-error-container": "#93000a",
        "on-background": "#191c1b",
        "on-secondary-fixed-variant": "#334c43",
        "secondary-fixed-dim": "#b1cdc1",
        "on-secondary": "#ffffff",
        "tertiary-fixed-dim": "#ffb4a7",
        "on-error": "#ffffff",
        "secondary": "#4a645b",
        "surface-bright": "#f7faf7",
        "surface-container-high": "#e6e9e6",
        "primary-fixed": "#a9f1d9",
        "tertiary-fixed": "#ffdad4",
        "background": "#f7faf7",
        "secondary-fixed": "#cce9dd",
        "on-secondary-fixed": "#062019",
        "surface-container": "#ecefeb",
        "tertiary-container": "#7d3f35",
        "inverse-on-surface": "#eff1ee",
        "surface": "#f7faf7",
        "outline-variant": "#bfc9c3",
        "outline": "#6f7975",
        "on-primary-fixed-variant": "#005140",
        "on-surface": "#191c1b",
        "inverse-primary": "#8ed4bd",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#002018",
        "inverse-surface": "#2d312f",
        "on-primary": "#ffffff",
        "on-surface-variant": "#3f4945",
        "error": "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "primary-fixed-dim": "#8ed4bd",
        "on-tertiary-container": "#ffb0a3",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e0e3e0",
        "tertiary": "#612920",
        "surface-tint": "#206a57",
        "secondary-container": "#cce9dd",
        "surface-dim": "#d8dbd8",
        "surface-container-low": "#f2f4f1",
        "primary-container": "#0a5c4a",
        "surface-variant": "#e0e3e0",
        "on-tertiary-fixed-variant": "#71352c",
        "on-tertiary-fixed": "#390b06"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "fontFamily": {
        "headline": ["var(--font-newsreader)", "serif"],
        "body": ["var(--font-manrope)", "sans-serif"],
        "label": ["var(--font-manrope)", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
