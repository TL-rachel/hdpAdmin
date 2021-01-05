<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索管理员账号" @blur="getCompanyList(1,10)" v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link :to="{ path:'/addCompany'}">
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
                <el-table-column prop="companyName" label="企业名称" min-width="80"></el-table-column>
                <el-table-column prop="companyCode" label="社会代码" min-width="120"></el-table-column>
                <el-table-column prop="companyContacts" label="联系人" min-width="60"></el-table-column>
                <el-table-column prop="companyTele" label="联系电话" min-width="120"></el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="120"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="120"></el-table-column>
                <el-table-column prop="companyStatus" label="审核状态" min-width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.companyStatus==0">待审核</span>
                        <span v-if="scope.row.companyStatus==1">通过</span>
                        <span v-if="scope.row.companyStatus==2">驳回</span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" width="120">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/addAdministrator',query: {id:scope.row.id}}">
                            <a class="operation-table">编辑</a>
                        </router-link>
                        <a class="operation-table" @click="deleteCompany(scope.row)">删除</a>
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
    import {hdCompanyList,adminUpdate} from '../../../api/api';
    export default {
        name: 'companyList',
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
            this.getCompanyList(1,10);
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getCompanyList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 查询企业列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getCompanyList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage
                };
                hdCompanyList(para).then(res => {
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
             * 删除企业
             * @param {Object} detail 企业信息
             */
            deleteCompany(detail) {
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
                            this.getCompanyList(this.page, 10);
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

<style scoped>

</style>