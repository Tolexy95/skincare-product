module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'min': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1024px'},
      // => @media (max-width: 1024px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 768px) { ... }
             
      'mx': {'max': '550px'},
      // => @media (max-width: 550px) { ... }
             

      'sm': {'max': '430px'},
      // => @media (max-width: 430px) { ... }

      'sw': {'min': '426px'},
      // => @media (max-width: 426px) { ... }

      'xs': {'max': '375px'},
      // => @media (max-width: 375px) { ... }
    },
    extend: {
      backgroundColor: {
        'banner-color-light': '#1c80b4', 
        'banner-color-dark': ' #1B1B1B', 
      },

      boxShadow: {
        'glass-shadow-dark': '0px 0px 10px rgba(27, 27, 27, 0.5)',
        'glass-shadow-light': '0px 0px 10px rgba(28, 128, 180, 0.5)',
      },
    }, // <-- Close the extend object here
  },
  plugins: [],
};
