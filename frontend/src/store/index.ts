/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-04-13 10:04:46
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-13 10:59:47
 * 佛祖保佑没bug
 */

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogin: false,
    user: {},
  }),
  actions: {
    login(user: object) {
      this.isLogin = true;
      this.user = user;
    },
    logout() {
      this.isLogin = false;
      this.user = {};
    },
  },
});

export default useAuthStore;
