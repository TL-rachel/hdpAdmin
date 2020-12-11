/* eslint-disable */
import axios from 'axios';
import router from '../routes/routes';

let base = CAS_SERVER_URL;

//转换数据格式
var qs = require('qs');

var instance = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    withCredentials: true   //加了这段就可以跨域了
});

// 统一拦截器，需要对错误编码进行处理
instance.interceptors.response.use(function (response) {
    // Do something with response data
    // 判断是否有返回错误编码
    if (!response.data.result) {
        //alert(response.data.errorCode);
        if (9999 === response.data.errorCode) {
            router.replace({path: '/login'});
        } else if (0 === response.data.errorCode) {

        } else {
            return;
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


/* eslint-disable */
