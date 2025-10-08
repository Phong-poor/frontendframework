import { createWebHistory, createRouter } from 'vue-router'

import Dangnhap from './components/Dangnhap.vue'

const routes = [
    { path: '/', name: 'Home', component: ListPostView, meta: { isAuth: false } },
    { path: '/posts', name: 'PostList', component: ListPostView, meta: { isAuth: false } },
    { path: '/posts/:id', name: 'PostDetail', component: PostDetailView, meta: { isAuth: false } },
    { path: '/login', name: 'Login', component: Login, meta: { isAuth: false } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { isAuth: true } },
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