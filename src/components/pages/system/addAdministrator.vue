<template>
    <div class="administrator equipmentList">
<!--        <h4>{{$route.query.id?'编辑管理员':'新增管理员'}}</h4>-->
        <div class="form-save">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input class="w420" v-model="ruleForm.username" placeholder="包含英文字母"></el-input>
                </el-form-item>
                <el-form-item :label="$route.query.id?'密码':'初始密码'" :prop="$route.query.id?'':'password'">
                    <el-input class="w420" v-model="ruleForm.password" :placeholder="$route.query.id?'如需修改请输入新密码':'请输入密码'"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="username2">
                    <el-input class="w420" v-model="ruleForm.username2" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="tel">
                    <el-input class="w420" v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select class="w420" v-model="ruleForm.roleId" placeholder="请选择角色" @change="change()">
                        <el-option v-for="(item,index) in options" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select class="w420" v-model="ruleForm.status" placeholder="请选择状态" @change="change()">
                        <el-option label="有效" value="00"></el-option>
                        <el-option label="无效" value="01"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="operation-btn" label-width="0">
                    <el-button v-if="jurisdictionList.adDisabled" type="primary" @click="submitForm()">保 存</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {adminCreate,roleOptions,adminUpdate,adminRead} from '../../../api/api';
    export default {
        name: 'addAdministrator',
        data() {
            return {
                ruleForm: {
                    username: '', // 账号
                    password: '', // 初始密码
                    username2: '', // 姓名
                    tel: '', // 手机号
                    roleId: '', // 角色
                    status: '', // 状态
                },
                // 必填校验
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 1, max: 12, message: '长度小于等于12 位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    username2: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ]
                },
                // 角色列表
                options: [],
                submitBtn: true,
                jurisdictionList: {
                    adDisabled: false,
                }
            };
        },
        created() {
            // 获取角色列表
            roleOptions().then(res => {
                if (res.data.errno === 0) {
                    this.options = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: '角色列表' + res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 获取管理员详情
            if (this.$route.query.id) {
                adminRead({id: this.$route.query.id}).then(res => {
                    if (res.data.errno === 0) {
                        // 成功
                        this.ruleForm = JSON.parse(JSON.stringify(res.data.data));
                        this.ruleForm.roleId = this.ruleForm.roleIds[0];
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
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:admin:create' || assignedPermissions[i] === 'admin:admin:update') {
                        this.jurisdictionList.adDisabled = true;
                    }
                }
            }
        },
        methods: {
            /**
             * element select 失效问题 强制渲染
             */
            change() {
              this.$forceUpdate();
            },
            /**
             * 提交数据
             */
            submitForm() {
                // 必填校验
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        let para = JSON.parse(JSON.stringify(this.ruleForm));
                        para.roleIds = [];
                        para.roleIds.push(para.roleId);
                        delete para.roleId;
                        if (this.submitBtn) {
                            this.submitBtn = false;
                            if (this.$route.query.id) {
                                // 编辑
                                adminUpdate(para).then(res => {
                                    if (res.data.errno === 0) {
                                        // 成功
                                        this.$message({
                                            showClose: true,
                                            message: res.data.errmsg,
                                            type: 'success'
                                        });
                                        this.$router.push('/administratorList');
                                    } else {
                                        // 失败
                                        this.$message({
                                            showClose: true,
                                            message: res.data.errmsg,
                                            type: 'error'
                                        });
                                        this.submitBtn = true;
                                    }
                                });
                            } else {
                                // 新增
                                adminCreate(para).then(res => {
                                    if (res.data.errno === 0) {
                                        // 成功
                                        this.$message({
                                            showClose: true,
                                            message: res.data.errmsg,
                                            type: 'success'
                                        });
                                        this.$router.push('/administratorList');
                                    } else {
                                        // 失败
                                        this.$message({
                                            showClose: true,
                                            message: res.data.errmsg,
                                            type: 'error'
                                        });
                                        this.submitBtn = true;
                                    }
                                });
                            }
                        }
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