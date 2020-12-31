/* eslint-disable */
import axios from 'axios';
import router from '../routes/routes';

let base = CAS_SERVER_URL;

//转换数据格式
var qs = require('qs');

var instance = axios.create({
    headers: {'content-type': 'application/json'},
    // withCredentials: true
});

// 统一拦截器，需要对错误编码进行处理
instance.interceptors.response.use(function (response) {
    // Do something with response data
    // 判断是否有返回错误编码
    console.log(response)
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

// 添加管理员
export const adminList = params => {
    return instance.get(`${base}/hdp/admin/admin/list`, params);
};

/* eslint-disable */
