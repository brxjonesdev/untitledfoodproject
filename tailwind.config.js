const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        black: {
          50: '#050505',
          100: '#0a0a0a',
          200: '#141414',
          300: '#1f1f1f',
          400: '#292929',
          500: '#333333',
          600: '#3d3d3d',
          700: '#474747',
          800: '#515151',
          900: '#5b5b5b',
          950: '#656565',
          translucent: 'rgba(0, 0, 0, 0.8)',
        },
        white: {
          50: 'hsl(0, 0%, 5%)',
          100: 'hsl(0, 0%, 10%)',
          200: 'hsl(0, 0%, 20%)',
          300: 'hsl(0, 0%, 30%)',
          400: 'hsl(0, 0%, 40%)',
          500: 'hsl(0, 0%, 50%)',
          600: 'hsl(0, 0%, 60%)',
          700: 'hsl(0, 0%, 70%)',
          800: 'hsl(0, 0%, 80%)',
          900: 'hsl(0, 0%, 90%)',
          950: 'hsl(0, 0%, 95%)',
        },
        bright_plum: {
          50: 'hsl(280, 69%, 5%)',
          100: 'hsl(279, 69%, 10%)',
          200: 'hsl(280, 71%, 20%)',
          300: 'hsl(280, 70%, 30%)',
          400: 'hsl(280, 70%, 40%)',
          500: 'hsl(280, 70%, 50%)',
          600: 'hsl(280, 70%, 60%)',
          700: 'hsl(280, 70%, 70%)',
          800: 'hsl(280, 71%, 80%)',
          900: 'hsl(279, 69%, 90%)',
          950: 'hsl(280, 69%, 95%)',
        },
        strawberry_milkshake: {
          50: 'hsl(325, 100%, 5%)',
          100: 'hsl(324, 100%, 10%)',
          200: 'hsl(324, 100%, 20%)',
          300: 'hsl(324, 100%, 30%)',
          400: 'hsl(324, 100%, 40%)',
          500: 'hsl(324, 100%, 50%)',
          600: 'hsl(324, 100%, 60%)',
          700: 'hsl(324, 100%, 70%)',
          800: 'hsl(324, 100%, 80%)',
          900: 'hsl(324, 100%, 90%)',
          950: 'hsl(323, 100%, 95%)',
        },
        citrus_blush: {
          50: 'hsl(348, 100%, 5%)',
          100: 'hsl(349, 100%, 10%)',
          200: 'hsl(349, 100%, 20%)',
          300: 'hsl(349, 100%, 30%)',
          400: 'hsl(349, 100%, 40%)',
          500: 'hsl(349, 100%, 50%)',
          600: 'hsl(349, 100%, 60%)',
          700: 'hsl(349, 100%, 70%)',
          800: 'hsl(349, 100%, 80%)',
          900: 'hsl(349, 100%, 90%)',
          950: 'hsl(348, 100%, 95%)',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        keyframes: {
          'caret-blink': {
            '0%,70%,100%': { opacity: '1' },
            '20%,50%': { opacity: '0' },
          },
        },
        animation: {
          'caret-blink': 'caret-blink 1.25s ease-out infinite',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
