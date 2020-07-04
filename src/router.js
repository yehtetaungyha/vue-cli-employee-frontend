import Vue from 'vue'
import VueRouter from "vue-router";
import Login from "./components/Login";
import Employee from "./components/Employee";
import Signup from "./components/Signup";
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'employee',
            path: '/employee',
            component: Employee,

            beforeEnter: (to, from, next) => {
                let accessToken = window.localStorage.getItem('access_token')
                console.log(accessToken);
                if (accessToken && accessToken !== '') {
                    next();
                } else {
                    next('/login');
                }

            }
        },
        {
            name: 'signup',
            path: '/signup',
            component: Signup
        },

    ],
});

export default router;
