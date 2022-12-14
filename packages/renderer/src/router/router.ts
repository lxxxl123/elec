import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/xterm',
    name: 'xterm',
    component: () => import('@/views/xterm/index.vue')
  },
  {
    path: '/loc-build',
    name: 'loc-build',
    component: () => import('/@/views/build/loc-build.vue') // 懒加载组件
  },
  {
    path: '/jenkins-devops',
    name: 'jenkins-devops',
    component: () => import('/@/views/jenkins/jenkins-devops.vue') // 懒加载组件
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
