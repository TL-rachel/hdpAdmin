<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索管理员账号" @blur="getAdminList(1,10,userName)" v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link :to="{ path:'/addAdministrator'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button><i class="icon-picture icon-picture-to-lead"></i>批量导入</el-button>
                <el-button><i class="icon-picture icon-picture-export"></i>批量导出</el-button>
                <el-button><i class="icon-picture icon-picture-update"></i>一键更新faceId</el-button>
                <el-button><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>
                <el-table-column prop="username" label="账号" min-width="80"></el-table-column>
                <el-table-column prop="username2" label="姓名" min-width="60"></el-table-column>
                <el-table-column prop="roleName" label="管理员角色" min-width="60"></el-table-column>
                <el-table-column prop="tel" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="id" label="操作" width="120">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/addAdministrator',query: {id:scope.row.id}}">
                            <a class="operation-table">编辑</a>
                        </router-link>
                        <a class="operation-table" @click="deleteAdministrator(scope.row)">删除</a>
                    </template>
                </el-table-column>
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
    import {adminList, roleOptions,adminUpdate} from '../../../api/api';
    export default {
        name: 'administratorList',
        data() {
            return {
                userName: '',
                tableData: [],
                options: [],
                multipleSelection: [],
                total: 0, // 条数
                page: 1, // 页码
            };
        },
        created() {
            roleOptions().then(res => {
                if (res.data.errno === 0) {
                    this.options = res.data.data;
                }
            });
            this.getAdminList(1,10,this.userName);
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getAdminList((typeof val === 'number' ? val : 1), 10,this.userName);
            },
            /**
             * 查询管理员列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             * @param {String} userName 查询姓名
             */
            getAdminList(currentPage, pageSize,userName) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'add_time',
                    page: currentPage
                };
                if (userName) {
                    para.username = userName;
                }
                adminList(para).then(res => {
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
            /**
             * 删除管理员
             * @param {Object} detail 管理员信息
             */
            deleteAdministrator(detail) {
                this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let para = detail;
                    para.deleted = true;
                    adminUpdate(para).then(res => {
                        if (res.data.errno === 0) {
                            this.$message({
                                showClose: true,
                                message: res.data.errmsg,
                                type: 'success'
                            });
                            this.getAdminList(this.page, 10,this.userName);
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.errmsg,
                                type: 'error'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    };
</script>

<style lang="less">
    .user-input {
        width: 542px!important;
    }
    .head-portrait {
        width: 38px;
        height: 38px;
        border-radius: 20px;
    }
    .table-list {
        margin-top: 20px;
    }
    .user-name {
        color: rgba(77, 124, 254, 100);
        font-size: 16px;
    }
    .el-button.toolbar-go-btn.el-button--primary.el-button--mini {
        padding: 0;
        margin: -5px 0 0 0;
    }
    .operation-table {
        cursor: pointer;
        width: 46px;
        height: 18px;
        font-size: 12px;
        padding: 0 10px;
        border-radius: 3px;
        background-color: rgba(242, 247, 250, 1);
    }
</style>