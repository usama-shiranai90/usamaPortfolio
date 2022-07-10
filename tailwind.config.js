/** @type {import('tailwindcss').Config}
 *
 *
 * */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './public/**/*.html',
    './public/**/*.js',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
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
        sm: '640px', // tablet
        md: '768px',
        lg: '1024px', // laptop
        xl: '1280px',// desktop
        ul: '1536px',
      }
    },

  },
  plugins: [],
}


