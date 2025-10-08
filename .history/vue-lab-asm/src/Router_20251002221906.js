import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'
import product from './components/product.vue'
import NotFound from './components/NotFound.vue'

const routes = [
    { path: '/', name: 'Login', component: Dangnhap, meta: { isAuth: false } },
    { path: '/home', name: 'Home', component: product, meta: { isAuth: true }},
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


export default router