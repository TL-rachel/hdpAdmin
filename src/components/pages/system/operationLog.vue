<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" :model="form" class="demo-form-inline query-btn">
                <el-form-item label="">
                    <el-select v-model="form.optType" placeholder="操作类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in selectByOptType" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="form.optUserName" placeholder="操作人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLogList(1,10)"><i class="icon-picture icon-picture-query"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>
                <el-table-column prop="companyName" label="变更企业" min-width="80"></el-table-column>
                <el-table-column prop="optUserName" label="操作人" min-width="60"></el-table-column>
                <el-table-column prop="optType" label="操作类型" min-width="60"></el-table-column>
                <el-table-column prop="optAction" label="操作行为" min-width="60"></el-table-column>
                <el-table-column prop="createdTime" label="操作时间" min-width="60"></el-table-column>
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
    import {operationLogList,selectByOptType} from '../../../api/api';
    export default {
        name: 'operationLog',
        data() {
            return {
                form: {
                    optType: '', // =操作类型
                    optUserName: '' // =操作人
                },
                tableData: [], // 列表
                selectByOptType: [], // 列表
                total: 0, // 条数
                page: 1, // 页码
            };
        },
        created() {
            // 获取操作类型接口
            selectByOptType().then(res => {
                if (res.data.errno === 0) {
                    this.selectByOptType = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 获取列表
            this.getLogList(1,10);
        },
        methods: {
            /**
             * 查询角色列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             * @param {Object} obj 查询姓名
             */
            getLogList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    optType: this.form.optType,
                    optUserName: this.form.optUserName
                };
                operationLogList(para).then(res => {
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
                this.getLogList((typeof val === 'number' ? val : 1), 10);
            },
        }
    };
</script>

<style lang="less">
</style>