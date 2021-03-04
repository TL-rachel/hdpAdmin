<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.userImage1?userData.userImage1:userImgUrl" alt="">
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
        <div class="table-list">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="操作人" label-width="100px">
                    <el-input v-model="form.operation" class="w200" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <div style="display:inline-block;">
                    <el-form-item label="体检时间" label-width="100px">
                        <el-date-picker class="w200"
                                        v-model="form.inspectTimeBegin"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                        v-model="form.inspectTimeEnd"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div style="display:inline-block;">
                    <el-form-item label="测量时间" label-width="100px">
                        <el-date-picker class="w200"
                                        v-model="form.measuringTimeBegin"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                        v-model="form.measuringTimeEnd"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getMedicalCaseList(1,10)"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
            <div style="text-align: right">
                <router-link :to="{ path:'/addCase',query:{userId: $route.query.id}}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button @click="medicalDelete(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
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
                        <el-popover v-if="scope.row.medicalRecordAttachments && scope.row.medicalRecordAttachments.length > 0" trigger="hover" placement="top">
                            <p v-for="(item,index) in scope.row.medicalRecordAttachments" :key="index"><a :href="item.url" target="_blank">{{ item.fileName }}</a></p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span v-for="(item,index) in scope.row.medicalRecordAttachments" :key="index">{{ item.fileName }}</span>
                            </div>
                        </el-popover>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="medicalReport" label="体检报告">
                    <template slot-scope="scope">
                        <el-popover v-if="scope.row.medicalReports && scope.row.medicalReports.length > 0" trigger="hover" placement="top">
                            <p v-for="(item,index) in scope.row.medicalReports" :key="index"><a :href="item.url" target="_blank">{{ item.fileName }}</a></p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span v-for="(item,index) in scope.row.medicalReports" :key="index">{{ item.fileName }}</span>
                            </div>
                        </el-popover>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="electrocardiogramData" label="心电数据">
                    <template slot-scope="scope">
                        <el-popover v-if="scope.row.electrocardiogramDatas && scope.row.electrocardiogramDatas.length > 0" trigger="hover" placement="top">
                            <p v-for="(item,index) in scope.row.electrocardiogramDatas" :key="index"><a :href="item.url" target="_blank">{{ item.fileName }}</a></p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span v-for="(item,index) in scope.row.electrocardiogramDatas" :key="index">{{ item.fileName }}</span>
                            </div>
                        </el-popover>
                        <span v-else>——</span>
                    </template>
                </el-table-column>
                <el-table-column prop="electrocardiogram" label="心电图">
                    <template slot-scope="scope">
                        <el-popover v-if="scope.row.electrocardiograms && scope.row.electrocardiograms.length > 0" trigger="hover" placement="top">
                            <p v-for="(item,index) in scope.row.electrocardiograms" :key="index"><a :href="item.url" target="_blank">{{ item.fileName }}</a></p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <span v-for="(item,index) in scope.row.electrocardiograms" :key="index">{{ item.fileName }}</span>
                            </div>
                        </el-popover>
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
                        <router-link :to="{ path:'/addCaseUpdate',query: {userId: userData.id,id: scope.row.id}}">
                            <a class="operation-table">修改</a>
                        </router-link>
                        <a @click="medicalDelete(scope.row.id,1)" class="operation-table">删除</a>
                    </template>
                </el-table-column>
            </el-table><!--工具条-->
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
    import {userRead, medicalCaseList, medicalCaseDelete,medicalCaseBatchDelete} from '../../../api/api';
    export default {
        name: 'caseList',
        data() {
            return {
                form: {
                    inspectTimeBegin: '', // 体检开始时间
                    inspectTimeEnd: '', // 体检结束时间
                    measuringTimeBegin: '', // 测量开始时间
                    measuringTimeEnd: '', // 测量结束时间
                    operation: '', // 操作人
                },
                tableData: [],
                userData: {},
                multipleSelection: '',
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
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
                    page: currentPage,
                    inspectTimeBegin: this.form.inspectTimeBegin, // 体检开始时间
                    inspectTimeEnd: this.form.inspectTimeEnd, // 体检结束时间
                    measuringTimeBegin: this.form.measuringTimeBegin, // 测量开始时间
                    measuringTimeEnd: this.form.measuringTimeEnd, // 测量结束时间
                    operation: this.form.operation, // 操作人
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
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
</style>