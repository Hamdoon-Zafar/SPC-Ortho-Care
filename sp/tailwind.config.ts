import type { Config } from 'tailwindcss';
// Palette sampled from the clinic logo. Light mode uses brand/DEFAULT on white;
// dark mode swaps to lighter tints (sky/mist) on "ink" so contrast stays >= 4.5:1.
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#1B5FA8', dark: '#17408B', sky: '#1A9BC6', leaf: '#22A55B', sun: '#F39C2B', mist: '#DCEBF8' },
        ink: { DEFAULT: '#0B1B2E', soft: '#12294A' }, // dark-mode surfaces
      },
      fontFamily: { sans: ['var(--font-latin)', 'var(--font-urdu)', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
