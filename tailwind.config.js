const typographyPlugin = require('@tailwindcss/typography')
const typographyStyles = require('./typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [typographyPlugin],

  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-syne)', 'sans-serif'],
        // Aliases for backward compatibility
        syne: ['var(--font-syne)', 'sans-serif'],
        sans: ['var(--font-syne)', 'sans-serif'],
      },

      colors: {
        // Dynamic Theme Colors (runtime CSS vars set by src/lib/themes.js).
        // Channel vars (--theme-*-rgb) let `<alpha-value>` opacity modifiers work.
        theme: {
          bg: 'rgb(var(--theme-bg-rgb) / <alpha-value>)',
          text: 'rgb(var(--theme-text-rgb) / <alpha-value>)',
          card: 'rgb(var(--theme-card-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--theme-card-elevated-rgb) / <alpha-value>)',
          // Semantic tokens derived from the text channel.
          muted: 'rgb(var(--theme-text-rgb) / 0.6)',
          border: 'rgb(var(--theme-text-rgb) / 0.12)',
          accent: 'rgba(var(--theme-accent-rgb), <alpha-value>)',
        },
        // Aliases for backward compatibility (mapped to theme)
        dark: {
          bg: 'rgb(var(--theme-bg-rgb) / <alpha-value>)',
          card: 'rgb(var(--theme-card-rgb) / <alpha-value>)',
          accent: 'rgba(var(--theme-accent-rgb), <alpha-value>)',
        },
        'cyan-accent': 'rgba(var(--theme-accent-rgb), <alpha-value>)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      boxShadow: {
        'glow-accent': '0 0 15px rgba(var(--theme-accent-rgb), 0.2)',
        'glow-accent-lg': '0 0 30px rgba(var(--theme-accent-rgb), 0.3)',
      },

      keyframes: {
        panGrid: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '16px 16px' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },

      animation: {
        'pan-grid': 'panGrid 4s linear infinite',
        scan: 'scanLine 2.5s ease-in-out infinite',
      },
    },

    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['clamp(2.5rem, 1.9rem + 2.5vw, 3rem)', { lineHeight: '1.15' }],
      '6xl': ['clamp(3rem, 2.2rem + 3vw, 3.75rem)', { lineHeight: '1.1' }],
      '7xl': ['clamp(3.5rem, 2.6rem + 4vw, 4.5rem)', { lineHeight: '1.05' }],
      '8xl': ['clamp(4.5rem, 3.2rem + 5.5vw, 6rem)', { lineHeight: '1' }],
      '9xl': ['clamp(5.5rem, 3.8rem + 7vw, 8rem)', { lineHeight: '1' }],
    },

    typography: typographyStyles,
  },
}
