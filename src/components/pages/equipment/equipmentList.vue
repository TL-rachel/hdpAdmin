<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="设备名称" label-width="100px">
                    <el-input v-model="form.deviceName" class="w200" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="设备编码" label-width="100px">
                    <el-input v-model="form.deviceCode" class="w200" placeholder="请输入编码"></el-input>
                </el-form-item>
                <el-form-item label="负责人" label-width="100px">
                    <el-input v-model="form.deviceLead" class="w200" placeholder="请输入负责人"></el-input>
                </el-form-item>
                <el-form-item label="所属企业" label-width="100px">
                    <el-select v-model="form.companyId" class="w200" @change="getRegion(form.companyId)" placeholder="请选择企业">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备区域" label-width="100px">
                    <el-select v-model="form.deviceRegionId" class="w200" filterable placeholder="请选择负责人">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in allRegions" :key="index" :label="item.regionName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <div style="display:inline-block;">
                    <el-form-item label="添加时间" label-width="100px">
                        <el-date-picker class="w200"
                                        v-model="form.deviceBeginTime"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                        v-model="form.deviceEndTime"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="设备状态" label-width="100px">
                        <el-select v-model="form.deviceStatus" class="w200" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="断开" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getRegionList(1,10)"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="query" style="background: transparent;text-align: right">
           <div class="query-btn">
               <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addEquipment'}">
                   <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
               </router-link>
               <el-button v-if="jurisdictionList.bcdDisabled" @click="getCheckDevicePath()"><i class="icon-picture icon-picture-detection"></i>批量检测</el-button>
               <el-button v-if="jurisdictionList.dtDisabled" @click="regionDelete(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
           </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="equipmentList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-loading="loading"
                    @selection-change="handleSelectionChange">
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column label="设备名称" prop="deviceName"></el-table-column>
                <el-table-column prop="deviceCode" label="编码"></el-table-column>
                <el-table-column prop="companyName" label="归属企业"></el-table-column>
                <el-table-column prop="deviceLead" label="负责人"></el-table-column>
                <el-table-column prop="regionName" label="设备区域"></el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="160"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="160"></el-table-column>
                <el-table-column prop="deviceStatus" label="设备状态">
                    <template slot-scope="scope">
                        {{scope.row.deviceStatus == '0' ? '正常' : '断开'}}
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" fixed="right" width="90">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.rdDisabled" :to="{ path:'/addEquipment',query: {id:scope.row.id,type:1}}">
                            <a>查看详情</a>
                        </router-link>
                        <el-popover trigger="hover" placement="bottom">
                            <p>
                                <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addEquipment',query: {id:scope.row.id}}">
                                    <a>编辑</a>
                                </router-link>
                                <a v-if="jurisdictionList.dtDisabled" @click="regionDelete(scope.row.id,1)">删除</a>
                            </p>
                            <p>
                                <router-link :to="{ path:'/liveStreaming',query: {obj:JSON.stringify(scope.row)}}">
                                    <a>直播</a>
                                </router-link>
                                <router-link :to="{ path:'/recordedBroadcast',query: {obj:JSON.stringify(scope.row)}}">
                                    <a>录播</a>
                                </router-link>
                            </p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <a>更多操作</a>
                            </div>
                        </el-popover>

                    </template>
                </el-table-column>
            </el-table>
            <!--工具条-->
            <!--引入页码 start-->
            <el-col :span="24" class="toolbar" style="text-align: center;">
                <div style="display:inline-block;text-align: center;">
                    <el-button size="mini" type="primary" class="toolbar-go-btn">Go
                    </el-button>
                    <el-pagination background layout="total,  prev, pager, next, jumper" @current-change="handleCurrentChange"
                                   :page-size="10" :total="total" style="float:right;">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {
        deviceList,
        deviceDelete,
        deviceBatchDelete,
        batchCheckDevicePath,
        companyAllList,
        regionAllRegions
    } from '../../../api/api';
    export default {
        name: 'equipmentList',
        data() {
            return {
                form: {
                    deviceCode: '', // 设备编码
                    deviceName: '', // 设备名称
                    deviceStatus: '', // 设备状态
                    deviceLead: '', // 负责人
                    deviceRegionId: '', // 区域id
                    companyId: '', // 企业id
                    deviceBeginTime: '', // 开始时间
                    deviceEndTime: '', // 结束时间
                },
                tags: [],
                equipmentList: [], // 初始化所有设备列表
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                checkId: [], // 用于批量删除的设备id
                multipleSelection: [],
                companyList: [], // 企业列表
                allRegions: [], // 区域列表
                initAllIds: '', // 用于批量检测的设备id
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    bcdDisabled: false,
                    rdDisabled: false,
                    upDisabled: false,
                }
            };
        },
        created() {
            this.getCompanyList();
            if (this.$route.query.deviceStatus) {
                this.form.deviceStatus = this.$route.query.deviceStatus;
            }
            if (this.$route.query.companyId) {
                this.form.companyId = this.$route.query.companyId;
            }
            if (this.$route.query.deviceRegionId) {
                this.form.deviceRegionId = this.$route.query.deviceRegionId;
            }
            this.getRegionList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:hdDevice:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdDevice:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdDevice:batchCheck') {
                        this.jurisdictionList.bcdDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdDevice:read') {
                        this.jurisdictionList.rdDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdDevice:update') {
                        this.jurisdictionList.upDisabled = true;
                    }
                }
            }
        },
        watch: {
            $route() {
                this.getRegionList(1,10);
            }
        },
        methods: {
            /**
             * 获取区域
             * @param {Number} companyId 企业id
             */
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
             * 获取企业
             */
            getCompanyList() {
                // 获取企业
                companyAllList().then(res => {
                    if (res.data.errno === 0) {
                        this.companyList = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error',
                        });
                    }
                });
            },
            // 批量检测功能
            getCheckDevicePath() {
                batchCheckDevicePath().then(res => {
                    if (res.data.errno === 0) {
                        this.getRegionList(this.page,10);
                        this.$message({
                            showClose: true,
                            message: '检测成功',
                            type: 'success'
                        });
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
             * 获取选中事件 获取选中id
             * @param {Object} val 值
             */
            handleSelectionChange(val) {
                this.multipleSelection = [];
                for (let i = 0; i < val.length; i++) {
                    this.multipleSelection.push(val[i].id);
                }
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getRegionList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 删除操作
             * @param {*} id 删除区域id
             * @param {Number} type 删除标记 1 单个  2  批量
             */
            regionDelete(id,type) {
                if (id && id.toString().length > 0) {
                    this.$confirm('此操作将永久删除设备, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            deviceDelete({id: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getRegionList();
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            let ids = '';
                            for (let i = 0; i < id.length; i++) {
                                if (i < id.length - 1) {
                                    ids += id[i] + ',';
                                } else {
                                    ids += id[i];
                                }
                            }
                            deviceBatchDelete({ids: ids}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getRegionList();
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择要删除的设备',
                        type: 'error'
                    });
                }
            },
            /**
             * 初始化查询设备列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getRegionList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage,
                    deviceCode: this.form.deviceCode, // 设备编码
                    deviceName: this.form.deviceName, // 设备名称
                    deviceStatus: this.form.deviceStatus, // 设备状态
                    deviceLead: this.form.deviceLead, // 负责人
                    deviceRegionId: this.form.deviceRegionId, // 区域id
                    companyId: this.form.companyId, // 企业id
                    deviceBeginTime: this.form.deviceBeginTime, // 开始时间
                    deviceEndTime: this.form.deviceEndTime, // 结束时间
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
                this.loading = true;
                deviceList(para).then(res => {
                    this.loading = false;
                    if (res.data.errno === 0) {
                        this.equipmentList = res.data.data.items;
                        this.total = res.data.data.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                        this.loading = true;
                    }
                });
            }
        }
    };
</script>

<style lang="less">
    .clearfix:after {
        content: "";
        display: block;
        visibility: hidden;
        height: 0;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }
    .query {
        .query-input {
            width: 772px;
            height: 36px;
            line-height: 36px;
            .el-input__inner {
                border-radius: 20px!important;
            }
        }
        .query-btn .el-button {
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: rgba(242, 247, 250, 1);
            padding: 0 15px;
            color: #4D7CFE;
            border: 0;
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .equipmentType {
        background: #fff;
        margin-top: 16px;
        padding: 16px;
        h4 {
            height: 22px;
            line-height: 22px;
            color: rgba(15, 15, 16, 100);
            font-size: 16px;
            font-family: PingFangSC-Regular;
        }
        .equipmentDetail {
            width: 268px;
            height: 268px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.11);
            margin-top: 16px;
            padding: 14px 7px;
            float: left;
            margin-right: 16px;
            position: relative;
            .module-checkbox {
                position: absolute;
                top: 0;
                left: 0;
            }
            .equipmentTitle {
                display: flex;
                justify-content: space-between;
                color: #0F0F10;
                margin-left: 10px;
                .equipment-status {
                    font-size: 12px;
                    .point-1 {
                        color: #0DD90E;
                        span {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            background: #0DD90E;
                            margin-right: 4px;
                        }
                    }
                    .point-0 {
                        color: #D90D0D;
                        span {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            background: #D90D0D;
                            margin-right: 4px;
                        }
                    }
                }
            }
            .encoding {
                height: 20px;
                color: rgba(119, 140, 162, 100);
                font-size: 14px;
                font-family: PingFangSC-Regular;
                margin-left: 10px;
            }
            .wire {
                width: 234px;
                height: 1px;
                display: inline-block;
                background: #E8EEFC;
                margin-left: 10px;
            }
            .rests {
                color: #778CA2;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                margin-left: 10px;
            }
            .button-btn .el-button {
                width: 46px;
                height: 18px;
                border-radius: 3px;
                background-color: rgba(242, 247, 250, 1);
                color: #4D7CFE;
                padding: 0;
                border: 0;
                font-size: 12px;
                margin: 5px 0 0 0;
            }
        }
    }
    .el-table .cell {
        white-space: normal;
    }
</style>