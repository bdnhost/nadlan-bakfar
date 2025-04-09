import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-rubik)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2A6B4F", // ירוק כהה יותר לניגודיות טובה
          foreground: "#FFFFFF",
          hover: "#1E5A3E", // גרסה כהה יותר לhover
          light: "#3D8C6F", // גרסה בהירה יותר
        },
        secondary: {
          DEFAULT: "#D9B44A", // צהוב-זהב עשיר יותר
          foreground: "#1A1A1A", // טקסט כהה על רקע בהיר
          hover: "#C9A43A", // גרסה כהה יותר לhover
          light: "#E9C45A", // גרסה בהירה יותר
        },
        highlight: {
          DEFAULT: "#F2C94C", // צהוב בהיר יותר
          foreground: "#1A1A1A", // טקסט כהה על רקע צהוב
          hover: "#E2B93C", // גרסה כהה יותר לhover
        },
        background: {
          DEFAULT: "#F8F9FA", // לבן-אפרפר עדין
          darker: "#E9ECEF", // גרסה מעט כהה יותר לאזורים מסוימים
        },
        text: {
          DEFAULT: "#212529", // כמעט שחור לניגודיות מקסימלית
          light: "#495057", // גרסה בהירה יותר לטקסט משני
        },
        detail: {
          DEFAULT: "#6C757D", // אפור בינוני לאלמנטים משניים
          light: "#ADB5BD", // גרסה בהירה יותר
          dark: "#495057", // גרסה כהה יותר
        },
        destructive: {
          DEFAULT: "#E63946",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E9ECEF", // גרסה של background.darker
          foreground: "#495057", // גרסה של text.light
        },
        accent: {
          DEFAULT: "#D9B44A", // זהה לsecondary
          foreground: "#1A1A1A", // טקסט כהה
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529", // טקסט כהה
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529", // טקסט כהה
        },
        success: {
          DEFAULT: "#38A169",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#ED8936",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#3182CE",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "slide-in-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-out-bottom": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.3s ease-out",
        "slide-out-bottom": "slide-out-bottom 0.3s ease-out",
        "pulse-slow": "pulse-slow 2s infinite",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05)",
        elevated: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      // הוספת תמיכה בכיוון RTL
      textAlign: {
        start: "start",
        end: "end",
      },
      margin: {
        start: "margin-inline-start",
        end: "margin-inline-end",
      },
      padding: {
        start: "padding-inline-start",
        end: "padding-inline-end",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // הוספת פלאגין לתמיכה ב-RTL
    ({ addUtilities }) => {
      const newUtilities = {
        ".flip-x": {
          transform: "scaleX(-1)",
        },
        ".rtl-rotate-180": {
          transform: "rotate(180deg)",
        },
        ".text-right-if-rtl": {
          "text-align": "right",
        },
        ".text-left-if-rtl": {
          "text-align": "left",
        },
        ".glass-effect": {
          background: "rgba(255, 255, 255, 0.25)",
          "backdrop-filter": "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        },
        ".glass-effect-dark": {
          background: "rgba(0, 0, 0, 0.25)",
          "backdrop-filter": "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config

