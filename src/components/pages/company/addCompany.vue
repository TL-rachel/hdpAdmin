<template>
    <div class="equipmentList">
        <div class="form-save">
            <el-form ref="form" class="clearfix" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="企业ID" label-width="140px">
                    <el-input class="w420" disabled v-model="form.id" placeholder="系统自动生成"></el-input>
                </el-form-item>

                <el-form-item label="企业名称" label-width="140px" prop="companyName">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyName" placeholder="请输入企业名称"></el-input>
                </el-form-item>

                <el-form-item label="社会代码" label-width="140px" prop="companyCode">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyCode" placeholder="请输入社会代码"></el-input>
                </el-form-item>

                <el-form-item label="地址" label-width="140px" prop="companyAddress">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyAddress" placeholder="请输入企业地址"></el-input>
                </el-form-item>

                <el-form-item label="联系人" label-width="140px" prop="companyContacts">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyContacts" placeholder="请输入企业联系人"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" label-width="140px" prop="companyEmail">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyEmail" placeholder="请输入企业邮箱"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" label-width="140px" prop="companyTele">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyTele" placeholder="请输入联系电话"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="140px" prop="companyPhone">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyPhone" placeholder="请输入企业手机"></el-input>
                </el-form-item>

                <el-form-item label="企业负责人" label-width="140px" prop="companyLead">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyLead" placeholder="请输入企业负责人"></el-input>
                </el-form-item>
                <el-form-item label="企业主要管理员" label-width="140px" prop="companyPrincipal">
                    <el-input class="w420" :disabled="$route.query.type?true:false" v-model="form.companyPrincipal" placeholder="请输入企业主要管理员"></el-input>
                </el-form-item>

                <el-form-item label="资质证明附件" class="whole100" label-width="140px">
                    <el-upload v-if="$route.query.type?false:true"
                            class="upload-demo"
                            ref="upload1"
                            :action="actionUrl"
                            multiple
                            :on-success="handleAvatarSuccess1"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                    </el-upload>
                    <span v-if="!form.companyPatha">未选择任何文件</span>
                    <a v-else :href="form.companyPatha" target="_blank">{{form.companyPathaName}}</a>
                    <!--<a v-if="$route.query.type?true:false" :href="form.companyPatha" target="_blank">{{form.companyPathaName}}</a>-->
                </el-form-item>

                <el-form-item label="网络负责人授权证明" class="whole100" label-width="140px">
                    <el-upload v-if="$route.query.type?false:true"
                            class="upload-demo"
                            ref="upload2"
                            :action="actionUrl"
                            multiple
                            :on-success="handleAvatarSuccess2"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                    </el-upload>
                    <span v-if="!form.companyPathb">未选择任何文件</span>
                    <a v-else :href="form.companyPathb" target="_blank">{{form.companyPathbName}}</a>
                    <!--<a v-if="$route.query.type?true:false" :href="form.companyPathb" target="_blank">{{form.companyPathbName}}</a>-->
                </el-form-item>
                <el-form-item label="企业星级" label-width="140px" prop="companyStar">
                    <el-select v-model="form.companyStar" :disabled="$route.query.type?true:false" placeholder="请选择企业星级">
                        <el-option label="一星" :value="1"></el-option>
                        <el-option label="二星" :value="2"></el-option>
                        <el-option label="三星" :value="3"></el-option>
                        <el-option label="四星" :value="4"></el-option>
                        <el-option label="五星" :value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="$route.query.id?true:false" label="星级变更方式" label-width="140px" prop="starChangeType">
                    <el-select v-model="form.starChangeType" :disabled="$route.query.type?true:false" placeholder="请选择星级变更方式">
                        <el-option label="系统" :value="0"></el-option>
                        <el-option label="人工" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="$route.query.id?true:false" label="企业审核人" label-width="140px" prop="starChangeUserName">
                    <el-input class="w420" v-model="form.starChangeUserName" disabled placeholder="请输入企业审核人"></el-input>
                </el-form-item>
                <el-form-item v-if="$route.query.id?true:false" label="审核状态" label-width="140px" prop="companyStatus">
                    <el-select v-model="form.companyStatus" disabled placeholder="请选择审核状态">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="驳回" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="$route.query.id?true:false" label="企业入驻时间" label-width="140px" prop="intoTime">
                    <el-date-picker type="date" class="w420" disabled placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.intoTime"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="$route.query.id?true:false" label="更新时间" label-width="140px" prop="updatedTime">
                    <el-date-picker type="date" class="w420" disabled placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.updatedTime"></el-date-picker>
                </el-form-item>

                <el-form-item class="operation-btn" label-width="0">
                    <el-button v-if="jurisdictionList.adDisabled && ($route.query.type == 2 || $route.query.type?false:true)" type="primary" @click="submitForm(1)">保 存</el-button>
                    <el-button v-if="jurisdictionList.adDisabled && $route.query.type == 2?true:false" type="primary" @click="submitVia(1)">通 过</el-button>
                    <el-button v-if="jurisdictionList.adDisabled && $route.query.type == 2?true:false" type="primary" @click="submitVia(2)">驳 回</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog width="500" :visible.sync="dialogFormVisible">
            <div slot="title" class="dialog-title" :class="titleName == '审核通过！'?'transit':'reject'">
                <i :class="titleName == '审核通过！'?'el-icon-success':'el-icon-error'"></i>
                <span class="title-text">{{titleName}}</span>
                <div class="button-right">
                    <span class="title-close" @click="cancel"></span>
                </div>
            </div>
            <span style="vertical-align: top;margin-left: 30px;margin-right: 10px">批注</span>
            <el-input type="textarea" class="w320 examineContent" v-model="form.examineContent" placeholder="请输入批注意见"></el-input>

            <div v-if="titleName == '审核通过！'? true : false" style="margin-top: 10px">
                <span style="vertical-align: top;margin-left: 16px;margin-right: 10px">是否自动创建企业管理员账号</span>
                <el-switch
                        v-model="form.addPassword"
                        active-color="#13ce66">
                </el-switch>
            </div>

            <div v-if="form.addPassword && titleName == '审核通过！'? true : false" style="margin-top: 10px">
                <span style="vertical-align: top;margin-left: 16px;margin-right: 10px">用户名</span>
                <el-input v-model="form.username" class="w320" placeholder="请输入用户名"></el-input>
            </div>

            <div v-if="form.addPassword && titleName == '审核通过！'? true : false" style="margin-top: 10px">
                <span style="vertical-align: top;margin-left: 30px;margin-right: 10px">密码</span>
                <el-input v-model="form.password" class="w320" placeholder="请输入密码"></el-input>
            </div>

            <div v-if="form.addPassword && titleName == '审核通过！'? true : false" style="margin-top: 10px">
                <span style="vertical-align: top;margin-left: 2px;margin-right: 10px">确认密码</span>
                <el-input v-model="form.confirmPassword" class="w320" placeholder="确认密码"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm(2)">提 交</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {companyCreate,companyRead,companyUpdate,companyAuditUpdate ,companyAuditRead} from '../../../api/api';
    export default {
        name: 'addCompany',
        data() {
            return {
                form: {
                    id: '', // 企业ID
                    companyName: '', // 企业名称
                    companyCode: '', // 社会代码
                    companyAddress: '', // 企业地址
                    companyContacts: '', // 企业联系人
                    companyEmail: '', // 企业邮箱
                    companyPhone: '', // 企业手机
                    companyTele: '', // 企业联系电话
                    companyLead: '', // 企业负责人
                    companyPrincipal: '', // 企业主要管理员 多个人员逗号隔开
                    companyPatha: '', // 资格证明附件地址
                    companyPathb: '', // 网络资格人授权证明
                    companyPathaName: '', // 资格证明附件名称
                    companyPathbName: '', // 网络资格人授权证明名称
                    companyStar: 1, // 企业星级(1-一星；2-二星；3-三星；4-四星；5-五星,默认1)
                    companyStatus: '0', // 企业状态;0-待审核；1-通过；2-驳回；
                    starChangeType: 0, // 星级变更方式(0-系统；1-人工；默认0)
                    starChangeUserName: '', // 企业审核人
                    intoTime: '', // 企业入驻时间
                    updatedTime: '', // 更新时间
                    examineContent: '', // 审核批注
                    addPassword: false, // 是否创建账号
                    username: '', // 账号
                    password: '', // 密码
                    confirmPassword: '', // 确认密码
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
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    companyContacts: [
                        { required: true, message: '请输入联系人', trigger: 'blur' }
                    ],
                    companyEmail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
                    companyPhone: [
                        { required: true, message: '请输入手机', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11 位数字', trigger: 'blur' }
                    ],
                    companyTele: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' }
                    ],
                    companyLead: [
                        { required: true, message: '请输入企业主要管理员', trigger: 'blur' }
                    ],
                    starChangeUserName: [
                        { required: true, message: '请输入企业审核人', trigger: 'blur' }
                    ],
                    starChangeUserId: [
                        { required: true, message: '请输入星级变更人', trigger: 'blur' }
                    ],
                    companyPrincipal: [
                        { required: true, message: '请输入企业负责人', trigger: 'blur' }
                    ],
                    companyStar: [
                        { required: true, message: '请选择企业星级', trigger: 'change' }
                    ],
                    companyStatus: [
                        { required: true, message: '请选择企业审核状态', trigger: 'change' }
                    ],
                    starChangeType: [
                        { required: true, message: '请选择星级变更方式', trigger: 'change' }
                    ],
                    intoTime: [
                        { required: true, message: '请选择企业入驻时间', trigger: 'change' }
                    ],
                    updatedTime: [
                        { required: true, message: '请选择更新时间', trigger: 'change' }
                    ]
                },
                imageUrl: '',
                /* eslint-disable */
                actionUrl: CAS_SERVER_URL + '/admin/storage/create',
                /* eslint-disable */
                titleName: '审核通过！',
                dialogFormVisible: false,
                submitBtn: true,
                jurisdictionList: {
                    adDisabled: false,
                }
            };
        },
        created() {
            if (this.$route.query.id) {
                if (this.$route.query.type === 2) {
                    companyAuditRead({id: this.$route.query.id}).then(res => {
                        if (res.data.errno === 0) {
                            // 成功
                            this.form = res.data.data;
                            this.form.companyStar = this.form.companyStar;
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
                    companyRead({id: this.$route.query.id}).then(res => {
                        if (res.data.errno === 0) {
                            // 成功
                            this.form = res.data.data;
                            this.form.companyStar = this.form.companyStar;
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
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:hdCompany:create' || assignedPermissions[i] === 'admin:hdCompany:update' || assignedPermissions[i] === 'admin:hdCompanyAudit:update') {
                        this.jurisdictionList.adDisabled = true;
                    }
                }
            }
        },
        methods: {
            cancel() {
                this.dialogFormVisible =false;
            },
            submitVia(type) {
                if (type === 1) {
                    this.titleName = '审核通过！';
                } else {
                    this.titleName = '驳回！';
                }
                this.dialogFormVisible = true;
            },
            // 资格证明附件地址
            handleAvatarSuccess1(res, file) {
                if (file.response.data[0].url) {
                    this.form.companyPatha = file.response.data[0].url;
                    this.form.companyPathaName = file.response.data[0].fileName;
                    this.$refs.upload1.clearFiles();
                } else {
                    this.$message({
                        showClose: true,
                        message: '上传失败，请重新上传',
                        type: 'error'
                    });
                }
            },
            // 网络资格人授权证明
            handleAvatarSuccess2(res, file) {
                if (file.response.data[0].url) {
                    this.form.companyPathb = file.response.data[0].url;
                    this.form.companyPathbName = file.response.data[0].fileName;
                    this.$refs.upload2.clearFiles();
                } else {
                    this.$message({
                        showClose: true,
                        message: '上传失败，请重新上传',
                        type: 'error'
                    });
                }
            },
            /**
             * 提交数据
             */
            submitForm(type) {
                if (type === 1) {
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
                            if (this.submitBtn) {
                                this.submitBtn = false;
                                if (this.$route.query.id) {
                                    companyUpdate(this.form).then(res => {
                                        if (res.data.errno === 0) {
                                            // 成功
                                            this.$message({
                                                showClose: true,
                                                message: '更新成功',
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
                                            this.submitBtn = true;
                                        }
                                    })
                                } else {
                                    companyCreate(this.form).then(res => {
                                        if (res.data.errno === 0) {
                                            // 成功
                                            this.$message({
                                                showClose: true,
                                                message: '添加成功',
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
                                            this.submitBtn = true;
                                        }
                                    });
                                }
                            }
                        }
                    });
                } else if (type === 2) {
                    let para = JSON.parse(JSON.stringify(this.form));
                    if (para.addPassword) {
                        if (!para.username) {
                            this.$message({
                                showClose: true,
                                message: '请填写账号',
                                type: 'error'
                            });
                            return;
                        }
                        if (!para.password) {
                            this.$message({
                                showClose: true,
                                message: '请填写密码',
                                type: 'error'
                            });
                            return;
                        }
                        if (!para.confirmPassword) {
                            this.$message({
                                showClose: true,
                                message: '请再次填写密码',
                                type: 'error'
                            });
                            return;
                        }
                    }
                    if (this.titleName === '审核通过！') {
                        para.companyStatus = '1';
                    } else if (this.titleName === '驳回！') {
                        if (!para.examineContent) {
                            this.$message({
                                showClose: true,
                                message: '请填写批注说明',
                                type: 'error'
                            });
                            return;
                        }
                        para.companyStatus = '2';
                    }
                    companyAuditUpdate(para).then(res => {
                        if (res.data.errno === 0) {
                            // 成功
                            this.$message({
                                showClose: true,
                                message: '更新成功',
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
                    })
                }
            },
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .examineContent .el-textarea__inner {
        min-height: 150px!important;
    }
    .transit {
        color: #0DD90E;
    }
    .reject {
        color: #D90D0D;
    }
</style>