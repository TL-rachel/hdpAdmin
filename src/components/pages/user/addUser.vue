<template>
    <div class="form-save">
        <el-form ref="form" class="clearfix" :model="form" label-width="80px">
            <el-form-item label="用户ID" class="whole100" label-width="90px">
                <el-input class="w420" v-model="form.userId" placeholder="请输入用户ID"></el-input>
            </el-form-item>

            <el-form-item class="upload-img" label="上传图片" label-width="90px">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageFront" :src="form.imageFront" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageSide" :src="form.imageSide" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageSideLeft" :src="form.imageSideLeft" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-button>正面照</el-button>
                <el-button>侧面照</el-button>
                <el-button>3/4侧面照</el-button>
            </el-form-item>

            <el-form-item label="用户姓名" class="whole100" label-width="90px">
                <el-input class="w420" v-model="form.userName" placeholder="请输入用户姓名"></el-input>
            </el-form-item>

            <el-form-item label="年龄" class="whole100" label-width="90px">
                <el-input class="w420" v-model="form.userAge" placeholder="请输入数字"></el-input>
            </el-form-item>

            <el-form-item label="性别" class="whole100" label-width="90px">
                <el-radio-group v-model="form.userSex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="手机号" class="whole100" label-width="90px">
                <el-input class="w420" v-model="form.phoneNumber" placeholder="请输入号码"></el-input>
            </el-form-item>

            <el-form-item label="邮箱地址" label-width="90px">
                <el-input class="w420" v-model="form.userEmail" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="证件类型" label-width="90px" style="width: 20%;">
                <el-select class="w140" v-model="form.credType" placeholder="请选择证件类型">
                    <el-option label="身份证" value="shanghai"></el-option>
                    <el-option label="护照" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="证件号码" label-width="100px" style="width: 25%;">
                <el-input class="w190" v-model="form.credNo" placeholder="请输入证件号码"></el-input>
            </el-form-item>

            <el-form-item label="血型" label-width="90px">
                <el-input class="w420" v-model="form.bloodType" placeholder="请输入血型"></el-input>
            </el-form-item>

            <el-form-item label="职业" label-width="100px">
                <el-input class="w420" v-model="form.occupation" placeholder="请输入职业"></el-input>
            </el-form-item>

            <el-form-item label="学历" label-width="100px">
                <el-input class="w420" v-model="form.education" placeholder="请输入学历"></el-input>
            </el-form-item>

            <el-form-item label="归属企业" label-width="90px">
                <el-select class="w420" v-model="form.equipmentEnterprise" placeholder="请选择归属企业">
                    <el-option label="企业一" value="shanghai"></el-option>
                    <el-option label="企业二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="民族" label-width="90px">
                <el-select class="w420" v-model="form.nation" placeholder="请选择民族">
                    <el-option label="汉族" value="shanghai"></el-option>
                    <el-option label="苗族" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户等级" label-width="90px" style="width: 21%;">
                <el-select class="w140" v-model="form.grade" placeholder="请选择用户等级">
                    <el-option label="一级" value="shanghai"></el-option>
                    <el-option label="二级" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="等级变更方式" label-width="100px" style="width: 20%;">
                <el-select class="w140" v-model="form.gradeWay" placeholder="请选择等级变更方式">
                    <el-option label="方式一" value="shanghai"></el-option>
                    <el-option label="方式二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="身高" label-width="90px">
                <el-input class="w420" v-model="form.stature" placeholder="请输入身高"></el-input>
            </el-form-item>
            <el-form-item label="体重" label-width="90px">
                <el-input class="w420" v-model="form.weight" placeholder="请输入体重"></el-input>
            </el-form-item>

            <el-form-item label="身高" label-width="90px">
                <el-input class="w420" v-model="form.stature" placeholder="请输入身高"></el-input>
            </el-form-item>
            <el-form-item class="operation-btn" label-width="0">
                <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                <el-button @click="handleHistory">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'addUser',
        data() {
            return {
                form: {
                    userId: '', // 用户ID
                    imageFront: '', // 上传图片
                    imageSide: '', // 上传图片
                    imageSideLeft: '', // 上传图片
                    userName: '', // 用户姓名
                    userAge: '', // 年龄
                    userSex: '', // 性别
                    phoneNumber: '', // 手机号
                    userEmail: '', // 邮箱
                    credType: '', // 证件类型
                    credNo: '', // 证件号码
                    bloodType: '', // 血型
                    occupation: '', // 职业
                    education: '', // 学历
                    equipmentEnterprise: '', // 企业
                    nation: '', // 民族
                    grade: '', // 用户等级
                    gradeWay: '', // 用户等级更改方式
                    stature: '', // 身高
                    weight: '', // 体重
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /**
             * 提交数据
             */
            submitForm() {
                console.log(this.form)
                this.$router.push({path: '/userList'});
            },
            handleHistory() {
                this.$router.back(-1);
            }
        }
    }
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
</style>