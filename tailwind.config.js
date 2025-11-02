/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            rotate: {
                'y-180': 'rotateY(180deg)',
            }
        },
    },
    plugins: [],
}
