/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-26 22:24:09
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-26 23:04:09
 * 佛祖保佑没bug
 */
import { App } from "vue";
import showMessage from "./leslie-message";

export default {
  install: (app: App) => {
    app.config.globalProperties.LeslieMessage = showMessage;
  },
};
