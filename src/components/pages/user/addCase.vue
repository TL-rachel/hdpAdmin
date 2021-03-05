<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px"
                     :src="userData.userImage1?userData.userImage1:userImgUrl" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} 岁 &nbsp; {{userData.userSex === 0 ? '男' : '女'}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.userPhone}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.userHeight}} cm</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.userWeight}} KG</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.userBmi}}</div>
            </div>
        </div>
        <span class="update-case">{{$route.query.id?'修改病例':'新增病例'}}</span>
        <div class="form-save">
            <el-form ref="form" class="clearfix" :model="form" label-width="80px">
                <el-form-item label="体检时间" label-width="90px">
                    <el-date-picker type="datetime" class="w420" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                    v-model="form.inspectTime"></el-date-picker>
                </el-form-item>

                <el-form-item label="血压" label-width="90px" style="width: 240px">
                    舒适压
                    <el-input class="w100" v-model="form.bloodComfort" placeholder="请输入舒适压"></el-input>
                </el-form-item>

                <el-form-item label="" label-width="100px" style="width: 25%;">
                    收缩压
                    <el-input class="w100" v-model="form.bloodContract" placeholder="请输入收缩压"></el-input>
                </el-form-item>

                <el-form-item label="血氧" label-width="90px">
                    <el-input class="w420" v-model="form.bloodOxygen" placeholder="请输入血氧"></el-input>
                </el-form-item>

                <el-form-item label="心率" label-width="90px">
                    <el-input class="w420" v-model="form.heartRate" placeholder="请输入心率"></el-input>
                </el-form-item>

                <el-form-item label="异常状况" class="whole100" label-width="90px">
                    <el-input type="textarea" class="whole100Calc" v-model="form.abnormalSymptomDesc"
                              placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="医生诊断" class="whole100" label-width="90px">
                    <el-input type="textarea" class="whole100Calc" v-model="form.doctorDiagnosis"
                              placeholder="请描述异常状况"></el-input>
                </el-form-item>

                <el-form-item label="测量时间" label-width="90px">
                    <el-date-picker type="datetime" class="w420" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                    v-model="form.measuringTime"></el-date-picker>
                </el-form-item>

                <el-form-item label="设备编号" label-width="90px">
                    <el-input class="w420" v-model="form.deviceCode" placeholder="请输入设备编号"></el-input>
                </el-form-item>
                <el-form-item label="操作人" class="whole100" label-width="90px">
                    <el-input class="w420" v-model="form.operation" placeholder="请输入人名"></el-input>
                </el-form-item>

                <div class="clearfix">
                    <el-form-item label="病例附件" label-width="90px">
                        <el-upload
                                class="upload-demo"
                                :action="actionUrl"
                                ref="upload1"
                                multiple
                                :on-success="handleAvatarSuccess1"
                                :limit="10">
                            <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        </el-upload>
                        <span v-if="!form.medicalRecordAttachmentList || form.medicalRecordAttachmentList.length === 0">未选择任何文件</span>
                        <div v-else class="upload-list">
                            <div v-for="(item,index) in form.medicalRecordAttachmentList" :key="index">
                                <a :href="item.url" target="_blank">{{item.fileName}}</a>
                                <i @click="uploadDelete(1,index)" class="icon-picture icon-picture-delete"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="体检报告" label-width="90px">
                        <el-upload
                                class="upload-demo"
                                :action="actionUrl"
                                ref="upload2"
                                multiple
                                :on-success="handleAvatarSuccess2"
                                :limit="10">
                            <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        </el-upload>
                        <span v-if="!form.medicalReportList || form.medicalReportList.length === 0">未选择任何文件</span>
                        <div v-else class="upload-list">
                            <div v-for="(item,index) in form.medicalReportList" :key="index">
                                <a :href="item.url" target="_blank">{{item.fileName}}</a>
                                <i @click="uploadDelete(2,index)" class="icon-picture icon-picture-delete"></i>
                            </div>
                        </div>
                    </el-form-item>
                </div>

                <div class="clearfix">
                    <el-form-item label="心电数据" label-width="90px">
                        <el-upload
                                class="upload-demo"
                                :action="actionUrl"
                                ref="upload3"
                                multiple
                                :on-success="handleAvatarSuccess3"
                                :limit="10">
                            <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        </el-upload>
                        <span v-if="!form.electrocardiogramDataList || form.electrocardiogramDataList.length === 0">未选择任何文件</span>
                        <div v-else class="upload-list">
                            <div v-for="(item,index) in form.electrocardiogramDataList" :key="index">
                                <a :href="item.url" target="_blank">{{item.fileName}}</a>
                                <i @click="uploadDelete(3,index)" class="icon-picture icon-picture-delete"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="心电图" label-width="90px">
                        <el-upload
                                class="upload-demo"
                                :action="actionUrl"
                                ref="upload4"
                                multiple
                                :on-success="handleAvatarSuccess4"
                                :limit="10">
                            <el-button size="small" class="upload-case" type="primary">选择文件</el-button>
                        </el-upload>
                        <span v-if="!form.electrocardiogramList || form.electrocardiogramList.length === 0">未选择任何文件</span>
                        <div v-else class="upload-list">
                            <div v-for="(item,index) in form.electrocardiogramList" :key="index">
                                <a :href="item.url" target="_blank">{{item.fileName}}</a>
                                <i @click="uploadDelete(4,index)" class="icon-picture icon-picture-delete"></i>
                            </div>
                        </div>
                    </el-form-item>
                </div>

                <el-form-item class="operation-btn" label-width="0">
                    <el-button type="primary" @click="submitForm('form')">保 存</el-button>
                    <el-button @click="handleHistory">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {medicalCaseCreate, userRead, medicalCaseUpdate, medicalCaseRead} from '../../../api/api';

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
                    electrocardiogramList: [], // 心电图URL
                    electrocardiogramDataList: [], // 心电数据URL
                    medicalRecordAttachmentList: [], // 病例附件URL
                    medicalReportList: [], // 体检报告URL
                },
                imageUrl: '',
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                actionUrl: CAS_SERVER_URL + '/admin/storage/create',
                /* eslint-disable */
                userData: {},
                submitBtn: true,
            };
        },
        created() {
            // 获取用户信息
            if (this.$route.query.userId) {
                userRead(this.$route.query.userId).then(res => {
                    if (res.data.errno === 0) {
                        this.userData = res.data.data;
                        this.form.userId = this.$route.query.userId;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '用户信息' + res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            }
            if (this.$route.query.id) {
                medicalCaseRead(this.$route.query.id).then(res => {
                    if (res.data.errno === 0) {
                        this.form = JSON.parse(JSON.stringify(res.data.data));
                        this.form.id = this.$route.query.id;
                        this.form.electrocardiogramList = [];
                        this.form.electrocardiogramDataList = [];
                        this.form.medicalRecordAttachmentList = [];
                        this.form.medicalReportList = [];
                        this.form.electrocardiogramList = res.data.data.electrocardiograms;
                        this.form.electrocardiogramDataList = res.data.data.electrocardiogramDatas;
                        this.form.medicalRecordAttachmentList = res.data.data.medicalRecordAttachments;
                        this.form.medicalReportList = res.data.data.medicalReports;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '病例信息' + res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            }
        },
        methods: {
            /**
             * 删除上传文件
             * @param {Number} type 字段标识 1 病例附件 2 体检附件 3 心电数据 4 心电图
             * @param {Number} index 要删除的文件索引
             */
            uploadDelete(type, index) {
                if (type === 1) {
                    this.form.medicalRecordAttachmentList.splice(index, 1);
                } else if (type === 2) {
                    this.form.medicalReportList.splice(index, 1);
                } else if (type === 3) {
                    this.form.electrocardiogramDataList.splice(index, 1);
                } else if (type === 4) {
                    this.form.electrocardiogramList.splice(index, 1);
                }
                this.$forceUpdate();
            },
            // 病例附件地址
            handleAvatarSuccess1(res, file) {
                if (file.response.errno === 0) {
                    this.form.medicalRecordAttachmentList.push({
                        url: file.response.data[0].url,
                        fileName: file.response.data[0].fileName
                    });
                    this.$forceUpdate();
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
                if (file.response.errno === 0) {
                    this.form.medicalReportList.push({
                        url: file.response.data[0].url,
                        fileName: file.response.data[0].fileName
                    });
                    this.$forceUpdate();
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
                if (file.response.errno === 0) {
                    this.form.electrocardiogramDataList.push({
                        url: file.response.data[0].url,
                        fileName: file.response.data[0].fileName
                    });
                    this.$forceUpdate();
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
                if (file.response.errno === 0) {
                    this.form.electrocardiogramList.push({
                        url: file.response.data[0].url,
                        fileName: file.response.data[0].fileName
                    });
                    this.$forceUpdate();
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
                // 组装数据  获取上传的文件，分别存贮在指定的字段中，逗号拼接
                let para = JSON.parse(JSON.stringify(this.form));
                para.electrocardiogram = '';
                para.electrocardiogramData = '';
                para.medicalRecordAttachment = '';
                para.medicalReport = '';
                if (this.form.electrocardiogramList) {
                    for (let i = 0; i < this.form.electrocardiogramList.length; i++) {
                        if (i === this.form.electrocardiogramList.length - 1) {
                            para.electrocardiogram += this.form.electrocardiogramList[i].url;
                        } else {
                            para.electrocardiogram += this.form.electrocardiogramList[i].url + ',';
                        }
                    }
                }
                if (this.form.electrocardiogramDataList) {
                    for (let i = 0; i < this.form.electrocardiogramDataList.length; i++) {
                        if (i === this.form.electrocardiogramDataList.length - 1) {
                            para.electrocardiogramData += this.form.electrocardiogramDataList[i].url;
                        } else {
                            para.electrocardiogramData += this.form.electrocardiogramDataList[i].url + ',';
                        }
                    }
                }
                if (this.form.medicalRecordAttachmentList) {
                    for (let i = 0; i < this.form.medicalRecordAttachmentList.length; i++) {
                        if (i === this.form.medicalRecordAttachmentList.length - 1) {
                            para.medicalRecordAttachment += this.form.medicalRecordAttachmentList[i].url;
                        } else {
                            para.medicalRecordAttachment += this.form.medicalRecordAttachmentList[i].url + ',';
                        }
                    }
                }
                if (this.form.medicalReportList) {
                    for (let i = 0; i < this.form.medicalReportList.length; i++) {
                        if (i === this.form.medicalReportList.length - 1) {
                            para.medicalReport += this.form.medicalReportList[i].url;
                        } else {
                            para.medicalReport += this.form.medicalReportList[i].url + ',';
                        }
                    }
                }
                if (this.submitBtn) {
                    this.submitBtn = false;
                    if (this.$route.query.id) {
                        medicalCaseUpdate(para).then(res => {
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
                                this.submitBtn = true;
                            }
                        })
                    } else {
                        medicalCaseCreate(para).then(res => {
                            if (res.data.errno === 0) {
                                this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$router.back(-1);
                            } else {
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

    .whole100Calc.el-textarea textarea {
        width: e("calc( 50% + 464px)") !important;
    }

    .el-form-item__content {
        .upload-demo {
            width: 100px;
            display: inline-block;
        }
    }

    .upload-list {
        width: 300px;
        vertical-align: top;
        display: inline-block;

        div {
            display: flex;
            justify-content: space-between;

            .icon-picture-delete {
                margin-top: 8px;
            }
        }
    }
</style>