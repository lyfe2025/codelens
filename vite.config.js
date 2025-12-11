import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // GitHub Pages 部署配置
  base: process.env.GITHUB_ACTIONS ? '/codelens/' : '/',
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui': ['naive-ui'],
          'monaco': ['monaco-editor'],
          'vendor': ['vue', 'vue-router'],
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: '编程学习平台',
        short_name: '编程学习',
        description: '交互式编程学习平台',
        theme_color: '#3b82f6',
        background_color: '#f5f7fa',
        display: 'standalone',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        // 排除 Monaco Editor 的 worker 文件（太大）
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        globIgnores: ['**/node_modules/**', '**/*.worker*.js'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB
        runtimeCaching: [
          {
            // Monaco Editor workers 运行时缓存
            urlPattern: /\.worker.*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'monaco-workers',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
})
