<template>
    <div class="equipmentList">
        <div class="query">
            <div><i class="icon-picture icon-picture-grabble icon-position"></i><el-input class="query-input user-input icon-position" type="text" placeholder="搜索管理员账号" @blur="getCompanyList(1,10)" v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addCompanyAdministrator'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button v-if="jurisdictionList.dtDisabled" @click="deleteCompany(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    v-loading="loading"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>
                <el-table-column prop="companyName" label="企业名称" min-width="80"></el-table-column>
                <el-table-column prop="username" label="账号" min-width="120"></el-table-column>
                <el-table-column prop="username2" label="姓名" min-width="60"></el-table-column>
                <el-table-column prop="roleName" label="角色" min-width="120"></el-table-column>
                <el-table-column prop="tel" label="联系方式" min-width="120"></el-table-column>
                <el-table-column prop="id" label="操作" width="180">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addCompanyAdministratorUpdate',query: {id:scope.row.id}}">
                            <a class="operation-table">编辑</a>
                        </router-link>
                        <a v-if="jurisdictionList.dtDisabled" class="operation-table" @click="deleteCompany(scope.row.id,1)">删除</a>
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
    import {qyAdminList,qyAdminDelete,qyAdminBatchDelete} from '../../../api/api';
    export default {
        name: 'companyAdministratorList',
        data() {
            return {
                userName: '',
                tableData: [],
                options: [],
                multipleSelection: '',
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    upDisabled: false,
                }
            };
        },
        created() {
            this.getCompanyList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:qyAdmin:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:qyAdmin:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdCompany:update') {
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
                this.multipleSelection = '';
                for (let i = 0; i < val.length; i++) {
                    if (i < val.length - 1) {
                        this.multipleSelection += val[i].id + ',';
                    } else {
                        this.multipleSelection += val[i].id;
                    }
                }
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getCompanyList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 查询企业管理员列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getCompanyList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage,
                    companyName: this.userName
                };
                this.loading = true;
                qyAdminList(para).then(res => {
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
            /**
             * 删除企业管理员
             * @param {*} id 企业信息
             * @param {number} type 删除标记 1 单个   2 多个
             */
            deleteCompany(id,type) {
                if (id) {
                    this.$confirm('此操作将永久删除企业管理员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            qyAdminDelete({id: id}).then(res => {
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
                        } else {
                            qyAdminBatchDelete({ids: id}).then(res => {
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
                        message: '请选择要删除的企业管理员',
                        type: 'error'
                    });
                }
            }
        }
    };
</script>

<style scoped>

</style>