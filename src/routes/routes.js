import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 登陆login
import Login from '../components/login';
// 首页 home
import Home from '../components/commonPage/Home';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        meta: {title: '首页'},
        children: []
    },
];


const router = new VueRouter({
    routes
});
export default router;
