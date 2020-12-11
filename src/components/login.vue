<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" class="login-input" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="login-input"
                              type="password"
                              placeholder="密码"
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
                },
                // 必填项校验
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
            };
        },
        methods: {
            /**
             * 登陆
             */
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        console.log(valid);
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
        /*background-image: url(../common/image/bg.jpg);*/
        background-size: cover;
        background-repeat: no-repeat;
    }

    .ms-title {
        width: 100%;
        line-height: 30px;
        text-align: center;
        font-size: 30px;
        color: #2B4D7E;
        margin-top: 80px;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 744px;
        height: 452px;
        margin: -221px 0 0 -377px;
        border-radius: 5px;
        /*background-image: url(../common/image/Group.png);*/
        background-size: cover;
        background-repeat: no-repeat;
        overflow: hidden;
        padding-left: 377px;
        box-shadow: 0px 6px 16px rgba(24, 48, 76, 0.4);
    }

    .ms-content {
        /*padding: 50px;*/
        width: 248px;
        margin: auto;
        margin-top: 65px;
        .el-input__inner{
            border: none;
            border-bottom: 1px solid #d5dce6;
            padding: 0;
        }
    }

    .login-btn {
        text-align: center;
        margin-top: 40px;
        .el-button--primary {
            text-align: center;
            width: 248px;
            height: 34px;
            line-height: 34px;
            padding: 0;
            background: #5c7aa9;
            border-radius: 2px;
            margin-top: 10px;
            border-color: #5c7aa9;
        }
        .el-button--primary:hover {
            background: rgba(92, 122, 169, .9);
            border-color: rgba(92, 122, 169, .9);
        }
    }

    .login-input > .el-input__inner {
        border: 0;
        border-bottom: 1px solid #D5DCE6;
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
