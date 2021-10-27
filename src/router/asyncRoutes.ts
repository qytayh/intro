import Layout from "@/layout/index.vue"
import { RouteRecordRaw } from "vue-router";

/**
 * [
    {
      path:"/path", // path
      meta: {
        menu: true, // 配置是否在菜单显示
        auth: true, // 是否需要登录访问
        roles: [0, 1],// 权限
        title: "title", // title
      },
      redirect: "/anotherpath", 重定向
      component: Layout,
      children: [
        {
          path: "/childrenpath",
          name: "childrenName",
          component: () => import("@/views/yourpath/index.vue"),
          meta: {
            title: "children title",
            hidden:true // 是否在菜单中隐藏
          },
        },
      ],
    }
  ]
 * **/


const asyncRoutes: Array<RouteRecordRaw>  = [
    {
      path: "/",
      meta: {
        auth: true,
        roles: [0, 1],
        title: "首页",
      },
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/home/index.vue"),
          meta: {
            title: "首页",
            menu: true,
          },
        },
      ],
    },
    {
      path: "/manage",
      name: "manage",
      meta: {
        auth: true,
        roles: [1],
        menu: true,
        title: "管理",
      },
      component: Layout,
      redirect:"/manage/jobs",
      children: [
        {
          path: "/manage/jobs",
          name: "manage",
          component: () => import("@/views/manage/jobs/index.vue"),
          meta: {
            title: "职位管理",
          },
        },
        {
          path: "/manage/employeer",
          name: "employeer",
          component: () => import("@/views/manage/employeer/index.vue"),
          meta: {
            title: "员工管理",
          },
        },
      ],
    },
    {
      path:"",
      component:Layout,
      meta: {
        auth: true,
        roles: [0,1],
        title: "我的",
      },
      children:[
        {
          path:"/mine",
          name:"mine",
          component:()=> import('@/views/mine/index.vue')
        }
      ]
    }
  ];

export default asyncRoutes