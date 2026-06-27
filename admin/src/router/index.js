import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Appointments from '../views/Appointments.vue'

const routes = [
  {
    path: '/',
    redirect: '/appointments'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    requiresAuth: true
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments,
    requiresAuth: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简单的路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router