<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="区域名称" label-width="100px">
                    <el-input v-model="form.regionName" class="w200" placeholder="请输入区域名称"></el-input>
                </el-form-item>

                <el-form-item label="区域位置" label-width="100px">
                    <el-input v-model="form.regionPosition" class="w200" placeholder="请输入区域位置"></el-input>
                </el-form-item>
                <el-form-item label="区域负责人" label-width="100px">
                    <el-input v-model="form.regionLead" class="w200" placeholder="请输入区域负责人"></el-input>
                </el-form-item>
                <el-form-item label="负责人联系方式" label-width="120px">
                    <el-input v-model="form.leadPhone" class="w200" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="操作人" label-width="100px">
                    <el-input v-model="form.regionOperation" class="w200" placeholder="请输入操作人"></el-input>
                </el-form-item>

                <el-form-item label="所属企业" label-width="100px">
                    <el-select v-model="form.companyId" class="w200" placeholder="请选择企业">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <div style="display:inline-block;">
                    <el-form-item label="添加时间" label-width="100px">
                        <el-date-picker class="w200"
                                        v-model="form.regionBeginTime"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                        v-model="form.regionEndTime"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束日期时间">
                        </el-date-picker>
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
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addArea'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button v-if="jurisdictionList.dtDisabled" @click="regionDelete(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="areaList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-loading="loading"
                    @selection-change="handleSelectionChange">
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column prop="regionName" label="区域名称"></el-table-column>
                <el-table-column prop="regionPosition" label="区域位置"></el-table-column>
                <el-table-column label="设备总数" prop="totalDeviceNum">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.rdDisabled" :to="scope.row.totalDeviceNum > 0?{ path:'/equipmentList',query: {deviceRegionId: scope.row.id}}:''">
                            <a>{{scope.row.totalDeviceNum}}</a>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="badDeviceNum" label="异常设备数">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.rdDisabled" :to="scope.row.badDeviceNum > 0?{ path:'/equipmentList',query: {deviceRegionId: scope.row.id}}:''">
                            <a class="anomaly">{{scope.row.badDeviceNum}}</a>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" label="归属企业"></el-table-column>
                <el-table-column prop="regionLead" label="负责人"></el-table-column>
                <el-table-column prop="regionOperation" label="操作人"></el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="160"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="160"></el-table-column>
                <el-table-column prop="id" label="操作" fixed="right" width="170">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.rdDisabled" :to="{ path:'/addAreaDetail',query: {id:scope.row.id,type:1}}">
                            <a class="operation-table">查看</a>
                        </router-link>
                        <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addAreaUpdate',query: {id:scope.row.id}}">
                            <a class="operation-table">编辑</a>
                        </router-link>
                        <a class="operation-table" v-if="jurisdictionList.dtDisabled" @click="regionDelete(scope.row.id,1)">删除</a>
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
    import {companyAllList, regionBatchDelete, regionDelete, regionList} from '../../../api/api';

    export default {
        name: 'areaList',
        data() {
            return {
                form: {
                    regionName: '', // 区域名称
                    regionPosition: '', // 区域位置
                    regionLead: '', // 区域负责人
                    leadPhone: '', // 负责人联系方式
                    regionOperation: '', // 操作人
                    companyId: '', // 所属企业
                    regionBeginTime: '', // 开始时间
                    regionEndTime: '', // 结束时间
                },
                areaList: [],
                multipleSelection: [],
                companyList: [], // 企业列表
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    rdDisabled: false,
                    upDisabled: false,
                }
            };
        },
        created() {
            this.getRegionList(1,10);
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
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:hdRegion:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdRegion:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdRegion:read') {
                        this.jurisdictionList.rdDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdRegion:update') {
                        this.jurisdictionList.upDisabled = true;
                    }
                }
            }
        },
        methods: {
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
                    this.$confirm('此操作将永久删除区域, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            regionDelete({id: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getRegionList(this.page,10);
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
                            regionBatchDelete({ids: ids}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getRegionList(this.page,10);
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
                        message: '请选择要删除的区域',
                        type: 'error'
                    });
                }
            },
            /**
             * 查询区域
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getRegionList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage,
                    regionName: this.form.regionName, // 区域名称
                    regionPosition: this.form.regionPosition, // 区域位置
                    regionLead: this.form.regionLead, // 区域负责人
                    leadPhone: this.form.leadPhone, // 负责人联系方式
                    regionOperation: this.form.regionOperation, // 操作人
                    companyId: this.form.companyId, // 所属企业
                    regionBeginTime: this.form.regionBeginTime, // 开始时间
                    regionEndTime: this.form.regionEndTime, // 结束时间
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
                regionList(para).then(res => {
                    if (res.data.errno === 0) {
                        this.areaList = res.data.data.items;
                        this.total = res.data.data.total;
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
    };
</script>

<style lang="less">
    .areaTitle {
        color: #778CA2!important;
        font-size: 14px;
        .sum {
            color: #4D7CFE;
            font-size: 16px;
        }
        .anomaly {
            color: #DB1A1A;
            font-size: 16px;
        }
    }
    .sum {
        color: #4D7CFE;
        font-size: 16px;
    }
    .anomaly {
        color: #DB1A1A!important;
        font-size: 16px;
    }
    .button-btn {
        text-align: right;
    }
    .module-checkbox {
        .el-checkbox__inner {
            width: 20px;
            height: 20px;
        }
        .el-checkbox__inner:after {
            height: 10px;
            left: 7px;
        }
        .el-checkbox__label {
            display: none;
        }
    }
</style>