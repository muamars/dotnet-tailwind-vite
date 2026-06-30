import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: resolve(__dirname, 'wwwroot'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        site: resolve(__dirname, 'wwwroot/css/site.css'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: 'css/[name].[ext]',
      },
    },
  },
  server: {
    strictPort: true,
    port: 5173,
  }
})
