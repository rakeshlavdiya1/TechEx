/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#03060f', 900: '#060b18', 800: '#0a1224', 700: '#101a33', 600: '#1a2646' },
        electric: { DEFAULT: '#3b82f6', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
        cyan: { glow: '#22d3ee' },
        violet: { glow: '#8b5cf6' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(40px,-30px,0) scale(1.15)' },
        },
        spin360: { to: { transform: 'rotate(360deg)' } },
        flow: { to: { strokeDashoffset: '-40' } },
        rise: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(-60px)', opacity: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        sweep: { to: { transform: 'rotate(360deg)' } },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        dropDot: {
          '0%': { top: '-4%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { top: '104%', opacity: '0' },
        },
      },
      animation: {
        blob: 'blob 14s ease-in-out infinite',
        'spin-slow': 'spin360 40s linear infinite',
        'spin-mid': 'spin360 26s linear infinite',
        'spin-rev': 'spin360 26s linear infinite reverse',
        flow: 'flow 1.4s linear infinite',
        rise: 'rise 2.4s ease-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        sweep: 'sweep 5s linear infinite',
        scan: 'scan 3.5s linear infinite',
        'drop-dot': 'dropDot 3s linear infinite',
      },
    },
  },
  plugins: [],
}
