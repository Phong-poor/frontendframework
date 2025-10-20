import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'
import product from './components/product.vue'
import NotFound from './components/NotFound.vue'
import Dangky from './components/Dangky.vue'
import admin from './components/admin.vue'
import adminCategory from './components/admin-category.vue'
import adminUsers from './components/admin-users.vue'
import PrimeVueDemoPage from './components/PrimeVueDemoPage.vue'
import Cart from './components/Cart.vue'
import thongtincanhan from './components/thongtincanhan.vue'

const routes = [
    { path: '/login', name: 'Login', component: Dangnhap, meta: { isAuth: false } },
    { path: '/signup', name: 'Signup', component: Dangky, meta: { isAuth: false } },
    { path: '/', name: 'Home', component: product, meta: { isAuth: true }},
    { path: '/admin', name: 'Admin', component: admin, meta: { isAuth: true }},
    { path: '/adminCategory', name: 'AdminCategory', component: adminCategory, meta: { isAuth: true }},
    { path: '/adminUsers', name: 'adminUsers', component: adminUsers, meta: { isAuth: true }},
    { path: '/cart', name: 'Cart', component: Cart, meta: { isAuth: false } },
    { path: '/thongtincanhan', name: 'thongtincanhan', component: Cart, meta: { isAuth: false } },
    { path: '/primevue-demo', name: 'PrimeVueDemo', component: PrimeVueDemoPage, meta: { isAuth: false } },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: { isAuth: false  }
    },
]
const router = createRouter({
    history: createWebHistory(),
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