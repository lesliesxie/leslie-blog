/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-26 22:24:09
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-10 17:40:39
 * 佛祖保佑没bug
 */
import { App } from "vue";
import { throttle } from "./leslie-throttle";

export default {
  install: (app: App) => {
    app.config.globalProperties.$throttle = throttle;
  },
};
