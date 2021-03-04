<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="企业" label-width="100px">
                    <el-select v-model="form.companyId" class="w200" placeholder="请选择企业">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" label-width="100px">
                    <el-input v-model="form.username" class="w200" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="100px">
                    <el-input v-model="form.username2" class="w200" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="角色" label-width="100px">
                    <el-select v-model="form.roleIds" class="w200" placeholder="请选择角色">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in options" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="联系方式" label-width="100px">
                    <el-input v-model="form.tel" class="w200" placeholder="请输入联系方式"></el-input>
                </el-form-item>

                <el-form-item label="状态" label-width="100px">
                    <el-select v-model="form.status" class="w200" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="有效" value="00"></el-option>
                        <el-option label="无效" value="01"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getCompanyList(1,10)"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="query" style="background: transparent;text-align: right">
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
                <el-table-column prop="status" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == '00'">有效</span>
                        <span v-if="scope.row.status == '01'">无效</span>
                    </template>
                </el-table-column>
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
    import {qyAdminList, qyAdminDelete, qyAdminBatchDelete, roleOptions, companyAllList} from '../../../api/api';
    export default {
        name: 'companyAdministratorList',
        data() {
            return {
                form: {
                    companyId: '', // 企业名称
                    username: '', // 账号
                    username2: '', // 姓名
                    roleIds: '', // 角色
                    tel: '', // 联系方式
                    status: '', // 状态
                },
                tableData: [],
                options: [],
                companyList: [],
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
            // 获取企业
            companyAllList().then(res => {
                if (res.data.errno === 0) {
                    this.companyList = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.errmsg,
                        type: 'error',
                    });
                }
            });
            // 获取角色列表
            roleOptions().then(res => {
                if (res.data.errno === 0) {
                    this.options = res.data.data;
                }
            });
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
                    companyId: this.form.companyId, // 企业名称
                    username: this.form.username, // 账号
                    username2: this.form.username2, // 姓名
                    roleIds: this.form.roleIds, // 角色
                    tel: this.form.tel, // 联系方式
                    status: this.form.status, // 状态
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
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