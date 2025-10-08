import { createMemoryHistory, createRouter } from "vue-router";

import Dangnhap from "./components/D.vue";
import PostDetailView from './pages/PostDetail.vue';
const routes = [
   {path: '/', component: ListPostView},
   {path:'/posts', component: ListPostView},
   {path:'/posts/:id', component: PostDetailView}
]
const router = createRouter({
   history: createWebHistory(''),
   routes
})


export default router