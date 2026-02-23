import defaultTheme from 'vite-plugin-tailwind-purgecss'; // or your default import

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                // This defines your professional purple brand
                brand: {
                    light: '#9333ea', // Purple 600
                    DEFAULT: '#7e22ce', // Purple 700
                    dark: '#6b21a8', // Purple 800
                },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};