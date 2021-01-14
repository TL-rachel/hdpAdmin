<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.userImage1" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} &nbsp; {{userData.userSex === 0 ? '男' : '女'}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.userPhone}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.userHeight}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.userWeight}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.userBmi}}</div>
            </div>
        </div>
        <span class="update-case">修改病例</span>
        <div class="form-save">
            <el-form ref="form" class="clearfix" :model="form" label-width="80px">
                <el-form-item label="体检时间" label-width="90px">
                    <el-date-picker type="datetime" class="w420" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.inspectTime"></el-date-picker>
                </el-form-item>

                <el-form-item label="血压" label-width="90px" style="width: 20%;">
                    舒适压 <el-input class="w100" v-model="form.bloodComfort" placeholder="请输入舒适压"></el-input>
                </el-form-item>

                <el-form-item label="" label-width="100px" style="width: 25%;">
                    收缩压 <el-input class="w100" v-model="form.bloodContract" placeholder="请输入收缩压"></el-input>
                </el-form-item>

                <el-form-item label="血氧" label-width="90px">
                    <el-input class="w420" v-model="form.bloodOxygen" placeholder="请输入血氧"></el-input>
                </el-form-item>

                <el-form-item label="心率" label-width="90px">
                    <el-input class="w420" v-model="form.heartRate" placeholder="请输入心率"></el-input>
                </el-form-item>

                <el-form-item label="异常状况" class="whole100" label-width="90px">
                    <el-input type="textarea" v-model="form.abnormalSymptomDesc" placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="医生诊断" class="whole100" label-width="90px">
                    <el-input type="textarea" v-model="form.doctorDiagnosis" placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="测量时间" label-width="90px">
                    <el-date-picker type="datetime" class="w420" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.measuringTime"></el-date-picker>
                </el-form-item>

                <el-form-item label="设备编号" label-width="90px">
                    <el-input class="w420" v-model="form.deviceCode" placeholder="请输入设备编号"></el-input>
                </el-form-item>
                <el-form-item label="操作人" class="whole100" label-width="90px">
                    <el-input class="w420" v-model="form.operation" placeholder="请输入人名"></el-input>
                </el-form-item>

                <el-form-item label="病例附件" label-width="90px">
                    <el-upload
                               class="upload-demo"
                               :action="actionUrl"
                               multiple
                               :on-success="handleAvatarSuccess1"
                               :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.medicalRecordAttachment">未选择任何文件</span>
                        <a v-else :href="form.medicalRecordAttachment" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>

                <el-form-item label="体检报告" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            :action="actionUrl"
                            multiple
                            :on-success="handleAvatarSuccess2"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.medicalReport">未选择任何文件</span>
                        <a v-else :href="form.medicalReport" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>

                <el-form-item label="心电数据" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            :action="actionUrl"
                            multiple
                            :on-success="handleAvatarSuccess3"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.electrocardiogramData">未选择任何文件</span>
                        <a v-else :href="form.electrocardiogramData" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>

                <el-form-item label="心电图" label-width="90px">
                    <el-upload
                            class="upload-demo"
                            :action="actionUrl"
                            multiple
                            :on-success="handleAvatarSuccess4"
                            :limit="1">
                        <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        <span v-if="!form.electrocardiogram">未选择任何文件</span>
                        <a v-else :href="form.electrocardiogram" target="_blank">这是一个上传文件，点击查看</a>
                    </el-upload>
                </el-form-item>

                <el-form-item class="operation-btn" label-width="0">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {medicalCaseCreate, medicalRead} from '../../../api/api';
    export default {
        name: 'addCase',
        data() {
            return {
                form: {
                    inspectTime: '', // 体检时间
                    bloodComfort: '', // 血压 舒适压
                    bloodContract: '', // 血压 收缩压
                    bloodOxygen: '', // 血氧
                    heartRate: '', // 心率
                    abnormalSymptomDesc: '', // 异常症状描述
                    doctorDiagnosis: '', // 医生诊断
                    measuringTime: '', // 测量时间
                    deviceCode: '', // 设备编号
                    operation: '', // 操作人
                    electrocardiogram: '', // 心电图URL
                    electrocardiogramData: '', // 心电数据URL
                    medicalRecordAttachment: '', // 病例附件URL
                    medicalReport: '', // 体检报告URL
                },
                imageUrl: '',
                /* eslint-disable */
                actionUrl: CAS_SERVER_URL + '/admin/storage/create',
                /* eslint-disable */
                userData: {}
            };
        },
        created() {
            // 获取用户信息
            if (this.$route.query.obj) {
                this.userData = JSON.parse(this.$route.query.obj);
                // 获取用户病史
                medicalRead(this.userData.id).then(res => {
                    console.log(res)
                })
            }
        },
        methods: {
            // 病例附件地址
            handleAvatarSuccess1(res, file) {
                if (file.response.data.url) {
                    this.form.medicalRecordAttachment = file.response.data.url;
                } else {
                    this.$message({
                        showClose: true,
                        message: '上传失败，请重新上传',
                        type: 'error'
                    });
                }
            },
            // 体检附件地址
            handleAvatarSuccess2(res, file) {
                if (file.response.data.url) {
                    this.form.medicalReport = file.response.data.url;
                } else {
                    this.$message({
                        showClose: true,
                        message: '上传失败，请重新上传',
                        type: 'error'
                    });
                }
            },
            // 心电数据URL
            handleAvatarSuccess3(res, file) {
                if (file.response.data.url) {
                    this.form.electrocardiogramData = file.response.data.url;
                } else {
                    this.$message({
                        showClose: true,
                        message: '上传失败，请重新上传',
                        type: 'error'
                    });
                }
            },
            // 心电图URL
            handleAvatarSuccess4(res, file) {
                if (file.response.data.url) {
                    this.form.electrocardiogram = file.response.data.url;
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
            submitForm() {
                medicalCaseCreate(this.form).then(res => {
                    if (res.data.errno === 0) {
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$router.back(-1);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
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
    .update-case {
        margin: 18px 0;
        display: inline-block;
        color: rgba(0, 0, 0, 1);
        font-size: 16px;
    }
    .el-textarea .el-textarea__inner {
        width: 80%;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(226, 233, 237, 1);
    }
    .upload-case {
        width: 100px;
        height: 30px;
        padding: 0;
        line-height: 30px;
        border: 0;
        color: #4D7CFE;
        display: inline-block;
        border-radius: 15px;
        background-color: rgba(242, 247, 250, 1);
    }
    .upload-case:hover {
        color: #4D7CFE;
        background-color: rgba(242, 247, 250, 1);
    }
    .el-upload-list.el-upload-list--text {
        display: none;
    }
</style>