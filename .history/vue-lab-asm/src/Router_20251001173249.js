import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'
import product from './components/product.vue'
import NotFound from './components/NotFound.vue'

const routes = [
    { path: '/', name: 'Login', component: Dangnhap, meta: { isAuth: false } },
    { path: '/home', name: 'Home', component: product, meta: { isAuth: false } },
    {
    path: '/product',
    name: 'Product',
    component: () => import('./components/product.vue'),
    meta: { isAuth: false }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { isAuth: false  }
    },
]
const router = createRouter({
    history: createWebHistory(''),
    routes
})
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('currentUser');
  
  if (to.meta.isAuth) {
    if (!currentUser) {
      // chưa login -> về trang login
      return next({ name: 'Login' });
    }

    const user = JSON.parse(currentUser);
    if (!user.role) {
      // user không có quyền hợp lệ
      return next({ name: 'Login' });
    }
  }

  // nếu mọi thứ ok thì cho đi tiếp
  next();
});

export default router