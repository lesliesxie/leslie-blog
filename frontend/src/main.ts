/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 19:16:00
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-31 22:44:27
 * 佛祖保佑没bug
 */
import { createApp } from "vue";
import "./style/public.less";
import App from "./App.vue";
import "virtual:svg-icons-register";
import globalComponent from "./components";

const app = createApp(App);

app.use(globalComponent);

app.mount("#app");
