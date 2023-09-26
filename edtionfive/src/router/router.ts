import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import SonMetPage from '@/views/SonMetPage.vue';
import firstPage from '@/views/firstPage.vue';
import 'amfe-flexible'

const routes = [
    { path: '/LoginPage', name: 'LoginPage', component: LoginPage,},
    { path: '/SonMetPage', name: 'SonMetPage', component: SonMetPage,},
    { path: '/firstPage', name: 'firstPage', component: firstPage,},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
