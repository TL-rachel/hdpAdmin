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
        <div class="table-list">
            <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addCase',query:{userId: $route.query.id}}">
                <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
            </router-link>
            <el-button v-if="jurisdictionList.dbtDisabled" @click="medicalDelete(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    v-loading="loading"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="inspectTime" label="体检时间">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.inspectTime }}</p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span>{{ scope.row.inspectTime }}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="heartRate" label="心率"></el-table-column>
                <el-table-column prop="bloodComfort" label="血压">
                    <template slot-scope="scope">
                        <span>{{scope.row.bloodComfort}}/{{scope.row.bloodContract}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bloodOxygen" label="血氧"></el-table-column>
                <el-table-column prop="abnormalSymptomDesc" label="异常症状描述">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.abnormalSymptomDesc }}</p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span>{{ scope.row.abnormalSymptomDesc }}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="doctorDiagnosis" label="医生诊断">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.doctorDiagnosis }}</p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span>{{ scope.row.doctorDiagnosis }}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="medicalRecordAttachment" label="病例报告">
                    <template slot-scope="scope">
                        <a v-if="scope.row.medicalRecordAttachment" :href="scope.row.medicalRecordAttachment" target="_blank">病例报告</a>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="medicalReport" label="体检报告">
                    <template slot-scope="scope">
                        <a v-if="scope.row.medicalReport" :href="scope.row.medicalReport" target="_blank">体检报告</a>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="electrocardiogramData" label="心电数据">
                    <template slot-scope="scope">
                        <a v-if="scope.row.electrocardiogramData" :href="scope.row.electrocardiogramData" target="_blank">心电数据</a>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="electrocardiogram" label="心电图">
                    <template slot-scope="scope">
                        <a v-if="scope.row.electrocardiogram" :href="scope.row.electrocardiogram" target="_blank">心电图</a>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="measuringTime" label="测量时间">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.measuringTime }}</p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span>{{ scope.row.measuringTime }}</span>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceCode" label="设备编号"></el-table-column>
                <el-table-column prop="operation" label="操作人"></el-table-column>
                <el-table-column prop="id" label="操作" width="120px">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addCaseUpdate',query: {userId: userData.id,id: scope.row.id}}">
                            <a class="operation-table">修改</a>
                        </router-link>
                        <a v-if="jurisdictionList.dtDisabled" @click="medicalDelete(scope.row.id,1)" class="operation-table">删除</a>
                    </template>
                </el-table-column>
            </el-table><!--工具条-->
            <!--引入页码 start-->
            <el-col :span="24" class="toolbar" style="text-align: center;">
                <div style="display:inline-block;text-align: center;">
                    <el-button size="mini" type="primary" class="toolbar-go-btn">Go
                    </el-button>
                    <el-pagination layout="total,  prev, pager, next, jumper" @current-change="handleCurrentChange"
                                   :page-size="10" :total="total" style="float:right;">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
    import {userRead, medicalCaseList, medicalCaseDelete,medicalCaseBatchDelete} from '../../../api/api';
    export default {
        name: 'caseList',
        data() {
            return {
                tableData: [],
                userData: {},
                multipleSelection: '',
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    dbtDisabled: false,
                    upDisabled: false,
                }
            };
        },
        created() {
            // 获取用户信息
            if (this.$route.query.id) {
                userRead(this.$route.query.id).then(res => {
                    if (res.data.errno === 0) {
                        this.userData = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
                this.getMedicalCaseList(1,10);
            }
            // 权限
            let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
            for (let i = 0; i < assignedPermissions.length; i++) {
                if (assignedPermissions[i] === 'admin:hdMedicalCase:create') {
                    this.jurisdictionList.adDisabled = true;
                } else if (assignedPermissions[i] === 'admin:hdMedicalCase:delete') {
                    this.jurisdictionList.dtDisabled = true;
                } else if (assignedPermissions[i] === 'admin:hdMedicalCase:batch-delete') {
                    this.jurisdictionList.dbtDisabled = true;
                } else if (assignedPermissions[i] === 'admin:hdMedicalCase:update') {
                    this.jurisdictionList.upDisabled = true;
                }
            }
        },
        methods: {
            medicalDelete(id,type) {
                if (id) {
                    this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            medicalCaseDelete(id).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getMedicalCaseList(1, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            medicalCaseBatchDelete({ids: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getMedicalCaseList(1, 10);
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
                        message: '请选择要删除的用户',
                        type: 'error'
                    });
                }
            },
            /**
             * 查询病例列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getMedicalCaseList(currentPage, pageSize) {
                let para = {
                    userId: this.$route.query.id,
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage
                };
                this.loading = true;
                medicalCaseList(para).then(res => {
                    this.loading = false;
                    if (res.data.errno === 0) {
                        this.tableData = res.data.data.items;
                        this.total = res.data.data.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getUserList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 获取选中事件 获取选中id
             * @param {Object} val 值
             */
            handleSelectionChange(val) {
                this.multipleSelection = '';
                for (let i = 0; i < val.length; i++) {
                    if (i < val.length - 1) {
                        this.multipleSelection += val[i].id + ',';
                    } else {
                        this.multipleSelection += val[i].id;
                    }
                }
            }
        }
    };
</script>

<style lang="less">
    .table-list {
        background: #fff;
        padding: 10px;
        .el-button {
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: rgba(242, 247, 250, 1);
            padding: 0 15px;
            color: #4D7CFE;
            border: 0;
            margin-right: 20px;
            margin-bottom: 14px;
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .user-data {
        height: 77px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(185, 187, 190, 0.5);
        padding: 15px;
        .user-property {
            float: left;
            width: 200px;
            .user-name {
                color: rgba(77, 124, 254, 100);
                font-size: 16px;
            }
            .user-custom {
                color: rgba(119, 140, 162, 100);
                font-size: 14px;
            }
        }
        .user-img {
            width: 80px;
        }
    }
</style>