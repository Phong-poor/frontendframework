import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'

const routes = [
    { path: '/login', name: 'Login', component: Dangnhap, meta: { isAuth: false } },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
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