module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color: {
    },
    gridTemplateColumns: {
      '3auto': '1fr 1fr 1fr',
      '2auto': '1fr 1fr',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))'
    },
    textColor: {
      'white': '#FFFFFF',
      'icon': '#AEADC3',
      'blue-4': '#72809D',
      'blue-2': '#605CA8',
      'blue-1': '#8E8AD3',
      'dark': '#414141',
      'pink': '#FE9780',
      'red-1': '#ff0e46',
      'grey-4': '#A7AFBA',
      'grey-button': '#9E9E9E',
      'green-1': '#21A28E',
      'active-icon': '#8E8AD3'
    },
    backgroundColor: {
      'blue-1': '#E3F4F2',
      'green-1': '#21A28E',
      'red-1': '#fdbaca',
      'bg-white': '#FFFFFF'
    },
    fontSize: {
      'label': '.65rem',
      'xs': '.75rem',     // 12px
      'sm': '.875rem',    // 14px
      'base': '1rem',     // 16px
      'lg': '1.125rem',   // 18px
      'xl': '1.25rem',    // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem'      // 64px
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
