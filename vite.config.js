import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "AMS",
        short_name: "AMS",
        description: "ACT Management System",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          // Regex bỏ qua các link con
          /^\/sso\//,
          /^\/files\//,
          /^\/signal\//,
        ],
      },
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      /* eslint-disable no-undef */
      "~": path.resolve(__dirname, "./src"), // Cấu hình alias cho thư mục src
    },
  },
  server: {
    open: true, // Tự động mở trình duyệt khi chạy lệnh `npm run dev`
    port: 5173, // Cổng mặc định
    host: true,
  },
});
