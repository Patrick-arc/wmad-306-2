import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    plugins: [
        // Reload Blade templates when they change
        FullReload(['resources/views/**']),

        // Laravel Vite integration
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),

        // React support
        react(),
    ],
    server: {
        // Bind to all addresses so the dev server is reachable from Docker containers
        host: '0.0.0.0',
        port: 5173,

        hmr: {
            // When running inside a container, the client (browser on host) connects to this host
            host: 'localhost',
            protocol: 'ws',
            clientPort: 5173,
        },
    },
});
