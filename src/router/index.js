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
      {
        path: 'departments/edit/:id',
        component: () => import('@/views/admin/departments/EditDepartment.vue'),
        name: 'EditDepartment' // 添加路由名称
      },
      { path: 'doctors', component: () => import('@/views/admin/doctors/Index.vue') },
      { path: 'doctors/add', component: () => import('@/views/admin/doctors/AddDoctor.vue') },
      {
        path: '/admin/doctors/edit/:id',
        name: 'EditDoctor',
        component: () => import('@/views/admin/doctors/EditDoctor.vue')
      },
      { path: 'schedules', component: () => import('@/views/admin/schedules/Index.vue') },
      { path: 'schedules/add', component: () => import('@/views/admin/schedules/AddSchedule.vue') },
      { path: 'schedules/edit/:id', component: () => import('@/views/admin/schedules/EditSchedule.vue') },
      { path: 'stats', component: () => import('@/views/admin/stats/Index.vue') },
      { path: '', redirect: '/admin/users' } // 默认重定向到用户管理页面
    ]
  },
  {
    path: '/patient',
    component: () => import('@/views/patient/Index.vue'),
    meta: { requiresAuth: true, requiredRole: 'PATIENT' },
    children: [
      { path: 'dashboard', component: () => import('@/views/patient/Dashboard.vue'), name: 'patient-dashboard' },
      { path: 'departments', component: () => import('@/views/patient/Departments.vue'), name: 'patient-departments' },
      { path: 'doctors', component: () => import('@/views/patient/Doctors.vue'), name: 'patient-doctors' },
      { path: 'appointments', component: () => import('@/views/patient/Appointments.vue'), name: 'patient-appointments' },
      { path: 'profile', component: () => import('@/views/patient/Profile.vue'), name: 'patient-profile' },
      { path: '', redirect: '/patient/dashboard' }
    ]
  },
  {
    path: '/doctor',
    name: 'DoctorLayout',
    component: () => import('@/views/doctor/Index.vue'),
    redirect: '/doctor/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'DoctorDashboard',
        component: () => import('@/views/doctor/Dashboard.vue')
      },
      {
        path: 'schedule',
        name: 'DoctorSchedule',
        component: () => import('@/views/doctor/Schedule.vue')
      },
      {
        path: 'patients',
        name: 'DoctorPatients',
        component: () => import('@/views/doctor/Patients.vue')
      },
      {
        path: 'records',
        name: 'DoctorRecords',
        component: () => import('@/views/doctor/Records.vue')
      },
      {
        path: 'templates',
        name: 'DoctorTemplates',
        component: () => import('@/views/doctor/Templates.vue')
      }
    ]
  },
  // 登录路由
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false }
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
    component: () => import('@/views/Agreement.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { requiresAuth: false }
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

    // 调试信息
    console.log('Token:', token);
    console.log('Payload:', payload);

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


