/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--f-display)'],
        num: ['var(--f-num)'],
      },
      animation: {
        'fade-up': 'gv-fade-up .5s ease both',
        'fade-up-md': 'gv-fade-up .6s ease both',
        breathe: 'gv-breathe 8s ease-in-out infinite',
        'breathe-ring': 'gv-breathe-ring 8s ease-in-out infinite',
        'pulse-gv': 'gv-pulse 2s infinite',
        completion: 'gv-completion .6s ease both',
      },
      colors: {
        bg: 'var(--p-bg)',
        'bg-2': 'var(--p-bg-2)',
        'bg-3': 'var(--p-bg-3)',
        surface: 'var(--p-surface)',
        text: 'var(--p-text)',
        'text-2': 'var(--p-text-2)',
        'text-3': 'var(--p-text-3)',
        divider: 'var(--p-divider)',
        primary: 'var(--p-primary)',
        'on-primary': 'var(--p-on-primary)',
        accent: 'var(--p-accent)',
        success: 'var(--p-success)',
        warn: 'var(--p-warn)',
        error: 'var(--p-error)',
        streak: 'var(--p-streak)',
        illus: 'var(--p-illus)',
        'illus-2': 'var(--p-illus-2)',
      },
      borderRadius: {
        xs: 'var(--r-xs)',
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
        pill: 'var(--r-pill)',
      },
    },
  },
  plugins: [],
}
