/*
 * @Description: Stay hungry，Stay foolish
 * @Author: leslie
 * @Date: 2024-02-18 16:30:40
 * @LastEditors: leslie
 * @LastEditTime: 2024-03-30 21:32:53
 * 佛祖保佑没bug
 */
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

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
  {
    path: "/content-detail/:id",
    name: "ContentDetail",
    component: () => import("@/components/content/index.vue"),
    meta: {
      title: "文章详情",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
