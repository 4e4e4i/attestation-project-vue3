import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '../pages/main-page.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: MainLayout
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
