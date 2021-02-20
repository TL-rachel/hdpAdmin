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
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column label="头像" min-width="60">
                    <template slot-scope="scope">
                        <img class="head-portrait" :src="scope.row.userImage1?scope.row.userImage1:userImgUrl" alt="">
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
                            <span :title="scope.row.rate?scope.row.rate:'无检测数据'" :class="scope.row.rate > 120 && scope.row.rate < 70 ? 'abnormality' : 'normality'">{{scope.row.rate?scope.row.rate:'/'}}</span>
                        </router-link>
                        <template v-else>
                            <span :title="scope.row.rate?scope.row.rate:'无检测数据'" :class="scope.row.rate > 120 && scope.row.rate < 70 ? 'abnormality' : 'normality'">{{scope.row.rate?scope.row.rate:'/'}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="fatigue" label="疲劳度" min-width="60">
                    <template slot-scope="scope">
                        <router-link v-if="scope.row.faceId" :to="{ path:'/fatigueList',query: {obj: scope.row}}">
                            <span class="normality" v-if="scope.row.fatigue == 0">正常</span>
                            <span class="abnormality" v-else-if="scope.row.fatigue == 1">疲劳</span>
                            <span :title="scope.row.rate?scope.row.rate:'无检测数据'" v-else>{{scope.row.fatigue?scope.row.fatigue:'/'}}</span>
                        </router-link>
                        <template v-else>
                            <span class="normality" v-if="scope.row.fatigue == 0">正常</span>
                            <span class="abnormality" v-else-if="scope.row.fatigue == 1">疲劳</span>
                            <span :title="scope.row.rate?scope.row.rate:'无检测数据'" v-else>{{scope.row.fatigue?scope.row.fatigue:'/'}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="情绪值" min-width="120"></el-table-column>
                <el-table-column prop="rateCheckTime" label="检测时间" min-width="150"></el-table-column>
                <el-table-column prop="id" label="操作" min-width="150">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/caseList',query: {id:scope.row.id}}">
                            <a class="operation-table">病历</a>
                        </router-link>
                        <router-link :to="{ path:'/medicalHistoryDetail',query: {id:scope.row.id}}">
                            <a class="operation-table">病史</a>
                        </router-link>
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
                loading: false,
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
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
                this.loading = true;
                userHealthDataList(para).then(res => {
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