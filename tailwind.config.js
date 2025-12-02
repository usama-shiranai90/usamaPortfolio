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
        heading: ['syne-Medium', 'sans-serif'],
        body: ['syne-Regular', 'sans-serif'],
        // Aliases for backward compatibility
        syne: ['syne-Medium', 'sans-serif'],
        sans: ['syne-Regular', 'sans-serif'],
      },

      colors: {
        catalystDark: {
          darkest: `var(--ex-dark-color)`,
          dark: `var(--d-dark-color)`,
          medium: `var(--sm-dark-color)`,
        },

        shaddy: {
          Skobeloff: `var(--l_Skobeloff-color)`,
          MidnightGreenEagleGreen: `var(--l_MidnightGreenEagleGreen-color)`,
          x_MidnightGreenEagleGreen: `var(--lx_MidnightGreenEagleGreen-color)`,
          xx_MidnightGreenEagleGreen: `var(--lxx_MidnightGreenEagleGreen-color)`,
          Charcoal: `var(--l_Charcoal-color)`,
          PrussianBlue: `var(--PrussianBlue-color)`,
          SpaceCadet: `var(--SpaceCadet-color)`,
          DarkPurple: `var(--DarkPurple-color)`,
          PalatinatePurple: `var(--PalatinatePurple-color)`,

          l_Skobeloff: `var(--l_Skobeloff-color)`,
          l_MidnightGreenEagleGreen: `var(--l_MidnightGreenEagleGreen-color)`,
          lx_MidnightGreenEagleGreen: `var(--lx_MidnightGreenEagleGreen-color)`,
          lxx_MidnightGreenEagleGreen: `var(--lxx_MidnightGreenEagleGreen-color)`,
          l_Charcoal: `var(--l_Charcoal-color)`,
        },

        bluesh: {
          dark: `var(--dark-color)`,
          oxfordBlue: `var(--oxfordBlue-color)`,
          midnightBlue: `var(--midnightBlue-color)`,
          navyBlue: `var(--navyBlue-color)`,
          dukeBlue: `var(--dukeBlue-color)`,
          richBlack: `var(--richBlack-color)`,
          blueJean: `var(--blueJean-color)`,
          blueCrayola: `var(--blueCrayola-color)`,
          sapBlue: `var(--sapBlue-color)`,
          prussianBlue: `var(--prussianBlue-color)`,
        },

        light: {
          cultured: `var(--cultured-color)`,
          darkCultured: `var(--cultured-d-color)`,
          gainsboro: `var(--gainsboro-color)`,
          lightGray: `var(--light-gray-color)`,
        },

        // Dynamic Theme Colors
        theme: {
          bg: 'var(--theme-bg)',
          text: 'var(--theme-text)',
          accent: 'var(--theme-accent)',
          card: 'var(--theme-card)',
        },
        // Aliases for backward compatibility (mapped to theme)
        dark: {
          bg: 'var(--theme-bg)',
          card: 'var(--theme-card)',
          accent: 'var(--theme-accent)',
        },
        'cyan-accent': 'var(--theme-accent)',
      },

      backgroundImage: {
        Simple: `linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)`,
        Simpleh: 'linear-gradient(transparent, transparent), linear-gradient(#051923, #051923)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',

        nvSimple: `linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)`,
        nvSimpleh: 'linear-gradient(transparent, transparent), linear-gradient(#051923, #051923)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
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
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },

    typography: typographyStyles,
  },
}
