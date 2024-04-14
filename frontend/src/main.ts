/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-28 19:16:00
 * @LastEditors: leslie
 * @LastEditTime: 2024-04-13 10:54:00
 * 佛祖保佑没bug
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style/public.less";
import App from "./App.vue";
import "virtual:svg-icons-register";
import globalComponent from "./components";
import global from "@/global";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(globalComponent);
app.use(global);
app.use(router);
app.use(pinia);

app.mount("#app");
