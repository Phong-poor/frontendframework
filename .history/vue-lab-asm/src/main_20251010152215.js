import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './Router';
import store from './store.js';
createApp(App).use(store).use(router).mount('#app')