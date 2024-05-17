/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#F5385D'
      }
    },
  },
  plugins: [],
  purge: [
     './src/**/*.{js,jsx,ts,tsx}', 
   ],
   
}


