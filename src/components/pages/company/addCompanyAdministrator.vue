<template>
    <div class="administrator equipmentList">
        <div class="form-save">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号ID">
                    <el-input class="w420" disabled v-model="ruleForm.id" placeholder="请输入id"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="username">
                    <el-input class="w420" v-model="ruleForm.username" placeholder="请输入账号名称"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input class="w420" type="password" v-model="ruleForm.password" placeholder="请输入密码，需包含6位以上字母+数字"></el-input>
                </el-form-item>
                <el-form-item label="归属企业" prop="companyId">
                    <el-select class="w420" v-model="ruleForm.companyId" placeholder="请选择归属企业" @change="change()">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="username2">
                    <el-input class="w420" v-model="ruleForm.username2" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select class="w420" v-model="ruleForm.roleId" placeholder="请选择角色" @change="change()">
                        <el-option v-for="(item,index) in options" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系方式" prop="tel">
                    <el-input class="w420" v-model="ruleForm.tel" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="deleted">
                    <el-select class="w420" v-model="ruleForm.deleted" placeholder="请选择状态" @change="change()">
                        <el-option label="有效" :value="0"></el-option>
                        <el-option label="无效" :value="1"></el-option>
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
    import {qyAdminUpdate, roleOptions, qyAdminCreate, hdCompanyList,qyAdminRead} from '../../../api/api';
    export default {
        name: 'addAdministrator',
        data() {
            return {
                ruleForm: {
                    id: '',
                    username: '', // 账号
                    password: '', // 初始密码
                    username2: '', // 姓名
                    tel: '', // 手机号
                    roleId: '', // 角色
                    companyId: '', // 企业id
                    deleted: 0, // 状态
                },
                // 必填校验
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '请输入6位以上字母+数字', trigger: 'blur' }
                    ],
                    username2: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    companyId: [
                        { required: true, message: '请选择企业', trigger: 'change' }
                    ],
                    deleted: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ]
                },
                // 所属企业列表
                companyList: [],
                // 角色列表
                options: [],
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
                }
            });
            // 获取归属企业列表
            hdCompanyList({page: 1,limit: 1000,sort: 'created_time',order: 'desc'}).then(res => {
                if (res.data.errno === 0) {
                    this.companyList = res.data.data.items;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 获取详情
            if (this.$route.query.id) {
                qyAdminRead({id: this.$route.query.id}).then(res => {
                    if (res.data.errno === 0) {
                        this.ruleForm = res.data.data;
                        this.ruleForm.roleId = res.data.data.roleIds[0];
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            }
            // 权限
            let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
            for (let i = 0; i < assignedPermissions.length; i++) {
                if (assignedPermissions[i] === 'admin:qyAdmin:create' || assignedPermissions[i] === 'admin:hdCompany:update') {
                    this.jurisdictionList.adDisabled = true;
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
                        if (this.$route.query.id) {
                            // 编辑
                            qyAdminUpdate(para).then(res => {
                                if (res.data.errno === 0) {
                                    // 成功
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.$router.push('/companyAdministratorList');
                                } else {
                                    // 失败
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            // 新增
                            qyAdminCreate(para).then(res => {
                                if (res.data.errno === 0) {
                                    // 成功
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.$router.push('/companyAdministratorList');
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
</style>