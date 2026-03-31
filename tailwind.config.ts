import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#eb6262",
          dark: "#be4b4b",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
