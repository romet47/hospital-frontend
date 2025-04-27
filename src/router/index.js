import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import { parseJwt } from '@/utils/jwt'
import {ElMessage} from "element-plus";
const routes = [
  // 管理员路由示例
  {
    path: '/admin',
    component: () => import('@/views/admin/Index.vue'),
    meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    children: [
      { path: 'users', component: () => import('@/views/admin/users/Index.vue') },
      { path: 'users/add', component: () => import('@/views/admin/users/AddUser.vue') },
      { path: 'users/edit/:id', component: () => import('@/views/admin/users/EditUser.vue') },
      { path: 'departments', component: () => import('@/views/admin/departments/Index.vue') },
      { path: 'departments/add', component: () => import('@/views/admin/departments/AddDepartment.vue') },
      { path: 'departments/edit/:id', component: () => import('@/views/admin/departments/EditDepartment.vue') },
      { path: 'doctors', component: () => import('@/views/admin/doctors/Index.vue') },
      { path: 'doctors/add', component: () => import('@/views/admin/doctors/AddDoctor.vue') },
      { path: 'doctors/edit/:id', component: () => import('@/views/admin/doctors/EditDoctor.vue') },
      { path: 'schedules', component: () => import('@/views/admin/schedules/Index.vue') },
      { path: 'schedules/add', component: () => import('@/views/admin/schedules/AddSchedule.vue') },
      { path: 'schedules/edit/:id', component: () => import('@/views/admin/schedules/EditSchedule.vue') },
      { path: 'stats', component: () => import('@/views/admin/stats/Index.vue') },
      { path: '', redirect: '/admin/users' } // 默认重定向到用户管理页面
    ]
  },
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
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: false }
  },
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');

  // 不需要认证的页面直接放行
  if (!to.meta.requiresAuth) return next();

  // 无token跳转登录页
  if (!token) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  try {
    // 解析token获取角色
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload?.role?.toUpperCase();

    // 检查角色权限
    if (to.meta.requiredRole && userRole !== to.meta.requiredRole) {
      ElMessage.warning('需要管理员权限');
      return next(from.fullPath); // 停留在原页面
    }

    next();
  } catch (error) {
    console.error('路由守卫错误:', error);
    localStorage.removeItem('token');
    next('/login');
  }
});