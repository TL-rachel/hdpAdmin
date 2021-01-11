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
// 添加区域
import AddArea from '../components/pages/area/addArea';
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
// 管理员
import AdministratorList from '../components/pages/system/administratorList';
// 添加管理员
import AddAdministrator from '../components/pages/system/addAdministrator';
// 角色列表
import RoleManagement from '../components/pages/system/roleManagement';
// 操作日志
import OperationLog from '../components/pages/system/operationLog';
// 企业管理列表
import CompanyList from '../components/pages/company/companyList';
// 添加企业
import AddCompany from '../components/pages/company/addCompany';
// 企业入驻页 单独页面
import CompanyEnter from '../components/pages/companyEnter';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/companyEnter',
        component: CompanyEnter,
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
                    title: '设备管理/设备列表',
                }
            },
            {
                path: '/addEquipment',
                component: AddEquipment,
                meta: {
                    title: '设备管理/设备列表/添加设备',
                }
            },
            {
                path: '/areaList',
                component: AreaList,
                meta: {
                    title: '设备管理/区域列表',
                }
            },
            {
                path: '/userList',
                component: UserList,
                meta: {
                    title: '用户管理/用户列表',
                }
            },
            {
                path: '/addUser',
                component: AddUser,
                meta: {
                    title: '用户管理/用户列表/添加用户',
                }
            },
            {
                path: '/medicalHistory',
                component: MedicalHistory,
                meta: {
                    title: '用户管理/健康数据/病史',
                }
            },
            {
                path: '/caseList',
                component: CaseList,
                meta: {
                    title: '用户管理/健康数据/病例',
                }
            },
            {
                path: '/addCase',
                component: AddCase,
                meta: {
                    title: '用户管理/健康数据/添加病例',
                }
            },
            {
                path: '/healthDataList',
                component: HealthDataList,
                meta: {
                    title: '用户管理/健康数据',
                }
            },
            {
                path: '/liveStreaming',
                component: LiveStreaming,
                meta: {
                    title: '设备管理/设备列表/直播',
                }
            },
            {
                path: '/administratorList',
                component: AdministratorList,
                meta: {
                    title: '系统管理/管理员',
                }
            },
            {
                path: '/addAdministrator',
                component: AddAdministrator,
                meta: {
                    title: '系统管理/管理员/添加管理员',
                }
            },
            {
                path: '/roleManagement',
                component: RoleManagement,
                meta: {
                    title: '系统管理/角色管理',
                }
            },
            {
                path: '/operationLog',
                component: OperationLog,
                meta: {
                    title: '系统管理/操作日志',
                }
            },
            {
                path: '/companyList',
                component: CompanyList,
                meta: {
                    title: '企业管理/企业管理列表',
                }
            },
            {
                path: '/addCompany',
                component: AddCompany,
                meta: {
                    title: '企业管理/企业管理列表/添加企业',
                }
            },
            {
                path: '/addArea',
                component: AddArea,
                meta: {
                    title: '设备管理/区域管理/添加区域',
                }
            },
        ]
    },
];


const router = new VueRouter({
    routes
});
export default router;
