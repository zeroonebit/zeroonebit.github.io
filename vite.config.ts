import { defineConfig } from 'vite'

import { resolve } from 'node:path'

export default defineConfig({
  server: { host: true, port: 5173 },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        feed: resolve(__dirname, 'feed.html'),
      },
    },
  },
})
