<template>
    <div class="form-save">
        <el-form ref="form" class="clearfix" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="设备ID" label-width="110px">
                <el-input class="w420" v-model="form.id" disabled placeholder="系统自动生成"></el-input>
            </el-form-item>

            <el-form-item label="设备编码" label-width="110px" prop="deviceCode">
                <el-input class="w420" @blur="getCheckDevicePath()" :disabled="$route.query.type==1?true:false" v-model="form.deviceCode" placeholder="请输入设备编码"></el-input>
            </el-form-item>

            <el-form-item label="设备名称" label-width="110px" prop="deviceName">
                <el-input class="w420" :disabled="$route.query.type==1?true:false" v-model="form.deviceName" placeholder="请输入设备名称"></el-input>
            </el-form-item>

            <el-form-item label="设备类型" label-width="110px" prop="deviceType">
                <el-select class="w420" :disabled="$route.query.type==1?true:false" v-model="form.deviceType" placeholder="请选择设备类型">
                    <el-option v-for="(item,index) in equipmentList" :key="index" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备负责人" label-width="110px" prop="deviceLead">
                <el-input class="w420" :disabled="$route.query.type==1?true:false" v-model="form.deviceLead" placeholder="请输入人名"></el-input>
            </el-form-item>

            <el-form-item label="联系方式" label-width="110px" prop="leadPhone">
                <el-input class="w420" :disabled="$route.query.type==1?true:false" v-model="form.leadPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="归属企业" label-width="110px" prop="companyId">
                <el-select class="w420" :disabled="$route.query.type==1?true:false" @change="getRegion(form.companyId)" v-model="form.companyId" placeholder="请选择归属企业">
                    <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备区域" label-width="110px" prop="deviceRegionId">
                <el-select class="w420" :disabled="$route.query.type==1?true:false" v-model="form.deviceRegionId" placeholder="请选择设备区域">
                    <el-option v-for="(item,index) in allRegions" :key="index" :label="item.regionName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备厂家" label-width="110px" prop="deviceManufactor">
                <el-select class="w420" :disabled="$route.query.type==1?true:false" v-model="form.deviceManufactor" placeholder="请选择设备厂家">
                    <el-option v-for="(item,index) in manufacturer" :key="index" :label="item.value" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="厂家联系人" label-width="110px" style="width: 260px;">
                <el-input class="w140" :disabled="$route.query.type==1?true:false" v-model="form.manufactorPeople" placeholder="请输入人名"></el-input>
            </el-form-item>

            <el-form-item label="厂家联系方式" label-width="110px" style="width: 310px">
                <el-input class="w160" :disabled="$route.query.type==1?true:false" v-model="form.manufactorPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="设备状态" label-width="110px" prop="deviceStatus">
                <el-select class="w420" disabled v-model="form.deviceStatus" placeholder="请选择设备状态">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="断开" :value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="链接地址" label-width="110px" style="width: 100%;" prop="devicePath">
                <el-input class="w420" disabled v-model="form.devicePath" placeholder="请输入网络地址"></el-input>
                <el-button @click="getCheckDevicePath()" class="test-btn">点击测试</el-button>
                <span v-if="deviceFlag === true ? true : false" class="point"><span></span>网络正常</span>
                <span v-if="deviceFlag === false ? true : false" class="point-abnormality"><span></span>网络不正常，请检查设备编码</span>
            </el-form-item>

            <el-form-item label="添加人" v-if="$route.query.id?true:false" :disabled="$route.query.id?true:false" label-width="110px" prop="createdUserName">
                <el-input class="w420" disabled v-model="form.createdUserName" placeholder="请输入人名"></el-input>
            </el-form-item>
            <el-form-item label="更新人" v-if="$route.query.id?true:false" :disabled="$route.query.id?true:false" label-width="110px" prop="updatedUserName">
                <el-input class="w420" disabled v-model="form.updatedUserName" placeholder="请输入人名"></el-input>
            </el-form-item>

            <el-form-item label="添加时间" v-if="$route.query.id?true:false" label-width="110px" prop="createdTime">
                <el-date-picker class="w420" :disabled="$route.query.type==1?true:false" type="datetime" placeholder="选择日期" v-model="form.createdTime"></el-date-picker>
            </el-form-item>

            <el-form-item label="更新时间" v-if="$route.query.id?true:false" label-width="110px" prop="updatedTime">
                <el-date-picker class="w420" :disabled="$route.query.type==1?true:false" type="datetime" placeholder="选择日期" v-model="form.updatedTime"></el-date-picker>
            </el-form-item>
            <el-form-item class="operation-btn" label-width="0">
                <el-button v-if="jurisdictionList.adDisabled && $route.query.type==1?false:true" type="primary" @click="submitForm()">保 存</el-button>
                <el-button @click="handleHistory">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {deviceCreate, deviceUpdate, deviceRead, regionAllRegions, hdCompanyList,getCommonValues,checkDevicePath} from '../../../api/api';
    export default {
        name: 'addEquipment',
        data() {
            return {
                form: {
                    id: '', // 设备ID
                    deviceCode: '', // 设备编码
                    deviceName: '', // 设备名称
                    deviceType: 1, // 设备类型
                    deviceLead: '', // 设备负责人
                    leadPhone: '', // 联系方式
                    deviceRegionId: '', // 设备区域
                    deviceStatus: '', // 设备状态
                    deviceManufactor: '', //设备厂家
                    manufactorPeople: '', // 厂家联系人
                    manufactorPhone: '', // 厂家联系方式
                    companyId: '', // 归属企业
                    devicePath: '', // 直播链接地址
                    deviceBackPath: '', // 录播链接地址
                    createdUserName: '', // 添加人
                    updatedUserName: '', // 更新人
                    createdTime: '', // 添加时间
                    updatedTime: '', // 更新时间
                },
                rules: {
                    deviceCode: [
                        { required: true, message: '请输入设备编码', trigger: 'blur' }
                    ],
                    deviceName: [
                        { required: true, message: '请输入设备名称', trigger: 'blur' }
                    ],
                    deviceLead: [
                        { required: true, message: '请输入设备负责人', trigger: 'blur' }
                    ],
                    leadPhone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    manufactorPeople: [
                        { required: true, message: '请输入厂家联系人', trigger: 'blur' }
                    ],
                    manufactorPhone: [
                        { required: true, message: '请输入厂家联系方式', trigger: 'blur' }
                    ],
                    deviceRegionId: [
                        { required: true, message: '请选择设备区域', trigger: 'change' }
                    ],
                    updatedUserName: [
                        { required: true, message: '请输入更新人', trigger: 'blur' }
                    ],
                    createdUserName: [
                        { required: true, message: '请输入添加人', trigger: 'blur' }
                    ],
                    devicePath: [
                        { required: true, message: '请输入链接地址', trigger: 'blur' }
                    ],
                    deviceManufactor: [
                        { required: true, message: '请选择设备厂家', trigger: 'change' }
                    ],
                    deviceStatus: [
                        { required: true, message: '请选择设备状态', trigger: 'change' }
                    ],
                    equipmentId: [
                        { required: true, message: '请输入企业负责人', trigger: 'blur' }
                    ],
                    deviceType: [
                        { required: true, message: '请选择设备类型', trigger: 'change' }
                    ],
                    createdTime: [
                        { required: true, message: '请选择添加时间', trigger: 'change' }
                    ],
                    updatedTime: [
                        { required: true, message: '请选择更新时间', trigger: 'change' }
                    ],
                    companyId: [
                        { required: true, message: '请选择归属企业', trigger: 'change' }
                    ]
                },
                allRegions: [], // 所有区域
                companyList: [], // 企业列表
                manufacturer: [], // 厂商列表
                equipmentList: [], // 设备类型
                deviceFlag: '', // 设备正常状态
                jurisdictionList: {
                    adDisabled: false,
                }
            };
        },
        created() {
            // 获取归属企业列表
            hdCompanyList({page: 1,limit: 1000,sort: 'created_time',order: 'desc'}).then(res => {
                if (res.data.errno === 0) {
                    this.companyList = res.data.data.items;
                } else {
                    this.$message({
                        showClose: true,
                        message: '归属企业列表' + res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 设备类型
            getCommonValues({type: '00'}).then(res => {
                if (res.data.errno === 0) {
                    this.equipmentList = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: '设备类型' + res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 厂商
            getCommonValues({type: '01'}).then(res => {
                if (res.data.errno === 0) {
                    this.manufacturer = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: '厂商' + res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 获取详情
            if (this.$route.query.id) {
                deviceRead({id: this.$route.query.id}).then(res => {
                    if (res.data.errno === 0) {
                        this.form = res.data.data;
                        this.getRegion(res.data.data.companyId);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '设备详情' + res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            }
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:hdDevice:update' || assignedPermissions[i] === 'admin:hdDevice:create') {
                        this.jurisdictionList.adDisabled = true;
                    }
                }
            }
        },
        methods: {
            getRegion(companyId) {
                this.form.deviceRegionId = '';
                this.allRegions = [];
                // 获取区域列表
                regionAllRegions({companyId: companyId}).then(res => {
                    if (res.data.errno === 0) {
                        this.allRegions = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '区域列表' + res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            },
            /**
             * 获取设备 及 检查设备是否正常
             */
            getCheckDevicePath() {
                checkDevicePath({deviceCode: this.form.deviceCode}).then(res => {
                    if (res.data.errno === 0) {
                        if (Number(res.data.data.code) === 200) {
                            this.form.devicePath = res.data.data.path2;
                            this.form.deviceBackPath = res.data.data.path3;
                            this.form.deviceStatus = 0;
                            this.deviceFlag = true;
                        } else {
                            this.deviceFlag = false;
                            this.form.deviceStatus = 1;
                            this.$message({
                                showClose: true,
                                message: res.data.data.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            },
            /**
             * 提交数据
             */
            submitForm() {
                // 必填校验
                this.$refs.form.validate(valid => {
                    if (valid) {
                        if (this.$route.query.id) {
                            deviceUpdate(this.form).then(res => {
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
                            });
                        } else {
                            deviceCreate(this.form).then(res => {
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
                            });
                        }
                    }
                });
            },
            // 返回上一页
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
        .point-abnormality {
            color: #D90D0D;
            margin-left: 24px;
        }
        .point-abnormality span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background: #D90D0D;
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
                &:hover{
                    background: #4D7CFE;
                    color:#fff ;
                }
            }
        }
    }
    .w420 {
        width: 420px!important;
    }
    .w140 {
        width: 140px!important;
    }
    .w160 {
        width: 140px!important;
    }
</style>