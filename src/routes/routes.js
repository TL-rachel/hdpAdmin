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
// 查看病史
import MedicalHistoryDetail from '../components/pages/user/medicalHistoryDetail';
// 病例
import CaseList from '../components/pages/user/caseList';
// 添加病例
import AddCase from '../components/pages/user/addCase';
// 直播
import LiveStreaming from '../components/pages/play/liveStreaming';
// 录播
import RecordedBroadcast from '../components/pages/play/recordedBroadcast';
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
// 心率数据
import HeartRateList from '../components/pages/healthData/heartRateList';
// 疲劳数据
import FatigueList from '../components/pages/healthData/fatigueList';
// 情绪数据
import EmotionList from '../components/pages/healthData/emotionList';
// 修改密码
import ChangePassword from '../components/changePassword';
// 企业管理员
import CompanyAdministratorList from '../components/pages/company/companyAdministratorList';
// 企业管理员添加
import AddCompanyAdministrator from '../components/pages/company/addCompanyAdministrator';
// 企业准入审核列表
import CompanyAuditList from '../components/pages/company/companyAuditList';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/changePassword',
        component: ChangePassword,
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
                    icon: 'icon-picture-nav-home',
                    flag: 1
                }
            },
            {
                path: '/',
                component: HomePage,
                meta: {
                    title: '首页',
                    icon: 'icon-picture-nav-home',
                    flag: 1
                }
            },
            {
                path: '/equipmentList',
                component: EquipmentList,
                meta: {
                    title: '设备管理 / 设备列表',
                    icon: 'icon-picture-nav-equipment',
                    flag: 1
                }
            },
            {
                path: '/addEquipment',
                component: AddEquipment,
                meta: {
                    title: '设备管理 / 设备列表 / 添加设备',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
            {
                path: '/addEquipmentDetail',
                component: AddEquipment,
                meta: {
                    title: '设备管理 / 设备列表 / 查看设备',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
            {
                path: '/addEquipmentUpdate',
                component: AddEquipment,
                meta: {
                    title: '设备管理 / 设备列表 / 编辑设备',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
            {
                path: '/areaList',
                component: AreaList,
                meta: {
                    title: '设备管理 / 区域列表',
                    icon: 'icon-picture-nav-equipment',
                    flag: 1
                }
            },
            {
                path: '/userList',
                component: UserList,
                meta: {
                    title: '用户管理 / 用户列表',
                    icon: 'icon-picture-nav-people',
                    flag: 1
                }
            },
            {
                path: '/addUser',
                component: AddUser,
                meta: {
                    title: '用户管理 / 用户列表 / 添加用户',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/addUserUpdate',
                component: AddUser,
                meta: {
                    title: '用户管理 / 用户列表 / 编辑用户',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/addUserDetail',
                component: AddUser,
                meta: {
                    title: '用户管理 / 用户列表 / 查看用户',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/medicalHistory',
                component: MedicalHistory,
                meta: {
                    title: '用户管理 / 健康数据 / 编辑病史',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/medicalHistoryDetail',
                component: MedicalHistoryDetail,
                meta: {
                    title: '用户管理 / 健康数据 / 查看病史',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/heartRateList',
                component: HeartRateList,
                meta: {
                    title: '用户管理 / 健康数据 / 心率数据',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/fatigueList',
                component: FatigueList,
                meta: {
                    title: '用户管理 / 健康数据 / 疲劳数据',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/emotionList',
                component: EmotionList,
                meta: {
                    title: '用户管理 / 健康数据 / 情绪数据',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/caseList',
                component: CaseList,
                meta: {
                    title: '用户管理 / 健康数据 / 病例',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/addCase',
                component: AddCase,
                meta: {
                    title: '用户管理 / 健康数据 / 添加病例',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/addCaseUpdate',
                component: AddCase,
                meta: {
                    title: '用户管理 / 健康数据 / 编辑病例',
                    icon: 'icon-picture-nav-people',
                    flag: 2
                }
            },
            {
                path: '/healthDataList',
                component: HealthDataList,
                meta: {
                    title: '用户管理 / 健康数据',
                    icon: 'icon-picture-nav-people',
                    flag: 1
                }
            },
            {
                path: '/liveStreaming',
                component: LiveStreaming,
                meta: {
                    title: '设备管理 / 设备列表 / 视频直播',
                    icon: 'icon-picture-nav-equipment',
                    flag: 1
                }
            },
            {
                path: '/recordedBroadcast',
                component: RecordedBroadcast,
                meta: {
                    title: '设备管理 / 设备列表 / 视频录播',
                    icon: 'icon-picture-nav-equipment',
                    flag: 1
                }
            },
            {
                path: '/administratorList',
                component: AdministratorList,
                meta: {
                    title: '系统管理 / 管理员',
                    icon: 'icon-picture-nav-system',
                    flag: 1
                }
            },
            {
                path: '/addAdministrator',
                component: AddAdministrator,
                meta: {
                    title: '系统管理 / 管理员 / 添加管理员',
                    icon: 'icon-picture-nav-system',
                    flag: 2
                }
            },
            {
                path: '/addAdministratorUpdate',
                component: AddAdministrator,
                meta: {
                    title: '系统管理 / 管理员 / 编辑管理员',
                    icon: 'icon-picture-nav-system',
                    flag: 2
                }
            },
            {
                path: '/roleManagement',
                component: RoleManagement,
                meta: {
                    title: '系统管理 / 角色管理',
                    icon: 'icon-picture-nav-system',
                    flag: 1
                }
            },
            {
                path: '/operationLog',
                component: OperationLog,
                meta: {
                    title: '系统管理 / 操作日志',
                    icon: 'icon-picture-nav-system',
                    flag: 1
                }
            },
            {
                path: '/companyList',
                component: CompanyList,
                meta: {
                    title: '企业管理 / 企业管理列表',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 1
                }
            },
            {
                path: '/companyAdministratorList',
                component: CompanyAdministratorList,
                meta: {
                    title: '企业管理 / 企业管理员列表',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 1
                }
            },
            {
                path: '/companyAuditList',
                component: CompanyAuditList,
                meta: {
                    title: '企业管理 / 企业准入审核',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 1
                }
            },
            {
                path: '/addCompanyAdministrator',
                component: AddCompanyAdministrator,
                meta: {
                    title: '企业管理 / 企业管理员列表 / 添加企业管理员',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyAdministratorUpdate',
                component: AddCompanyAdministrator,
                meta: {
                    title: '企业管理 / 企业管理员列表 / 编辑企业管理员',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompany',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 添加企业',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyAudit',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 审核企业',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyAuditRead',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 审核企业查看',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyUpdate',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 编辑企业',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyDetail',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 查看企业',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addCompanyDetail',
                component: AddCompany,
                meta: {
                    title: '企业管理 / 企业管理列表 / 查看企业',
                    icon: 'icon-picture-nav-enterprise',
                    flag: 2
                }
            },
            {
                path: '/addArea',
                component: AddArea,
                meta: {
                    title: '设备管理 / 区域管理 / 添加区域',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
            {
                path: '/addAreaUpdate',
                component: AddArea,
                meta: {
                    title: '设备管理 / 区域管理 / 修改区域',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
            {
                path: '/addAreaDetail',
                component: AddArea,
                meta: {
                    title: '设备管理 / 区域管理 / 查看区域',
                    icon: 'icon-picture-nav-equipment',
                    flag: 2
                }
            },
        ]
    },
];


const router = new VueRouter({
    routes
});
export default router;
