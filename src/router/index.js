import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue')
  },
  { path: '/test-api', component: () => import('@/views/TestApi.vue') },
  { path: '/', name: 'Home', component: Home },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/Agreement.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue')
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router