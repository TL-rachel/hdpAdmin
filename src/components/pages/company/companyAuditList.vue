<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="企业名称" label-width="100px">
                    <el-input v-model="form.companyName" class="w200" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="社会代码" label-width="100px">
                    <el-input v-model="form.companyCode" class="w200" placeholder="请输入社会代码"></el-input>
                </el-form-item>
                <el-form-item label="联系人" label-width="100px">
                    <el-input v-model="form.companyContacts" class="w200" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系手机" label-width="100px">
                    <el-input v-model="form.companyPhone" class="w200" placeholder="请输入联系手机"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="100px">
                    <el-input v-model="form.companyTele" class="w200" placeholder="请输入联系电话"></el-input>
                </el-form-item>

                <div style="display:inline-block;">
                    <el-form-item label="添加时间" label-width="100px">
                        <el-date-picker class="w200"
                                        v-model="form.companyBeginTime"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                        v-model="form.companyEndTime"
                                        type="datetime"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="选择结束日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item label="审核状态" label-width="100px">
                    <el-select v-model="form.companyStatus" class="w200" placeholder="请选择审核状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="驳回" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人" label-width="100px">
                    <el-select v-model="form.examineUserId" class="w200" filterable placeholder="请选择审核人">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in createdUserList" :key="index" :label="item.username"
                                   :value="item.id"></el-option>
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
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addCompany'}">
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
                <el-table-column prop="companyCode" label="社会代码" min-width="120"></el-table-column>
                <el-table-column prop="companyContacts" label="联系人" min-width="60"></el-table-column>
                <el-table-column prop="companyPhone" label="联系电话" min-width="120"></el-table-column>
                <el-table-column prop="companyPhone" label="联系手机" min-width="120"></el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="120"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="120"></el-table-column>
                <el-table-column prop="companyStatus" label="审核状态" min-width="120">
                    <template slot-scope="scope">
                        <div class="audit whiteSpNo" v-if="scope.row.companyStatus==0">
                            审核中
                        </div>
                        <div class="normality whiteSpNo" v-if="scope.row.companyStatus==1">
                            通过
                             <el-tooltip v-if="scope.row.examineContent" class="item" effect="dark" :content="scope.row.examineContent" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </div>
                        <div class="abnormality whiteSpNo" v-if="scope.row.companyStatus==2">
                            驳回
                            <el-tooltip v-if="scope.row.examineContent" class="item" effect="dark" :content="scope.row.examineContent" placement="top">
                                <i class="iconfont icon-wenhao"></i>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作" width="180">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.atDisabled" :to="{ path:'/addCompanyAudit',query: {id:scope.row.id,type:2}}">
                            <a v-if="scope.row.companyStatus == 0" class="operation-table">审核</a>
                        </router-link>
                        <router-link :to="{ path:'/addCompanyAuditRead',query: {id:scope.row.id,type:3}}">
                            <a class="operation-table">查看</a>
                        </router-link>
                        <!--<a v-if="jurisdictionList.dtDisabled" class="operation-table" @click="deleteCompany(scope.row,1)">删除</a>-->
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
    import {hdCompanyAuditList, companyAuditDelete, companyAuditBatchDelete, adminListAll} from '../../../api/api';
    export default {
        name: 'companyAuditList',
        data() {
            return {
                form: {
                    companyName: '', // 企业名称
                    companyCode: '', // 社会代码
                    companyContacts: '', // 联系人
                    companyPhone: '', // 联系手机
                    companyTele: '', // 联系电话
                    companyBeginTime: '', // 开始时间
                    companyEndTime: '', // 结束时间
                    companyStatus: '', // 审核状态
                    examineUserId: '', // 审核人
                },
                tableData: [],
                options: [],
                createdUserList: [],
                multipleSelection: '',
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    atDisabled: false,
                }
            };
        },
        created() {
            // 获取更新人
            adminListAll().then(res => {
                if (res.data.errno === 0) {
                    this.createdUserList = res.data.data;
                }
            });
            this.getCompanyList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:hdCompanyAudit:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdCompanyAudit:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdCompanyAudit:update') {
                        this.jurisdictionList.atDisabled = true;
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
             * 查询企业列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getCompanyList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage,
                    companyName: this.form.companyName, // 企业名称
                    companyCode: this.form.companyCode, // 社会代码
                    companyContacts: this.form.companyContacts, // 联系人
                    companyPhone: this.form.companyPhone, // 联系手机
                    companyTele: this.form.companyTele, // 联系电话
                    companyBeginTime: this.form.companyBeginTime, // 开始时间
                    companyEndTime: this.form.companyEndTime, // 结束时间
                    companyStatus: this.form.companyStatus, // 审核状态
                    examineUserId: this.form.examineUserId, // 审核人
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
                this.loading = true;
                hdCompanyAuditList(para).then(res => {
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
             * 删除企业
             * @param {Object} detail 企业信息
             * @param {number} type 删除标记 1 单个   2 多个
             */
            deleteCompany(detail,type) {
                if (detail) {
                    this.$confirm('此操作将永久删除企业, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            companyAuditDelete({id: detail.id}).then(res => {
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
                            companyAuditBatchDelete({ids: detail}).then(res => {
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
                        message: '请选择要删除的企业',
                        type: 'error'
                    });
                }
            }
        }
    };
</script>

<style lang="less">
.audit {
    color: #FFA430;
}
    .whiteSpNo{
        white-space: normal;
    }
</style>