import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',

      devOptions: {
        enabled: true,
      },

      manifest: {
        name: "Smart Cash",
        short_name: "PWA",
        description: "A Vue 3 PWA example with Vite",
        theme_color: "#493D9E",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icons/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
