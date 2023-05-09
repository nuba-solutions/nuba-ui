/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-galaxy': "url('/images/space-bg.jpg')",
        'login-pattern': "url('/images/blue-pattern.jpg')"
      },
      colors: {
        primary: {
          '50': '#f4fbfd',
          '100': '#e9f7fb',
          '200': '#c9ebf4',
          '300': '#a8dfed',
          '400': '#67c7e0',
          '500': '#26afd3',
          '600': '#229ebe',
          '700': '#1d839e',
          '800': '#17697f',
          '900': '#135667'
        },
        secondary: {
          '50': '#f2f5f6',
          '100': '#e6ebee',
          '200': '#bfcdd4',
          '300': '#99aebb',
          '400': '#4d7287',
          '500': '#003554',
          '600': '#00304c',
          '700': '#00283f',
          '800': '#002032',
          '900': '#001a29'
        },
        destructive: {
          '50': '#fff2f2',
          '100': '#ffe6e6',
          '200': '#ffbfbf',
          '300': '#ff9999',
          '400': '#ff4d4d',
          '500': '#ff0000',
          '600': '#e60000',
          '700': '#bf0000',
          '800': '#990000',
          '900': '#7d0000'
        },
        warning: {
          '50': '#fffbf3',
          '100': '#fef7e7',
          '200': '#fdebc4',
          '300': '#fbdfa0',
          '400': '#f9c659',
          '500': '#f6ae12',
          '600': '#dd9d10',
          '700': '#b9830e',
          '800': '#94680b',
          '900': '#795509'
        },
        success: {
          '50': '#f4fbf4',
          '100': '#e9f7ea',
          '200': '#c7eaca',
          '300': '#a5ddaa',
          '400': '#62c46b',
          '500': '#1faa2b',
          '600': '#1c9927',
          '700': '#178020',
          '800': '#13661a',
          '900': '#0f5315'
        }
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'center-xl': '0 5px 50px 1px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2160px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ],
  darkMode: 'class'
}
