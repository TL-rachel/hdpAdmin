/* eslint-disable */
import axios from 'axios';
import router from '../routes/routes';
import Cookie from 'js-cookie';

let base = CAS_SERVER_URL;

//转换数据格式
var qs = require('qs');
var instance = axios.create({
    headers: {'content-type': 'application/json','X-Dts-Admin-Token': sessionStorage.getItem('token')}
});
// 统一拦截器，需要对错误编码进行处理
instance.interceptors.response.use(function (response) {
    // Do something with response data
    Cookie.set('JSESSIONID',sessionStorage.getItem('token'));
    // 判断是否有返回错误编码
    if (!response.data) {
        //alert(response.data.errorCode);
        if (9999 === response.data) {
            router.replace({path: '/login'});
        } else if (0 === response.data) {

        } else {
            return;
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
// 登陆
export const getLogin = params => {
    return instance.post(`${base}/hdp/admin/auth/login`, params);
};
// 角色
export const roleOptions = params => {
    return instance.post(`${base}/hdp/admin/role/options`, params);
};

// 添加管理员
export const adminCreate = params => {
    return instance.post(`${base}/hdp/admin/admin/create`, params);
};

// 管理员列表
export const adminList = params => {
    return instance.post(`${base}/hdp/admin/admin/list`, params);
};

// 管理员详情
export const adminRead = params => {
    return instance.get(`${base}/hdp/admin/admin/read`,{params: params});
};

// 修改管理员
export const adminUpdate = params => {
    return instance.post(`${base}/hdp/admin/admin/update`, params);
};

// 添加角色
export const roleCreate = params => {
    return instance.post(`${base}/hdp/admin/role/create`, params);
};

// 添加角色
export const roleUpdate = params => {
    return instance.post(`${base}/hdp/admin/role/update`, params);
};

// 角色权限列表
export const rolePermissions = params => {
    return instance.get(`${base}/hdp/admin/role/permissions`,{params: params});
};

// 角色赋权
export const roleUpdatePermissions = params => {
    return instance.post(`${base}/hdp/admin/role/updatePermissions`, params);
};

// 角色列表
export const roleList = params => {
    return instance.post(`${base}/hdp/admin/role/list`, params);
};

// 操作类型
export const selectByOptType = params => {
    return instance.get(`${base}/hdp/admin/hd_operation_log/selectByOptType`,{params: params});
};

// 操作日志
export const operationLogList = params => {
    return instance.get(`${base}/hdp/admin/hd_operation_log/list`,{params: params});
};

// 创建用户
export const userCreate = params => {
    return instance.post(`${base}/hdp/admin/user/create`, params);
};

// 用户列表
export const hdUserList = params => {
    return instance.get(`${base}/hdp/admin/user/list`,{params: params});
};

// 所属企业列表
export const hdCompanyList = params => {
    return instance.get(`${base}/hdp/admin/hd_company/list`,{params: params});
};

// 所属企业列表
export const companyCreate = params => {
    return instance.post(`${base}/hdp/admin/hd_company/create`,params);
};

/* eslint-disable */
