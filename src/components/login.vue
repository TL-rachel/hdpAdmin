<template>
    <div class="login-wrap clearfix">
        <div class="left-login">
            <div class="ms-login">
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
                    <div class="crypto-operation">
                        <span class="remember-psw"><input type="checkbox" v-model="param.remember">记住密码</span>
                        <span class="forget-psw">忘记密码找回</span>
                    </div>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm()">登 &nbsp; 录</el-button>
                    </div>
                </el-form>
                <span class="or">OR</span>
            </div>
            <div class="enroll">
                Don’t have an account? <span>Sign up here</span>
            </div>
        </div>
        <div class="right-img">

        </div>
    </div>
</template>

<script>
    import {} from '../api/api';

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
                        if (this.param.remember) {
                            window.document.cookie = 'username=' + this.param.username;
                            window.document.cookie = 'password=' + this.param.password;
                        }
                        this.$router.push('/');
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
        background-size: cover;
        background-repeat: no-repeat;
    }

    .ms-title {
        width: 100%;
        line-height: 30px;
        font-size: 30px;
        color: #1B1E24;
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
        width: 360px;
        height: auto;
        margin: 0 auto;
        position: relative;
        top: 50%;
        margin-top: -250px;
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
    }

    .right-img {
        width: 50%;
        background: #0e90d2;
        height: 100%;
        float: right;
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
            background: #4D7CFE;
            border-radius: 4px;
            border-color: #4D7CFE;
        }
        .el-button--primary:hover {
            background: #4D7CFE;
            border-color: #4D7CFE;
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
</style>
