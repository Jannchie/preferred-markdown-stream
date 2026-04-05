import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@preferred-markdown-stream/core': fileURLToPath(
        new URL('../core/src/index.ts', import.meta.url),
      ),
      '@preferred-markdown-stream/vue': fileURLToPath(
        new URL('../vue/src/index.ts', import.meta.url),
      ),
    },
  },
})
