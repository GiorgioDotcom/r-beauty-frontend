/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#a4817a',
                    'primary-light': '#b5938a',
                    'primary-dark': '#8a6b5e',
                }
            }
        },
    },
    plugins: [],
}