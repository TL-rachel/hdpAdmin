<template>
    <div class="login-wrap">
        <div class="ms-login">
            <h4>智能健康管理系统</h4>
            <div class="ms-title">登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <span class="hint">用户名</span>
                <el-form-item prop="username">
                    <el-input v-model="param.username" class="login-input" placeholder="请输入您的用户名"></el-input>
                </el-form-item>
                <span class="hint">密码</span>
                <el-form-item prop="password">
                    <el-input class="login-input"
                              type="password"
                              placeholder="请输入您的密码"
                              v-model="param.password"
                              @keyup.enter.native="submitForm()"
                    >
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登 &nbsp; 录</el-button>
                </div>
            </el-form>
        </div>
        <div class="login-footer">零睿科技</div>
    </div>
</template>

<script>
    import {getLogin,authInfo} from '../api/api';

    export default {
        data: function () {
            return {
                // 提交信息
                param: {
                    username: '', // 用户名
                    password: '', // 密码
                    remember: '', // 记住密码
                },
                // 必填项校验
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
                loginFlag: true,
            };
        },
        created() {
            if (this.getCookie('username') && this.getCookie('password')) {
                this.param.username = this.getCookie('username');
                this.param.password = this.getCookie('password');
            }
        },
        methods: {
            /**
             *  [getCookie 获取cookie]
             *  @param {String} key 获取cookie的名称
             * @returns {String} 返回cookie值
             */
            getCookie(key) {
                let arr1 = document.cookie.split('; ');//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
                for (let i = 0; i < arr1.length; i++) {
                    let arr2 = arr1[i].split('=');//通过=截断，把name=Jack截断成[name,Jack]数组；
                    if (arr2[0] === key) {
                        return decodeURI(arr2[1]);
                    }
                }
            },
            /**
             * 登陆
             */
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        let para = {
                            username: this.param.username,
                            password: this.param.password
                        };
                        if (this.loginFlag) {
                            this.loginFlag = false;
                            getLogin(para).then((res) => {
                                if (res.data.errno === 0) {
                                    sessionStorage.setItem('token', res.data.data);
                                    authInfo().then(res1 => {
                                        if (res1.data.errno === 0) {
                                            if (this.param.remember) {
                                                window.document.cookie = 'username=' + this.param.username;
                                                window.document.cookie = 'password=' + this.param.password;
                                            }
                                            this.$message({
                                                showClose: true,
                                                message: '登陆成功',
                                                type: 'success'
                                            });
                                            sessionStorage.setItem('userData', JSON.stringify(res1.data.data));
                                            this.$router.push('/');
                                        } else {
                                            this.loginFlag = true;
                                            this.$message({
                                                showClose: true,
                                                message: res1.data.errmsg,
                                                type: 'error'
                                            });
                                        }
                                    });
                                } else {
                                    this.param.verifyCode = '';
                                    this.loginFlag = true;
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });
            }
        },
    };
</script>

<style lang="less">
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../common/image/Login-bg1.png");
        background-size: cover;
    }

    .ms-title {
        width: 100%;
        line-height: 30px;
        font-size: 30px;
        color: #1B1E24;
        text-align: center;
    }

    .left-login {
        width: 50%;
        height: 100%;
        float: left;
        position: relative;
        .enroll {
            width: 100%;
            position: absolute;
            bottom: 80px;
            text-align: center;
            color: #778CA2;
            span {
                color: #4D7CFE;
                cursor: pointer;
            }
        }
    }

    .ms-login {
        width: 555px;
        height: auto;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -275px;
        margin-top: -223px;
        display: inline-block;
        padding: 50px 100px;
        background: #fff;
        border-radius: 6px;
        box-shadow: 0px 2px 80px 0px rgba(37, 38, 49, 0.05);
        .hint {
            font-size: 14px;
            color: #252631;
        }
        .or {
            margin-top: 26px;
            color: #E8ECEF;
            display: inline-block;
            width: 100%;
            text-align: center;
            position: relative;
        }
        .or:after {
            width: 120px;
            height: 1px;
            content: "";
            background: #E8ECEF;
            color: #E8ECEF;
            display: inline-block;
            position: absolute;
            top: 10px;
            right: 40px;
        }
        .or:before {
            width: 120px;
            height: 1px;
            content: "";
            background: #E8ECEF;
            color: #E8ECEF;
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 40px;
        }
        h4 {
            color: rgba(255, 255, 255, 100);
            font-size: 20px;
            position: absolute;
            top: -60px;
            width: 100%;
            text-align: center;
            margin-left: -100px;
        }
    }
    .ms-content {
        margin-top: 60px;
        .el-input__inner{
            border: none;
            border-bottom: 1px solid #d5dce6;
            padding: 0;
            height: 52px;
            line-height: 52px;
            margin-top: 10px;
        }
    }

    .login-btn {
        text-align: center;
        margin-top: 20px;
        .el-button--primary {
            text-align: center;
            height: 54px;
            line-height: 54px;
            width: 100%;
            padding: 0;
            background: #F8FAFB;
            border-radius: 4px;
            border-color: #F8FAFB;
            color: #4D7CFE;
        }
        .el-button--primary:hover {
            background: #F8FAFB;
            border-color: #F8FAFB;
            color: #4D7CFE;
        }
    }

    .crypto-operation {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .forget-psw {
            color: #4D7CFE;
        }
    }

    .login-input > .el-input__inner {
        border: 1px solid #E8ECEF;
        border-radius: 4px;
        padding: 16px;
    }

    .verifyCode {
        width: 80px;
        display: inline-block;

        img {
            vertical-align: top;
        }

    }
    .provider {
        width: 100%;
        position: absolute;
        bottom: 10px;
        text-align: center;
        color: #fff;
    }
    #app {
        min-width: 144px!important;
    }
    .login-footer{
        position: absolute;
        margin: 10px auto;
        bottom: 0;
        text-align: center;
        width: 100%;
        color: #A4BACA;
        font-size: 20px;
    }
</style>
