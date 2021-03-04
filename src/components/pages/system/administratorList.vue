<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="账号" label-width="100px">
                    <el-input v-model="form.account" class="w200" placeholder="请输入账号"></el-input>
                </el-form-item>

                <el-form-item label="姓名" label-width="100px">
                    <el-input v-model="form.username" class="w200" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="手机" label-width="100px">
                    <el-input v-model="form.tel" class="w200" placeholder="请输入手机"></el-input>
                </el-form-item>

                <el-form-item label="角色" label-width="100px">
                    <el-select v-model="form.roleId" class="w200" placeholder="请选择角色">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in options" :key="index" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="100px">
                    <el-select v-model="form.status" class="w200" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="有效" value="00"></el-option>
                        <el-option label="无效" value="01"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getAdminList(1,10)"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="query" style="background: transparent;text-align: right">
            <div class="query-btn">
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addAdministrator'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button v-if="jurisdictionList.dtDisabled" @click="deleteAdministrator(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
<!--                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>-->
                <el-table-column prop="username" label="账号" min-width="80"></el-table-column>
                <el-table-column prop="username2" label="姓名" min-width="60"></el-table-column>
                <el-table-column prop="roleName" label="管理员角色" min-width="60"></el-table-column>
                <el-table-column prop="tel" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == '00'">有效</span>
                        <span v-if="scope.row.status == '01'">无效</span>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" width="120">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addAdministratorUpdate',query: {id:scope.row.id}}">
                            <a class="operation-table">编辑</a>
                        </router-link>
                        <a v-if="jurisdictionList.dtDisabled" class="operation-table" @click="deleteAdministrator(scope.row.id,1)">删除</a>
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
    import {adminList, roleOptions,adminBatchDelete, adminDelete} from '../../../api/api';
    export default {
        name: 'administratorList',
        data() {
            return {
                form: {
                    account: '', // 账号
                    username: '', // 姓名
                    tel: '', // 手机
                    roleId: '', // 角色id
                    status: '', // 状态，00:有效，01:无效
                },
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
            roleOptions().then(res => {
                if (res.data.errno === 0) {
                    this.options = res.data.data;
                }
            });
            this.getAdminList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:admin:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:admin:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:admin:update') {
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
                this.getAdminList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 查询管理员列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getAdminList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'add_time',
                    page: currentPage,
                    account: this.form.account, // 账号
                    username: this.form.username, // 姓名
                    tel: this.form.tel, // 手机
                    roleId: this.form.roleId, // 角色id
                    status: this.form.status, // 状态，00:有效，01:无效
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
                this.loading = true;
                adminList(para).then(res => {
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
             * 删除管理员
             * @param {*} id 管理员信息
             * @param {*} type 1 删除单个  2  删除多个
             */
            deleteAdministrator(id,type) {
                if (id) {
                    this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            adminDelete({id: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getAdminList(this.page, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            adminBatchDelete({ids: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getAdminList(this.page, 10);
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
                        message: '请选择要删除的管理员',
                        type: 'error'
                    });
                }
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
        height: 28px;
        line-height: 28px;
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
    .btn-prev {
        border: 1px solid #f2f3f7!important;
        border-right: 0!important;
    }
    .btn-next {
        border: 1px solid #f2f3f7!important;
        border-left: 0!important;
    }
</style>