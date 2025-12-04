/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                brandGreen: "#0db04b", // green
                brandBlue: "#204496",  // blue
                brandRed: "#bd0000",   // red
            },
        },
    },
    plugins: [],
};
