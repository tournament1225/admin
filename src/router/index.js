import Vue from 'vue'
import Router from 'vue-router'
// import nestedRouter from './modules/nested'
import baseInfoRouter from './modules/baseinfo'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  baseInfoRouter,
  // nestedRouter,
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index.vue'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/message',
    component: Layout,
    redirect: '/message',
    children: [
      {
        path: 'index',
        component: () => import('@/views/messages/index.vue'),
        name: 'messages',
        meta: { title: 'messages', icon: 'stmessage', noCache: true }
      }
    ]
  },
  {
    path: '/workers',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/workers/index.vue'),
        name: 'workers',
        meta: { title: 'workers', icon: 'worker', noCache: true }
      }
    ]
  }

]
