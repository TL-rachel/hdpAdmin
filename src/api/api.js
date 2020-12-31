/* eslint-disable */
import axios from 'axios';
import router from '../routes/routes';

let base = CAS_SERVER_URL;

//转换数据格式
var qs = require('qs');

var instance = axios.create({
    headers: {'content-type': 'application/json'}
});

// 统一拦截器，需要对错误编码进行处理
instance.interceptors.response.use(function (response) {
    // Do something with response data
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

// 角色列表
export const roleList = params => {
    return instance.post(`${base}/hdp/admin/role/list`, params);
};
/* eslint-disable */
