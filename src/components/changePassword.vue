<template>
    <div class="administrator equipmentList">
        <h4>修改密码</h4>
        <div class="form-save">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input class="w420" type="password" v-model="ruleForm.oldPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input class="w420" type="password" v-model="ruleForm.newPassword" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="operation-btn" label-width="0">
                    <el-button type="primary" @click="submitForm()">保 存</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {updatePassword} from '../api/api';
    export default {
        name: 'changePassword',
        data() {
            return {
                ruleForm: {
                    oldPassword: '', // 旧密码
                    newPassword: '', // 新密码
                    adminName: JSON.parse(sessionStorage.getItem('userData')).name,
                },
                // 必填校验
                rules: {
                    oldPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            /**
             * 提交数据
             */
            submitForm() {
                // 必填校验
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                            updatePassword(this.ruleForm).then(res => {
                                if (res.data.errno === 0) {
                                    // 成功
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.$router.back(-1);
                                } else {
                                    // 失败
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                    }
                });
            },
            /**
             * 返回上一页
             */
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .administrator {
        background: #fff;
        h4 {
            text-align: center;
            color: rgba(42, 42, 53, 100);
            font-size: 14px;
            height: 80px;
            line-height: 80px;
            font-family: PingFangSC-Medium;
        }
        .demo-ruleForm {
            width: 600px;
            display: inline-block;
            position: relative;
            left: 50%;
            margin-left: -300px;
            .el-form-item {
                width: 100%;
            }
        }
    }
    .el-form-item.is-error .el-input__inner,
    .el-form-item.is-error .el-input__inner:focus,
    .el-form-item.is-error .el-textarea__inner,
    .el-form-item.is-error .el-textarea__inner:focus,
    .el-message-box__input input.invalid,
    .el-message-box__input input.invalid:focus {
        border-color: #EB604B!important;
    }
</style>