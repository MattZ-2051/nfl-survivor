import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteAliases } from 'vite-aliases'

export default defineConfig(() => {
    return {
        // vite config
        plugins: [react(), ViteAliases()],
        server: { port: 3000 },
    }
})
