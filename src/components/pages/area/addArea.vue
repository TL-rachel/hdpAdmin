<template>
    <div class="administrator equipmentList">
        <h4>新增区域</h4>
        <div class="form-save">
            <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="demo-ruleForm">
                <el-form-item label="区域编号" prop="username">
                    <el-input class="w420" v-model="form.username" placeholder="请输入区域编号"></el-input>
                </el-form-item>
                <el-form-item label="区域名称" prop="username2">
                    <el-input class="w420" v-model="form.username2" placeholder="请输入区域名称"></el-input>
                </el-form-item>
                <el-form-item label="区域位置" prop="tel">
                    <el-input class="w420" v-model="form.tel" placeholder="请输入区域位置"></el-input>
                </el-form-item>
                <el-form-item label="区域负责人" prop="tel">
                    <el-input class="w420" v-model="form.tel" placeholder="请输入区域负责人"></el-input>
                </el-form-item>
                <el-form-item label="负责人联系方式" prop="tel">
                    <el-input class="w420" v-model="form.tel" placeholder="请输入负责人联系方式"></el-input>
                </el-form-item>
                <el-form-item label="区域操作人" prop="tel">
                    <el-input class="w420" v-model="form.tel" placeholder="请输入区域操作人"></el-input>
                </el-form-item>
                <el-form-item label="归属企业" prop="roleId">
                    <el-select class="w420" v-model="form.roleId" placeholder="请选择归属企业">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                    </el-select>
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
    import {regionCreate, regionUpdate, regionRead, hdCompanyList} from '../../../api/api';
    export default {
        name: 'addArea',
        data() {
            return {
                form: {
                    username: '', // 账号
                    password: '', // 初始密码
                    username2: '', // 姓名
                    tel: '', // 手机号
                    roleId: '', // 角色
                    deleted: false, // 是否删除
                },
                // 必填校验
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
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
                    ]
                },
                // 归属企业
                companyList: [],
            };
        },
        created() {
            // 获取详情
            if (this.$route.query.id) {
                regionRead({id: this.$route.query.id}).then(res => {
                    if (res.data.errno === 0) {
                        this.form = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                })
            }
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
            })
        },
        methods: {
            /**
             * 提交数据
             */
            submitForm() {
                // 必填校验
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (this.$route.query.id) {
                            regionUpdate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    // 成功
                                    this.$message({
                                        showClose: true,
                                        message: '更新成功',
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/equipmentList'});
                                } else {
                                    // 失败
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            })
                        } else {
                            regionCreate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    // 成功
                                    this.$message({
                                        showClose: true,
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/equipmentList'});
                                } else {
                                    // 失败
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            })
                        }
                    }
                });
            },
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .form-save {
        background: #fff;
        padding: 45px 20px;
        color: rgba(87, 111, 136, 100);
        font-size: 14px;
        font-family: PingFangSC-Medium;
        .el-input .el-input__inner {
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(226, 233, 237, 1);
        }
        .el-form-item {
            width: 50%;
            float: left;
        }
        .test-btn {
            padding: 0;
            width: 100px;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            margin-left: 40px;
            background-color: rgba(248, 251, 253, 1);
            border: 1px solid rgba(240, 240, 240, 1);
        }
        .point {
            color: #0DD90E;
            margin-left: 24px;
        }
        .point span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background: #0DD90E;
            margin-right: 4px;
        }
        .operation-btn {
            width: 100%;
            text-align: center;
            margin-top: 80px;
            .el-button {
                width: 153px;
                height: 46px;
                border-radius: 4px;
                border: 0;
                color: #4D7CFE;
                background-color: rgba(242, 247, 250, 1);
                box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
            }
            .el-button--primary {
                margin-right: 46px;
            }
        }
    }
    .w420 {
        width: 420px!important;
    }
    .w140 {
        width: 140px!important;
    }
</style>