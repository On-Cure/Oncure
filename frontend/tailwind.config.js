/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme-aware colors using CSS variables
        primary: {
          DEFAULT: 'rgb(var(--color-primary))',
          hover: 'rgb(var(--color-primary-hover))',
          focus: 'rgb(var(--color-primary-focus))',
          light: 'rgb(var(--color-primary-light))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary))',
          hover: 'rgb(var(--color-secondary-hover))',
          focus: 'rgb(var(--color-secondary-focus))',
          light: 'rgb(var(--color-secondary-light))',
        },
        tertiary: {
          DEFAULT: 'rgb(var(--color-tertiary))',
          hover: 'rgb(var(--color-tertiary-hover))',
          focus: 'rgb(var(--color-tertiary-focus))',
          light: 'rgb(var(--color-tertiary-light))',
        },
        
        // Theme-aware backgrounds
        background: {
          DEFAULT: 'rgb(var(--color-background))',
          lighter: 'rgb(var(--color-background-lighter))',
          light: 'rgb(var(--color-background-light))',
        },
        surface: 'rgb(var(--color-surface))',
        border: 'rgb(var(--color-border))',
        
        // Theme-aware text
        text: {
          primary: 'rgb(var(--color-text-primary))',
          secondary: 'rgb(var(--color-text-secondary))',
          disabled: 'rgb(var(--color-text-disabled))',
        },
        
        // Dark theme colors (original theme)
        'dark-primary': {
          DEFAULT: '#3A86FF',
          hover: '#2D6FD9',
          focus: '#1A5DC0',
          light: '#6AA5FF',
        },
        'dark-secondary': {
          DEFAULT: '#8338EC',
          hover: '#6C2DC6',
          focus: '#5622A0',
          light: '#A66FF4',
        },
        'dark-tertiary': {
          DEFAULT: '#FF006E',
          hover: '#D13963',
          focus: '#B0204A',
          light: '#FF4D94',
        },
        
        // Dark theme backgrounds
        'dark-background': {
          DEFAULT: '#0F1624',
          lighter: '#1A2333',
          light: '#2A3343',
        },
        'dark-surface': '#1A2333',
        'dark-border': '#2A3343',
        
        // Dark theme text
        'dark-text': {
          primary: '#FFFFFF',
          secondary: '#B8C1CF',
          disabled: '#6C7A89',
        },
        
        // Status colors
        success: {
          DEFAULT: '#06D6A0',
          light: '#4DE8BE',
          dark: '#05B386',
        },
        warning: {
          DEFAULT: '#FFD166',
          light: '#FFDF8C',
          dark: '#E6BC5C',
        },
        error: {
          DEFAULT: '#EF476F',
          light: '#F47A97',
          dark: '#D63D62',
        },
        info: {
          DEFAULT: '#118AB2',
          light: '#4DACD0',
          dark: '#0E7799',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        glow: '0 0 15px rgba(58, 134, 255, 0.5)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms',
        'very-slow': '500ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        content: '1200px',
      },
      width: {
        sidebar: '280px',
      },
      height: {
        navbar: '64px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #3A86FF 0%, #8338EC 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FF006E 0%, #8338EC 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F1624 0%, #1A2333 100%)',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
}
