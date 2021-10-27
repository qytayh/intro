import { RouteRecordRaw } from "vue-router";

const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
];

export default staticRoutes;
