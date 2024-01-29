/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-25 16:05:02
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-29 22:03:04
 * 佛祖保佑没bug
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
  },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, "src/style/public.less")}";`,
      },
    },
  }
});
