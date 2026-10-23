/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          canvas: '#F9F8F6',
          white: '#FFFFFF',
          charcoal: '#1A1A1A',
          slate: '#5A5A5A',
          light: '#8C8C8C',
          border: '#E8E6E1',
          sand: '#F0EDE6',
          terracotta: '#C26A4A',
          forest: '#2E4034',
          ochre: '#A87C39',
        },
        transit: {
          metro: '#2E4034',     // Deep Forest Green CMRL
          bus: '#C26A4A',       // Muted Terracotta MTC
          suburban: '#A87C39',  // Warm Ochre Suburban EMU
          auto: '#8C6D3B',      // Earthy Gold Feeder
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
        none: '0px',
        sm: '2px',
        md: '6px',
        lg: '8px',
      }
    },
  },
  plugins: [],
}
