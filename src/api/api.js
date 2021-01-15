/* eslint-disable */
import axios from 'axios';
import router from '../routes/routes';
import Cookie from 'js-cookie';

let base = CAS_SERVER_URL;

//转换数据格式
var instance = axios.create({
    headers: {'content-type': 'application/json'}
});

instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    //判断是否存在token，如果存在将每个页面header都添加token
    if (sessionStorage.getItem('token')) {
        config.headers.common['X-Dts-Admin-Token']=sessionStorage.getItem('token');
        Cookie.set('JSESSIONID',sessionStorage.getItem('token'));
    }
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 统一拦截器，需要对错误编码进行处理
instance.interceptors.response.use(response => {
    // Do something with response data
    //判断是否存在token，如果存在将每个页面header都添加token
    if(!sessionStorage.getItem('token')){
        router.replace({path: '/login'});
    }

    // 判断是否有返回错误编码
    if (!response.data) {
        //alert(response.data.errorCode);
        if (501 === response.data.errno) {
            router.replace({path: '/login'});
        } else if (0 === response.data) {

        } else {
            return;
        }
    }
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});
// 登陆
export const getLogin = params => {
    return instance.post(`${base}/admin/auth/login`, params);
};

// 登录人员信息
export const authInfo = params => {
    return instance.get(`${base}/admin/auth/info`, {params: params});
};

// 角色
export const roleOptions = params => {
    return instance.post(`${base}/admin/role/options`, params);
};

// 添加管理员
export const adminCreate = params => {
    return instance.post(`${base}/admin/admin/create`, params);
};

// 管理员列表
export const adminList = params => {
    return instance.post(`${base}/admin/admin/list`, params);
};

// 管理员详情
export const adminRead = params => {
    return instance.get(`${base}/admin/admin/read`,{params: params});
};

// 修改管理员
export const adminUpdate = params => {
    return instance.post(`${base}/admin/admin/update`, params);
};

// 添加角色
export const roleCreate = params => {
    return instance.post(`${base}/admin/role/create`, params);
};

// 添加角色
export const roleUpdate = params => {
    return instance.post(`${base}/admin/role/update`, params);
};

// 角色权限列表
export const rolePermissions = params => {
    return instance.get(`${base}/admin/role/permissions`,{params: params});
};

// 角色赋权
export const roleUpdatePermissions = params => {
    return instance.post(`${base}/admin/role/updatePermissions`, params);
};

// 角色列表
export const roleList = params => {
    return instance.post(`${base}/admin/role/list`, params);
};

// 操作类型
export const selectByOptType = params => {
    return instance.get(`${base}/admin/hd_operation_log/selectByOptType`,{params: params});
};

// 操作日志
export const operationLogList = params => {
    return instance.get(`${base}/admin/hd_operation_log/list`,{params: params});
};

// 创建用户
export const userCreate = params => {
    return instance.post(`${base}/admin/user/create`, params);
};

// 修改用户
export const userUpdate = params => {
    return instance.post(`${base}/admin/user/update`, params);
};

// 用户详情
export const userRead = params => {
    return instance.get(`${base}/admin/user/read/` + params);
};

// 用户一键更新faceId
export const userBatchFaceId = params => {
    return instance.get(`${base}/admin/user/batchFaceId`,{params: params});
};

// 删除用户
export const userDelete = params => {
    return instance.post(`${base}/admin/user/delete/` + params);
};

// 批量删除用户
export const userBatchDelete = params => {
    return instance.get(`${base}/admin/user/batch-delete`, {params: params});
};

// 用户列表
export const hdUserList = params => {
    return instance.get(`${base}/admin/user/list`,{params: params});
};

// 所属企业列表
export const hdCompanyList = params => {
    return instance.get(`${base}/admin/hd_company/list`,{params: params});
};

// 新增企业列表
export const companyCreate = params => {
    return instance.post(`${base}/admin/hd_company/create`,params);
};

// 删除企业
export const companyDelete = params => {
    return instance.get(`${base}/admin/hd_company/delete`,{params: params});
};

// 批量删除企业
export const companyBatchDelete = params => {
    return instance.get(`${base}/admin/hd_company/batch-delete`,{params: params});
};

// 企业详情
export const companyRead = params => {
    return instance.get(`${base}/admin/hd_company/read`,{params: params});
};

// 企业变更
export const companyUpdate = params => {
    return instance.post(`${base}/admin/hd_company/update`,params);
};

// 区域列表
export const regionList = params => {
    return instance.get(`${base}/admin/hd_region/list`,{params: params});
};

// 企业管理员列表
export const qyAdminList = params => {
    return instance.get(`${base}/admin/qy_admin/list`,{params: params});
};

// 企业管理员新增
export const qyAdminCreate = params => {
    return instance.post(`${base}/admin/qy_admin/create`,params);
};

// 企业管理员删除一个
export const qyAdminDelete = params => {
    return instance.get(`${base}/admin/qy_admin/delete`,{params: params});
};

// 企业管理员删除多个
export const qyAdminBatchDelete = params => {
    return instance.get(`${base}/admin/qy_admin/batch-delete`,{params: params});
};

// 企业管理员详情
export const qyAdminRead = params => {
    return instance.get(`${base}/admin/qy_admin/read`,{params: params});
};

// 企业管理员编辑
export const qyAdminUpdate = params => {
    return instance.post(`${base}/admin/qy_admin/update`,params);
};

// 设备获取播放地址
export const checkDevicePath = params => {
    return instance.get(`${base}/admin/hd_device/checkDevicePath`,{params: params});
};

// 新增区域
export const regionCreate = params => {
    return instance.post(`${base}/admin/hd_region/create`,params);
};

// 修改区域
export const regionUpdate = params => {
    return instance.post(`${base}/admin/hd_region/update`,params);
};

// 区域详情
export const regionRead = params => {
    return instance.get(`${base}/admin/hd_region/read`,{params: params});
};
// 区域批量删除
export const regionBatchDelete = params => {
    return instance.get(`${base}/admin/hd_region/batch-delete`,{params: params});
};
// 区域删除
export const regionDelete = params => {
    return instance.get(`${base}/admin/hd_region/delete`,{params: params});
};

// 设备列表
export const deviceList = params => {
    return instance.get(`${base}/admin/hd_device/list`,{params: params});
};

// 设备列表
export const regionAllRegions = params => {
    return instance.get(`${base}/admin/hd_region/allRegions`,{params: params});
};

// 新增设备
export const deviceCreate = params => {
    return instance.post(`${base}/admin/hd_device/create`,params);
};

// 修改设备
export const deviceUpdate = params => {
    return instance.post(`${base}/admin/hd_device/update`,params);
};

// 设备详情
export const deviceRead = params => {
    return instance.get(`${base}/admin/hd_device/read`,{params: params});
};

// 厂商 和 设备类型
export const getCommonValues = params => {
    return instance.get(`${base}/admin/common/getCommonValues`,{params: params});
};
// 设备批量删除
export const deviceBatchDelete = params => {
    return instance.get(`${base}/admin/hd_device/batch-delete`,{params: params});
};
// 设备删除
export const deviceDelete = params => {
    return instance.get(`${base}/admin/hd_device/delete`,{params: params});
};

// 图表数据接口
export const adminChart = params => {
    return instance.get(`${base}/admin/admin/chart`,{params: params});
};

// 删除角色
export const roleBatchDelete = params => {
    return instance.get(`${base}/admin/role/batchDelete`, {params: params});
};

// 批量删除管理员
export const adminBatchDelete = params => {
    return instance.get(`${base}/admin/admin/batchDelete`, {params: params});
};

// 删除管理员
export const adminDelete = params => {
    return instance.post(`${base}/admin/admin/delete`, params);
};

// 所有用户的心率疲劳度列表
export const userHealthDataList = params => {
    return instance.get(`${base}/admin/user/healthDataList`,{params: params});
};

// 用户心率数据查询列表
export const heartRateList = params => {
    return instance.get(`${base}/admin/hd_heart_rate/list`,{params: params});
};

// 用户疲劳数据查询列表
export const fatigueList = params => {
    return instance.get(`${base}/admin/hd_fatigue/list`,{params: params});
};

// 修改密码
export const updatePassword = params => {
    return instance.post(`${base}/admin/admin/updatePassword`,params);
};

// 企业下拉框列表
export const companyAllList = params => {
    return instance.get(`${base}/admin/hd_company/allList`,{params: params});
};

// 所有区域
export const allRegions = params => {
    return instance.get(`${base}/admin/hd_region/allRegions`,{params: params});
};

// 所有设备
export const allDevice = params => {
    return instance.get(`${base}/admin/hd_device/queryDeviceByRegionId`,{params: params});
};

// 获取视屏
export const queryVideos = params => {
    return instance.get(`${base}/admin/hd_device/queryVideos`,{params: params});
};

// 新增用户病史数据
export const medicalCreate = params => {
    return instance.post(`${base}/admin/hd_medical/create`,params);
};

// 新增用户病例数据
export const medicalCaseCreate = params => {
    return instance.post(`${base}/admin/hd_medical_case/create`,params);
};

// 修改用户病史数据
export const medicalUpdate = params => {
    return instance.post(`${base}/admin/hd_medical/update`,params);
};

// 修改用户病例数据
export const medicalCaseUpdate = params => {
    return instance.post(`${base}/admin/hd_medical_case/update`,params);
};

// 新增用户病例
export const medicalCaseList = params => {
    return instance.get(`${base}/admin/hd_medical_case/list`,{params: params});
};

// 用户病例详情
export const medicalCaseRead = params => {
    return instance.get(`${base}/admin/hd_medical_case/read/` + params,);
};

// 用户病史数据详情
export const medicalRead = params => {
    return instance.get(`${base}/admin/hd_medical/read/` + params);
};

// 删除用户病例
export const medicalCaseDelete = params => {
    return instance.post(`${base}/admin/hd_medical_case/delete/` + params);
};

// 批量删除用户病例
export const medicalCaseBatchDelete = params => {
    return instance.get(`${base}/admin/hd_medical_case/batch-delete`,{params: params});
};
/* eslint-disable */
