/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 16:30:40
 * @LastEditors: leslie
 * @LastEditTime: 2024-02-18 17:16:15
 * 佛祖保佑没bug
 */
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/components/homePage/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/add-note",
    name: "AddNote",
    component: () => import("@/components/addNote/index.vue"),
    meta: {
      title: "添加笔记",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
