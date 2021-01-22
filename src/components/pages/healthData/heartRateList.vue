<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" v-if="userData.userImage1" :src="userData.userImage1" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} &nbsp; {{userData.userSex == 0 ? '男' : '女'}}</div>
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
                <div>{{userData.user_bmi}}</div>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%">
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="rate" label="心率"></el-table-column>
                <el-table-column prop="average" label="24小时内平均值"></el-table-column>
                <el-table-column prop="isException" label="是否异常">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isException == 1">是</span>
                        <span v-if="scope.row.isException == 0">否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="exceptionLevel" label="异常等级">
                    <template slot-scope="scope">
                        <span class="normality" v-if="scope.row.exceptionLevel == 0">正常</span>
                        <span v-if="scope.row.exceptionLevel == 1">反常</span>
                        <span class="abnormality" v-if="scope.row.exceptionLevel == 2">危险</span>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceId" label="设备ID"></el-table-column>
                <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                <el-table-column prop="checkTime" label="检测时间"></el-table-column>
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
    import {heartRateList} from '../../../api/api';
    export default {
        name: 'hearRateList',
        data() {
            return {
                tableData: [],
                userData: {},
                total: 0, // 条数
                page: 1, // 页码
            };
        },
        created() {
            this.userData = this.$route.query.obj;
            this.getHeartRateList(1,10);
        },
        methods: {
            /**
             * 用户心率数据查询列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getHeartRateList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    faceId: this.userData.faceId
                };
                heartRateList(para).then(res => {
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
                this.getHeartRateList((typeof val === 'number' ? val : 1), 10);
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