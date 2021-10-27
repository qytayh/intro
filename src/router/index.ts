import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import asyncRoutes from "./asyncRoutes";
import staticRoutes from "./staticRoutes";

const whiteList = ["/login", "/open"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rolesRouters = (routes: RouteRecordRaw[], role: number): any => {
  return routes.map((route: RouteRecordRaw) => {
    const roles = route.meta?.roles as Record<
      string,
      string | boolean | number[]
    >;
    const children: RouteRecordRaw[] | undefined = route.children;
    if (!roles && children && children.length > 0) {
      return rolesRouters(children, role);
    }
    if (!roles && !children) {
      return route;
    }
    if (Array.isArray(roles) && roles.includes(role)) {
      return route;
    }
  });
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: staticRoutes,
});

router.beforeEach((to, from, next) => {
  const userInfo = store.getters["user/getInfo"];
  if (userInfo && userInfo._id) {
    if (to.path === "/login") {
      sessionStorage.clear();
      next();
    } else {
      const { role } = userInfo;
      rolesRouters(asyncRoutes, role).forEach((route: RouteRecordRaw) => {
        router.addRoute(route);
      });
      if (to.matched.length === 0) {
        next({ ...to, replace: true });
      }
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});

export const resetRouter = (): void => {
  const newRouter = router;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (router as any).matcher = (newRouter as any).matcher; // reset router
};

export default router;
