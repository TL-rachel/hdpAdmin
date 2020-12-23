import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// 登陆login
import Login from '../components/login';
// 首页 home
import Home from '../components/commonPage/Home';
// 首页 home
import HomePage from '../components/pages/homePage';
// 设备列表
import EquipmentList from '../components/pages/equipment/equipmentList';
// 添加设备
import AddEquipment from '../components/pages/equipment/addEquipment';
// 区域列表
import AreaList from '../components/pages/area/areaList';
// 用户列表
import UserList from '../components/pages/user/userList';
// 添加用户
import AddUser from '../components/pages/user/addUser';
// 健康数据
import HealthDataList from '../components/pages/healthData/healthDataList';
// 病史
import MedicalHistory from '../components/pages/user/medicalHistory';
// 病例
import CaseList from '../components/pages/user/caseList';
// 添加病例
import AddCase from '../components/pages/user/addCase';
// 直播
import LiveStreaming from '../components/pages/play/liveStreaming';

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
        children: [
            {
                path: '/home',
                component: HomePage,
                meta: {
                    title: '首页',
                }
            },
            {
                path: '/',
                component: HomePage,
                meta: {
                    title: '首页',
                }
            },
            {
                path: '/equipmentList',
                component: EquipmentList,
                meta: {
                    title: '设备列表',
                }
            },
            {
                path: '/addEquipment',
                component: AddEquipment,
                meta: {
                    title: '添加设备',
                }
            },
            {
                path: '/areaList',
                component: AreaList,
                meta: {
                    title: '区域列表',
                }
            },
            {
                path: '/userList',
                component: UserList,
                meta: {
                    title: '用户列表',
                }
            },
            {
                path: '/addUser',
                component: AddUser,
                meta: {
                    title: '添加用户',
                }
            },
            {
                path: '/medicalHistory',
                component: MedicalHistory,
                meta: {
                    title: '病史',
                }
            },
            {
                path: '/caseList',
                component: CaseList,
                meta: {
                    title: '病例',
                }
            },
            {
                path: '/addCase',
                component: AddCase,
                meta: {
                    title: '添加病例',
                }
            },
            {
                path: '/healthDataList',
                component: HealthDataList,
                meta: {
                    title: '健康数据',
                }
            },
            {
                path: '/liveStreaming',
                component: LiveStreaming,
                meta: {
                    title: '直播',
                }
            },
        ]
    },
];


const router = new VueRouter({
    routes
});
export default router;
