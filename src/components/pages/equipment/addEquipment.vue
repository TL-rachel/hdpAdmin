<template>
    <div class="form-save">
        <el-form ref="form" class="clearfix" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="设备ID" label-width="90px">
                <el-input class="w420" v-model="form.equipmentId" placeholder="请输入设备ID"></el-input>
            </el-form-item>

            <el-form-item label="设备编码" label-width="90px">
                <el-input class="w420" v-model="form.equipmentEncoding" placeholder="请输入设备编码"></el-input>
            </el-form-item>

            <el-form-item label="设备名称" label-width="90px">
                <el-input class="w420" v-model="form.equipmentName" placeholder="请输入设备名称"></el-input>
            </el-form-item>

            <el-form-item label="设备类型" label-width="90px">
                <el-select class="w420" v-model="form.equipmentType" placeholder="请选择设备类型">
                    <el-option label="类型一" value="shanghai"></el-option>
                    <el-option label="类型二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备负责人" label-width="90px">
                <el-input class="w420" v-model="form.equipmentPrincipal" placeholder="请输入人名"></el-input>
            </el-form-item>

            <el-form-item label="联系方式" label-width="90px">
                <el-input class="w420" v-model="form.contactInformation" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="设备区域" label-width="90px">
                <el-input class="w420" v-model="form.equipmentArea" placeholder="请输入区域"></el-input>
            </el-form-item>

            <el-form-item label="设备状态" label-width="90px">
                <el-select class="w420" v-model="form.equipmentStatus" placeholder="请选择设备状态">
                    <el-option label="正常" value="shanghai"></el-option>
                    <el-option label="断开" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备厂家" label-width="90px">
                <el-select class="w420" v-model="form.equipmentVender" placeholder="请选择设备厂家">
                    <el-option label="厂家一" value="shanghai"></el-option>
                    <el-option label="厂家二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="厂家联系人" label-width="90px" style="width: 22%;">
                <el-input class="w140" v-model="form.venderContact" placeholder="请输入人名"></el-input>
            </el-form-item>
            <el-form-item label="厂家联系方式" label-width="100px" style="width: 25%;">
                <el-input class="w140" v-model="form.venderContactInformation" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="归属企业" label-width="90px">
                <el-select class="w420" v-model="form.equipmentEnterprise" placeholder="请选择归属企业">
                    <el-option label="企业一" value="shanghai"></el-option>
                    <el-option label="企业二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="链接地址" label-width="90px" style="width: 100%;">
                <el-input class="w420" v-model="form.equipmentAddress" placeholder="请输入网络地址"></el-input>
                <el-button class="test-btn">点击测试</el-button>
                <span class="point"><span></span>网络正常</span>
            </el-form-item>

            <el-form-item label="添加人" label-width="90px">
                <el-input class="w420" v-model="form.equipmentAdd" placeholder="请输入人名"></el-input>
            </el-form-item>
            <el-form-item label="更新人" label-width="90px">
                <el-input class="w420" v-model="form.equipmentUpdate" placeholder="请输入人名"></el-input>
            </el-form-item>

            <el-form-item label="添加时间" label-width="90px">
                <el-date-picker class="w420" type="datetime" placeholder="选择日期" v-model="form.bigTime"></el-date-picker>
            </el-form-item>

            <el-form-item label="更新时间" label-width="90px">
                <el-date-picker class="w420" type="datetime" placeholder="选择日期" v-model="form.renewalTime"></el-date-picker>
            </el-form-item>
            <el-form-item class="operation-btn" label-width="0">
                <el-button type="primary" @click="submitForm()">保 存</el-button>
                <el-button @click="handleHistory">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {regionCreate,regionUpdate,regionRead} from '../../../api/api';
    export default {
        name: 'addEquipment',
        data() {
            return {
                form: {
                    equipmentId: '', // 设备ID
                    equipmentEncoding: '', // 设备编码
                    equipmentName: '', // 设备名称
                    equipmentType: '', // 设备类型
                    equipmentPrincipal: '', // 设备负责人
                    contactInformation: '', // 联系方式
                    equipmentArea: '', // 设备区域
                    equipmentStatus: '', // 设备状态
                    equipmentVender: '', //设备厂家
                    venderContact: '', // 厂家联系人
                    venderContactInformation: '', // 厂家联系方式
                    equipmentEnterprise: '', // 归属企业
                    equipmentAddress: '', // 链接地址
                    equipmentAdd: '', // 添加人
                    equipmentUpdate: '', // 更新人
                    bigTime: '', // 添加时间
                    renewalTime: '', // 更新时间
                },
                rules: {
                    equipmentId: [
                        { required: true, message: '请输入企业负责人', trigger: 'blur' }
                    ],
                    equipmentEncoding: [
                        { required: true, message: '请选择企业星级', trigger: 'change' }
                    ]
                }
            };
        },
        created() {
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