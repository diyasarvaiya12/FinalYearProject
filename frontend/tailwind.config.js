/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-black": "#053342", // Custom color applied here
      },
      translate: {
        '101': '101%',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 15s linear infinite'
      },
      spacing: {
        '7vh': '7vh',  // Ensuring consistent spacing in vh units
        '5vh': '5vh'
      }
    }
  },
  plugins: [],
};
