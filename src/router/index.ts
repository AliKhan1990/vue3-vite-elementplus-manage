import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 公开路由表

const publicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/home',
    name: 'Layout',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '',
    redirect: '/home'
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
