import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@preferred-markdown-stream/core': resolve(
        __dirname,
        '../core/src/index.ts',
      ),
      '@preferred-markdown-stream/vue': resolve(
        __dirname,
        '../vue/src/index.ts',
      ),
    },
  },
})
