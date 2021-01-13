<template>
    <div class="company-enter">
        <div class="company-form">
            <h3>企业入驻申请</h3>
            <el-form ref="form" class="clearfix form-save" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="企业名称" class="whole100" label-width="140px" prop="companyName">
                    <el-input class="w610"  v-model="form.companyName" placeholder="请输入企业名称"></el-input>
                </el-form-item>

                <el-form-item label="社会代码" class="whole100" label-width="140px" prop="companyCode">
                    <el-input class="w610"  v-model="form.companyCode" placeholder="请输入社会代码"></el-input>
                </el-form-item>

                <el-form-item label="地址" class="whole100" label-width="140px" prop="companyAddress">
                    <el-input class="w610"  v-model="form.companyAddress" placeholder="请输入地址"></el-input>
                </el-form-item>

                <el-form-item label="联系人" label-width="140px" prop="companyContacts">
                    <el-input class="w240"  v-model="form.companyContacts" placeholder="请输入联系人"></el-input>
                </el-form-item>

                <el-form-item label="电话" label-width="120px" prop="companyTele">
                    <el-input class="w240"  v-model="form.companyTele" placeholder="请输入电话"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="140px" prop="companyEmail">
                    <el-input class="w240"  v-model="form.companyEmail" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="120px" prop="companyPhone">
                    <el-input class="w240"  v-model="form.companyPhone" placeholder="请输入手机"></el-input>
                </el-form-item>

                <el-form-item label="企业负责人" label-width="140px" prop="companyLead">
                    <el-input class="w240"  v-model="form.companyLead" placeholder="请输入企业负责人"></el-input>
                </el-form-item>
                <el-form-item label="主要管理员" label-width="120px" prop="companyPrincipal">
                    <el-input class="w240"  v-model="form.companyPrincipal" placeholder="请输入主要管理员"></el-input>
                </el-form-item>

                <el-form-item label="资质证明附件" class="whole100" label-width="140px">
                    <el-upload
                            class="upload-demo"
                            :action="actionUrl"
                            multiple
                            accept = "application/pdf"
                            :on-success="handleAvatarSuccess1"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.companyPatha">未选择任何文件</span>
                        <a v-else :href="form.companyPatha" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>

                <el-form-item label="网络负责人授权证明" class="whole100" label-width="140px">
                    <el-upload
                            class="upload-demo"
                            :action="actionUrl"
                            multiple
                            accept = "application/pdf"
                            :on-success="handleAvatarSuccess2"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.companyPathb">未选择任何文件</span>
                        <a v-else :href="form.companyPathb" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>
                <el-form-item class="operation-btn company-btn" label-width="0">
                    <el-button type="primary" @click="submitForm()">提交申请</el-button>
                    <el-button @click="cleanForm">取消申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {companyCreate} from '../../api/api';

    export default {
        name: 'companyEnter',
        data() {
            return {
                form: {
                    companyName: '', // 企业名称
                    companyCode: '', // 社会代码
                    companyAddress: '', // 企业地址
                    companyContacts: '', // 企业联系人
                    companyTele: '', // 企业联系人
                    companyEmail: '', // 企业邮箱
                    companyPhone: '', // 企业手机
                    companyLead: '', // 企业负责人
                    companyPrincipal: '', // 企业主要管理员 多个人员逗号隔开
                    companyPatha: '', // 资格证明附件地址
                    companyPathb: '', // 网络资格人授权证明
                },
                // 必填校验
                rules: {
                    companyName: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' }
                    ],
                    companyCode: [
                        { required: true, message: '请输入社会代码', trigger: 'blur' },
                        { min: 18, max: 18, message: '长度在 18 位数字', trigger: 'blur' }
                    ],
                    companyAddress: [
                        { required: true, message: '请输入企业地址', trigger: 'blur' }
                    ],
                    companyTele: [
                        { required: true, message: '请输入电话', trigger: 'blur' }
                    ],
                    companyContacts: [
                        { required: true, message: '请输入企业联系人', trigger: 'blur' }
                    ],
                    companyEmail: [
                        { required: true, message: '请输入企业邮箱', trigger: 'blur' }
                    ],
                    companyPhone: [
                        { required: true, message: '请输入企业手机', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11 位数字', trigger: 'blur' }
                    ],
                    companyLead: [
                        { required: true, message: '请输入企业主要管理员', trigger: 'blur' }
                    ],
                    companyPrincipal: [
                        { required: true, message: '请输入企业负责人', trigger: 'blur' }
                    ]
                },
                imageUrl: '',
                imgType: ['application/pdf'],
                /* eslint-disable */
                actionUrl: CAS_SERVER_URL + '/admin/storage/create',
                /* eslint-disable */
            };
        },
        methods: {
            // 资格证明附件地址
            handleAvatarSuccess1(res, file) {
                this.form.companyPatha = file.response.data.url;
            },
            // 网络资格人授权证明
            handleAvatarSuccess2(res, file) {
                this.form.companyPathb = file.response.data.url;
            },
            cleanForm() {
                this.form = {
                    companyName: '', // 企业名称
                    companyCode: '', // 社会代码
                    companyAddress: '', // 企业地址
                    companyContacts: '', // 企业联系人
                    companyTele: '', // 企业联系人
                    companyEmail: '', // 企业邮箱
                    companyPhone: '', // 企业手机
                    companyLead: '', // 企业负责人
                    companyPrincipal: '', // 企业主要管理员 多个人员逗号隔开
                    companyPatha: '', // 资格证明附件地址
                    companyPathb: '', // 网络资格人授权证明
                }
            },
            /**
             * 提交数据
             */
            submitForm() {
                // 必填校验
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (this.form.companyPatha === '') {
                            this.$message({
                                showClose: true,
                                message: '请上传资格证明附件',
                                type: 'error'
                            });
                            return;
                        }
                        if (this.form.companyPathb === '') {
                            this.$message({
                                showClose: true,
                                message: '请上传网络资格人授权证明',
                                type: 'error'
                            });
                            return;
                        }
                        companyCreate(this.form).then(res => {
                            if (res.data.errno === 0) {
                                // 成功
                                this.$alert('申请成功，请勿重复提交！！！', '申请成功', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$message({
                                            type: 'info',
                                            message: `申请成功，请勿重复提交`
                                        });
                                    }
                                });
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
                })
            }
        }
    };
</script>

<style lang="less">
    .company-enter {
        background-image: url("../../common/image/Login-bg1.png");
        background-size: cover;
        width: 100%;
        height: 100%;
        position: relative;
        .company-form {
            width: 820px;
            height: 740px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -370px;
            margin-left: -410px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 80px 0px rgba(37, 38, 49, 0.05);
            h3 {
                font-size: 28px;
                text-align: center;
                font-weight: bold;
                margin-top: 24px;
            }
            .el-input__inner,.el-form-item__label,.el-form-item__contentd,.el-upload {
                height: 52px;
                line-height: 52px;
            }
            .el-form-item__label {
                font-weight: bold;
            }
            .form-save {
                padding-bottom: 0;
                .company-btn {
                    margin-top: 0;
                    .el-button {
                        width: 230px;
                        height: 46px;
                        border-radius: 3px;
                        color: #4D7CFE;
                    }
                    .el-button--primary {
                        width: 230px;
                        height: 46px;
                        border-radius: 3px;
                        background-color: rgba(77, 124, 254, 1);
                        color: #fff;
                    }
                }
            }
        }
    }
    .w610 {
        width: 610px!important;
    }
    .w240 {
        width: 240px!important;
    }
</style>