import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { blogMetadataPlugin } from './scripts/lib/blog-metadata-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [blogMetadataPlugin(), react()],
})
