/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-01-30 23:24:26
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-26 23:21:23
 * 佛祖保佑没bug
 */
import SvgIcon from "@/components/leslieUI/svgIcon/index.vue";
import LeslieInput from "@/components/leslieUI/leslie-input/index.vue";
import LeslieButton from "@/components/leslieUI/leslie-button/index.vue";
import type { App, Component } from "vue";

const components: { [name: string]: Component } = {
  SvgIcon,
  LeslieButton,
  LeslieInput,
};

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key]);
    });
  },
};
