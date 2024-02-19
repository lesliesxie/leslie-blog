/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 19:16:00
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-18 17:18:02
 * 佛祖保佑没bug
 */
import { createApp } from "vue";
import "./style/public.less";
import App from "./App.vue";
import "virtual:svg-icons-register";
import globalComponent from "./components";
import router from "./router";

const app = createApp(App);

app.use(globalComponent);
app.use(router);

app.mount("#app");
