/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-25 16:05:02
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-26 18:59:52
 * 佛祖保佑没bug
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001
  }
})
