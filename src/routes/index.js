// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Visualization from '../views/Visualization.vue';

const routes = [
  {
    path: '/',
    redirect: '/visualization'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/visualization',
    name: 'Visualization',
    component: Visualization,
    meta: { requiresAuth: true } // 添加路由元信息，需要登录验证
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 添加路由导航守卫，实现登录验证逻辑
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user-token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要登录验证的页面
    if (token) {
      // 已登录，允许访问
      next()
    } else {
      // 未登录，重定向到登录页
      next('/login')
    }
  } else if (to.path === '/login' && token) {
    // 已登录且尝试访问登录页，重定向到可视化界面
    next('/visualization')
  } else {
    // 其他情况
    next()
  }
})

export default router;
