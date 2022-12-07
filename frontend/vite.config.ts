import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteAliases } from 'vite-aliases'

const PORT = 3000
export default defineConfig(() => {
    return {
        // vite config
        plugins: [react(), ViteAliases()],
        server: {
            host: '0.0.0.0',
            proxy: {
                '/api': {
                    target: `http://localhost:${PORT}`,
                    changeOrigin: true,
                },
            },
        },
        build: {
            outDir: 'dist/frontend',
        },
    }
})
