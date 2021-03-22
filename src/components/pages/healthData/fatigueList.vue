<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" :src="userData.userImage1?userData.userImage1:userImgUrl" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.userName}}</div>
                <div class="user-custom">{{userData.userAge}} 岁 &nbsp; {{userData.userSex == 0 ? '男' : '女'}}</div>
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
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%">
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="fatigue" label="疲劳值">
                    <template slot-scope="scope">
                        <span class="normality" v-if="scope.row.fatigue == 0">正常</span>
                        <span class="abnormality" v-else-if="scope.row.fatigue == 1">疲劳</span>
                        <span v-else>{{scope.row.fatigue}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="deviceId" label="设备ID"></el-table-column>
                <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                <el-table-column prop="checkTime" label="检测时间"></el-table-column>
                <el-table-column prop="algorithmVersion" label="算法版本"></el-table-column>
                <el-table-column prop="algorithmTime" label="算法更新时间"></el-table-column>
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
    import {fatigueList} from '../../../api/api';
    export default {
        name: 'fatigueList',
        data() {
            return {
                tableData: [],
                userData: {},
                total: 0, // 条数
                page: 1, // 页码
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
            };
        },
        created() {
            this.userData = this.$route.query.obj;
            this.getFatigueList(1,10);
        },
        methods: {
            /**
             * 用户心率数据查询列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getFatigueList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    faceId: this.userData.faceId
                };
                fatigueList(para).then(res => {
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
</style>