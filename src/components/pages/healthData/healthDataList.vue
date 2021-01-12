<template>
    <div class="equipmentList">
        <div class="query">
            <div>
                <el-form :inline="true" class="demo-form-inline query-btn">
                    <el-form-item label="">
                        <el-input class="query-input w200" type="text" placeholder="请输入姓名" v-model="userName"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input class="query-input w200" type="text" placeholder="请输入身份证" v-model="certificatesNum"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getHealthDataList(page,10)"><i class="icon-picture icon-picture-query"></i>查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--<div class="query-btn">
                <router-link :to="{ path:'/addUser'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button><i class="icon-picture icon-picture-to-lead"></i>批量导入</el-button>
                <el-button><i class="icon-picture icon-picture-export"></i>批量导出</el-button>
                <el-button><i class="icon-picture icon-picture-update"></i>一键更新faceId</el-button>
                <el-button><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>-->
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column label="img" min-width="60">
                    <template slot-scope="scope">
                        <img class="head-portrait" :src="scope.row.userImage1" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="80">
                    <template slot-scope="scope">
                        <span class="user-name">{{scope.row.userName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>
                <el-table-column prop="userAge" label="年龄" min-width="60"></el-table-column>
                <el-table-column prop="userSex" label="性别" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userSex === 0">男</span>
                        <span v-if="scope.row.userSex === 1">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="rate" label="心率" width="180">
                    <template slot-scope="scope">
                        <router-link v-if="scope.row.faceId" :to="{ path:'/heartRateList',query: {obj: scope.row}}">
                            <span :class="scope.row.rate > 120 && scope.row.rate < 70 ? 'abnormality' : 'normality'">{{scope.row.rate?scope.row.rate:'无'}}</span>
                        </router-link>
                        <template v-else>
                            <span :class="scope.row.rate > 120 && scope.row.rate < 70 ? 'abnormality' : 'normality'">{{scope.row.rate?scope.row.rate:'无'}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="fatigue" label="疲劳度" min-width="60">
                    <template slot-scope="scope">
                        <router-link v-if="scope.row.faceId" :to="{ path:'/fatigueList',query: {obj: scope.row}}">
                            <span class="normality" v-if="scope.row.fatigue == 0">正常</span>
                            <span class="abnormality" v-else-if="scope.row.fatigue == 1">疲劳</span>
                            <span v-else>{{scope.row.fatigue?scope.row.fatigue:'无'}}</span>
                        </router-link>
                        <template v-else>
                            <span class="normality" v-if="scope.row.fatigue == 0">正常</span>
                            <span class="abnormality" v-else-if="scope.row.fatigue == 1">疲劳</span>
                            <span v-else>{{scope.row.fatigue?scope.row.fatigue:'无'}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="情绪值" min-width="120"></el-table-column>
                <el-table-column prop="rateCheckTime" label="检测时间" min-width="150"></el-table-column>
                <!--<el-table-column prop="id" label="操作" min-width="90">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/caseList',query: {id:scope.row.id}}">
                            <a class="operation-table">病例</a>
                        </router-link>
                        <router-link :to="{ path:'/medicalHistory',query: {id:scope.row.id}}">
                            <a class="operation-table">病史</a>
                        </router-link>
                    </template>
                </el-table-column>-->
            </el-table>
            <!--工具条-->
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
    import {userHealthDataList} from '../../../api/api';

    export default {
        name: 'healthDataList',
        data() {
            return {
                userName: '', // 姓名
                certificatesNum: '', // 身份证
                tableData: [],
                total: 0, // 条数
                page: 1, // 页码
            };
        },
        created() {
            this.getHealthDataList(1,10);
        },
        methods: {
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getHealthDataList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 所有用户的心率疲劳度列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getHealthDataList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    userName: this.userName,
                    certificatesNum: this.certificatesNum
                };
                userHealthDataList(para).then(res => {
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
            }
        }
    };
</script>

<style lang="less">
    .normality {
        color: #28DC29;
    }
    .abnormality {
        color: #D90D0D;
    }
    .w200 {
        width: 200px!important;
    }
</style>