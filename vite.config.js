import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            'ziggy-js': path.resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
        // Ensures Vite looks for these extensions in order
        extensions: ['.js', '.jsx', '.json'], 
    },
    // Optimization for MUI and Emotion
    optimizeDeps: {
        include: [
            '@mui/material', 
            '@emotion/react', 
            '@emotion/styled', 
            '@mui/icons-material'
        ],
    },
    server: {
        host: true,
        strictPort: true, // Recommended for Docker
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        },
        // Helps with file watching in Docker/Linux
        watch: {
            usePolling: true,
        },
    },
});