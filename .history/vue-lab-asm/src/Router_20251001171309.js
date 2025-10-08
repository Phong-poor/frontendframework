import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'
import product from './components/product.vue'

const routes = [
    { path: '/', name: 'Login', component: Dangnhap, meta: { isAuth: false } },
    { path: '/home', name: 'Home', component: product, meta: { isAuth: false } },
    {
    path: '/profile',
    name: 'Profile',
    component: () => import('./components/Dangnhap.vue'),
    meta: { isAuth: true }
  },
]
const router = createRouter({
    history: createWebHistory(''),
    routes
})
router.beforeEach((to, from, next) => {
    const currentUser = localStorage.getItem('currentUser');
    if(to.meta.isAuth && currentUser){
        const user = JSON.parse(currentUser)
        console.log('user',user)
        if(!user.role)
        next({name: 'Login'});
    } else {
        next();
    }
    next()
})

export default router