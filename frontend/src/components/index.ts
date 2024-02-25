/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-30 23:24:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-01-30 23:27:39
 * 佛祖保佑没bug
 */
import SvgIcon from "@/components/leslieUI/svgIcon/index.vue";
import type { App, Component } from "vue";

const components: { [name: string]: Component } = { SvgIcon };

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
