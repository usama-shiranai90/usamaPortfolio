const typographyPlugin = require('@tailwindcss/typography')

const typographyStyles = require('./typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'selector',
  plugins: [typographyPlugin],
  theme: {
    extend: {
      fontFamily: {
        syne: ['syne', 'sans-serif'],
      },
      colors: {
        catalystDark: {
          darkest: `var(--ex-dark-color)`,
          dark: `var(--d-dark-color)`,   // main section sub-para / i.e. following data needs to be.
          medium: `var(--sm-dark-color)`,   // main section major heading /  Course profile /
        },
        shaddy: {
          l_Skobeloff: `var(--l_Skobeloff-color)`,
          l_MidnightGreenEagleGreen: `var(--l_MidnightGreenEagleGreen-color)`,
          lx_MidnightGreenEagleGreen: `var(--lx_MidnightGreenEagleGreen-color)`,
          lxx_MidnightGreenEagleGreen: `var(--lxx_MidnightGreenEagleGreen-color)`,
          l_Charcoal: `var(--l_Charcoal-color)`,
          PrussianBlue: `var(--PrussianBlue-color)`,
          SpaceCadet: `var(--SpaceCadet-color)`,
          DarkPurple: `var(--DarkPurple-color)`,
          PalatinatePurple: `var(--PalatinatePurple-color)`,
        },
        bluesh: {
          dark: `var(--dark-color)`,
          oxfordBlue: `var(--oxfordBlue-color)`,
          midnightBlue: `var(--midnightBlue-color)`,
          navyBlue: `var(--navyBlue-color)`,
          dukeBlue: `var(--dukeBlue-color)`,
          richBlack: `var(--richBlack-color)`, // primary color
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

      },
      backgroundImage: {
        nvSimple: `linear-gradient(transparent, transparent), linear-gradient(#fff, #fff)`,
        nvSimpleh: 'linear-gradient(transparent, transparent), linear-gradient(#051923, #051923)',
      },
      screens: {
        'sm': '640px',         // tablet  (min-width: 640px)
        'md': '768px',         //         (min-width: 768px)
        'lg': '1024px',        // laptop  (min-width: 1024px)
        'xl': '1280px',        // desktop (min-width: 1280px)
        '2xl': '1536px',       //         (min-width: 1536px)
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
