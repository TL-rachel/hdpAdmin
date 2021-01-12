<template>
    <div class="form-save">
        <el-form ref="form" class="clearfix" :rules="rules" :model="form" label-width="80px">
            <el-form-item :label="!$route.query.id?'创建用户':'用户ID'" class="whole100" label-width="90px">
                <el-input v-if="$route.query.id" class="w420" v-model="form.id" disabled placeholder="请输入用户ID"></el-input>
            </el-form-item>

            <el-form-item class="upload-img" label="上传图片" label-width="90px">
                <el-upload
                        class="avatar-uploader"
                        :disabled="$route.query.type==1?true:false"
                        :action="actionUrl"
                        :accept="imgType"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.userImage1" :src="form.userImage1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon user-image1"></i>
                </el-upload>
                <el-upload
                        class="avatar-uploader"
                        :disabled="$route.query.type==1?true:false"
                        :action="actionUrl"
                        :accept="imgType"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.userImage2" :src="form.userImage2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon user-image2"></i>
                </el-upload>
                <el-upload
                        class="avatar-uploader"
                        :disabled="$route.query.type==1?true:false"
                        :action="actionUrl"
                        :accept="imgType"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess3"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.userImage3" :src="form.userImage3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon user-image3"></i>
                </el-upload>

                <el-button>正面照</el-button>
                <el-button>侧面照</el-button>
                <el-button>3/4侧面照</el-button>
            </el-form-item>

            <el-form-item label="用户姓名" class="whole100" label-width="90px" prop="userName">
                <el-input class="w420" v-model="form.userName" :disabled="$route.query.type==1?true:false" placeholder="请输入用户姓名"></el-input>
            </el-form-item>

            <el-form-item label="年龄" class="whole100" label-width="90px" prop="userAge">
                <el-input class="w420" v-model="form.userAge" :disabled="$route.query.type==1?true:false" placeholder="请输入数字"></el-input>
            </el-form-item>

            <el-form-item label="性别" class="whole100" label-width="90px" prop="userSex">
                <el-radio-group v-model="form.userSex" :disabled="$route.query.type==1?true:false">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="手机号" class="whole100" label-width="90px" prop="userPhone">
                <el-input class="w420" v-model="form.userPhone" :disabled="$route.query.type==1?true:false" placeholder="请输入号码"></el-input>
            </el-form-item>

            <el-form-item label="邮箱地址" label-width="90px" prop="userEmail">
                <el-input class="w420" v-model="form.userEmail" :disabled="$route.query.type==1?true:false" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="证件类型" label-width="90px" style="width: 20%;" prop="userCertificatesType">
                <el-select class="w140" v-model="form.userCertificatesType" :disabled="$route.query.type==1?true:false" placeholder="请选择证件类型">
                    <el-option label="身份证" :value="0"></el-option>
                    <el-option label="驾照" :value="1"></el-option>
                    <el-option label="护照" :value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="证件号码" label-width="100px" style="width: 25%;" prop="certificatesNum">
                <el-input class="w190" v-model="form.certificatesNum" :disabled="$route.query.type==1?true:false" placeholder="请输入证件号码"></el-input>
            </el-form-item>

            <el-form-item label="血型" label-width="90px" prop="userBlood">
                <el-input class="w420" v-model="form.userBlood" :disabled="$route.query.type==1?true:false" placeholder="请输入血型"></el-input>
            </el-form-item>

            <el-form-item label="职业" label-width="90px" prop="userJob">
                <el-input class="w420" v-model="form.userJob" :disabled="$route.query.type==1?true:false" placeholder="请输入职业"></el-input>
            </el-form-item>

            <el-form-item label="学历" label-width="90px" prop="userEducation">
                <el-input class="w420" v-model="form.userEducation" :disabled="$route.query.type==1?true:false" placeholder="请输入学历"></el-input>
            </el-form-item>

            <el-form-item label="归属企业" label-width="90px" prop="companyId">
                <el-select class="w420" v-model="form.companyId" :disabled="$route.query.type==1?true:false" placeholder="请选择归属企业">
                    <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="民族" label-width="90px" prop="userNation">
                <el-select class="w420" v-model="form.userNation" :disabled="$route.query.type==1?true:false" placeholder="请选择民族">
                    <el-option label="汉族" value="0"></el-option>
                    <el-option label="苗族" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户等级" label-width="90px" style="width: 21%;" prop="userLevel">
                <el-select class="w140" v-model="form.userLevel" :disabled="$route.query.type==1?true:false" placeholder="请选择用户等级">
                    <el-option label="一级" :value="0"></el-option>
                    <el-option label="二级" :value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="等级变更方式" label-width="110px" style="width: 20%;" prop="levelChangeType">
                <el-select class="w140" v-model="form.levelChangeType" :disabled="$route.query.type==1?true:false" placeholder="请选择等级变更方式">
                    <el-option label="系统" :value="0"></el-option>
                    <el-option label="人工" :value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="身高" label-width="90px" prop="userHeight">
                <el-input class="w420" v-model="form.userHeight" :disabled="$route.query.type==1?true:false" placeholder="请输入身高"></el-input>
            </el-form-item>
            <el-form-item label="体重" label-width="90px" prop="userWeight">
                <el-input class="w420" v-model="form.userWeight" :disabled="$route.query.type==1?true:false" placeholder="请输入体重"></el-input>
            </el-form-item>
            <el-form-item class="operation-btn" label-width="0">
                <el-button type="primary" @click="submitForm()">保 存</el-button>
                <el-button @click="handleHistory">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {userCreate,hdCompanyList,userRead,userUpdate} from '../../../api/api';
    export default {
        name: 'addUser',
        data() {
            return {
                form: {
                    id: '', // 用户ID
                    certificatesNum: '', //证件号码
                    companyId: '', //所属企业ID
                    delFlag: false, //默认false
                    levelChangeType: '0', //等级变更方式(0系统；1人工；默认0)
                    userAge: '', //年龄
                    userBlood: '', //血型
                    userCertificatesType: '0', //证件类型(0-身份证；1-驾照；2-护照）
                    userEducation: '', //学历
                    userEmail: '', //email
                    userHeight: '', //身高
                    userImage1: '', //图片1
                    userImage2: '', //图片2
                    userImage3: '', //图片3
                    userJob: '', //职业
                    userLevel: '0', //用户等级默认1
                    userName: '', //姓名
                    userNation: '', //民族
                    userPhone: '', //手机号码
                    userSex: '', //性别0-男；1-女
                    userWeight: '' //体重
                },
                // 必填校验
                rules: {
                    userId: [
                        { required: true, message: '请输入用户ID', trigger: 'blur' },
                    ],
                    certificatesNum: [
                        { required: true, message: '请输入证件号码', trigger: 'blur' },
                    ],
                    userBlood: [
                        { required: true, message: '请输入血型', trigger: 'blur' },
                    ],
                    userEducation: [
                        { required: true, message: '请输入学历', trigger: 'blur' },
                    ],
                    userEmail: [
                        { required: true, message: '请输入email', trigger: 'blur' },
                    ],
                    userHeight: [
                        { required: true, message: '请输入身高', trigger: 'blur' },
                    ],
                    userJob: [
                        { required: true, message: '请输入职业', trigger: 'blur' },
                    ],
                    userName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    userPhone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                    ],
                    userAge: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    userWeight: [
                        { required: true, message: '请输入体重', trigger: 'blur' },
                    ],
                    companyId: [
                        { required: true, message: '请选择所属企业', trigger: 'change' }
                    ],
                    levelChangeType: [
                        { required: true, message: '请选择变更方式', trigger: 'change' }
                    ],
                    userCertificatesType: [
                        { required: true, message: '请选择证件类型', trigger: 'change' }
                    ],
                    userLevel: [
                        { required: true, message: '请选择用户等级', trigger: 'change' }
                    ],
                    userNation: [
                        { required: true, message: '请选择民族', trigger: 'change' }
                    ],
                    userSex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                },
                // 所属企业列表
                companyList: [],
                imgType: ['image/jpg', 'image/png'],
                /* eslint-disable */
                actionUrl: CAS_SERVER_URL + '/admin/storage/create',
                /* eslint-disable */
            };
        },
        created() {
            if (this.$route.query.id) {
                userRead(this.$route.query.id).then(res => {
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
            handleAvatarSuccess1(res, file) {
                this.form.userImage1 = file.response.data.url;
            },
            handleAvatarSuccess2(res, file) {
                this.form.userImage2 = file.response.data.url;
            },
            handleAvatarSuccess3(res, file) {
                this.form.userImage3 = file.response.data.url;
            },
            beforeAvatarUpload(file) {
                // 调用testFileType方法，把定义的imgType数组和我们上传的图片类型file.type一起传进去
                const isTYPE = this.testFileType(this.imgType, file.type);
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (isTYPE) {
                    this.$message.error('上传的图片只能是 JPG、PNG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传的图片大小不能超过 5MB!');
                }
                return !isTYPE && isLt5M;
            },
            // 判断文件类型是否在数组中 返回布尔值
            testFileType(arr, fileType) {
                arr.filter((el, index) => {
                    return fileType === el[index];
                });
            },
            /**
             * 提交数据
             */
            submitForm() { // 必填校验
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (this.$route.query.id) {
                            userUpdate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '更新用户成功',
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/userList'});
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            })
                        } else {
                            userCreate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '添加用户成功',
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/userList'});
                                } else {
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
            handleHistory() {
                this.$router.back(-1);
            }
        }
    };
</script>

<style lang="less">
    .avatar-uploader {
        display: inline-block;
        margin-right: 20px;
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 170px;
        line-height: 170px;
        text-align: center;
    }
    .avatar {
        width: 138px;
        height: 170px;
        display: block;
    }
    .upload-img {
        position: absolute;
        left: 50%;
        button {
            width: 138px;
            margin-right: 13px;
            height: 38px;
            line-height: 38px;
            padding: 0;
            border: 0;
            color: #4D7CFE;
            border-radius: 4px;
            background-color: rgba(242, 247, 250, 1);
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .whole100 {
        width: 100% !important;
    }
    .w190 {
        width: 190px!important;
    }
    .form-save .el-input.is-disabled .el-input__inner {
        background-color: #f5f7fa;
        border-color: #E4E7ED;
    }
    .avatar-uploader .el-upload {
        z-index: 99;
    }
    .user-image1 {
        background-image: url("../../../common/image/user-image1.png");
        background-size: cover;
    }
    .user-image2 {
        background-image: url("../../../common/image/user-image2.png");
        background-size: cover;
    }
    .user-image3 {
        background-image: url("../../../common/image/user-image3.png");
        background-size: cover;
    }
    .el-icon-plus.user-image1:before,
    .el-icon-plus.user-image2:before,
    .el-icon-plus.user-image3:before {
        opacity: 0;
    }
</style>