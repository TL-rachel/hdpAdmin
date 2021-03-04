<template>
    <div class="equipmentList">
        <div class="query">
            <el-form :inline="true" ref="form" :model="form"
                     class="demo-form-inline query-btn recorded-broadcast">
                <el-form-item label="姓名" label-width="100px">
                    <el-input v-model="form.userName" class="w200" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <div style="display:inline-block;">
                    <el-form-item label="年龄" label-width="100px">
                        <el-input v-model="form.userAgeBegin" class="w200" placeholder="请输入开始年龄"></el-input>
                    </el-form-item>
                    <el-form-item label="-">
                        <el-input v-model="form.userAgeEnd" class="w200" placeholder="请输入结束年龄"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="性别" label-width="100px">
                    <el-select v-model="form.userSex" class="w200" placeholder="请选择性别">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="男" :value="0"></el-option>
                        <el-option label="女" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属企业" label-width="100px">
                    <el-select v-model="form.companyId" class="w200" placeholder="请选择企业">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号" label-width="100px">
                    <el-input v-model="form.userPhone" class="w200" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <div style="display:inline-block;">
                    <el-form-item label="添加时间" label-width="100px">
                        <el-date-picker class="w200"
                                v-model="form.createdTimeBegin"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择开始日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="-">
                        <el-date-picker class="w200"
                                v-model="form.createdTimeEnd"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择结束日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item label="添加人" label-width="100px">
                    <el-select v-model="form.createdUserId" class="w200" filterable placeholder="请选择添加人">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in createdUserList" :key="index" :label="item.username"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getUserList(1,10)"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="query" style="background: transparent;text-align: right">
            <div class="query-btn">
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addUser'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button v-if="jurisdictionList.bfDisabled" @click="batchFaceId()"><i class="icon-picture icon-picture-update"></i>一键更新faceId</el-button>
                <el-button v-if="jurisdictionList.dtDisabled" @click="userDelete(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <div class="table-list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    v-loading="loading"
                    @selection-change="handleSelectionChange">
                <el-table-column fixed type="selection" width="55"></el-table-column>
                <el-table-column label="头像" min-width="60">
                    <template slot-scope="scope">
                        <img class="head-portrait" :src="scope.row.userImage1?scope.row.userImage1:userImgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="180">
                    <template slot-scope="scope">
                        <span class="user-name">{{scope.row.userName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userAge" label="年龄" min-width="60"></el-table-column>
                <el-table-column prop="userSex" label="性别" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userSex == 0">男</span>
                        <span v-if="scope.row.userSex == 1">女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="companyName" label="归属企业" min-width="240"></el-table-column>
                <el-table-column prop="userPhone" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="delFlag" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.delFlag == '0'">有效</span>
                        <span v-if="scope.row.delFlag == '1'">无效</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdUserName" label="添加人" min-width="160"> </el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="160"> </el-table-column>
                <el-table-column prop="updatedUserName" label="更新人" min-width="160"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="160"></el-table-column>
                <el-table-column prop="id" label="操作" fixed="right" width="90">
                    <template slot-scope="scope">
                        <router-link v-if="jurisdictionList.rdDisabled" :to="{ path:'/addUserDetail',query: {id:scope.row.id,type: 1}}">
                            <a>查看详情</a>
                        </router-link>
                        <el-popover trigger="hover" placement="bottom">
                            <p>
                                <router-link v-if="jurisdictionList.upDisabled" :to="{ path:'/addUserUpdate',query: {id:scope.row.id}}">
                                    <a>编辑</a>
                                </router-link>
                                <a v-if="jurisdictionList.dtDisabled" @click="userDelete(scope.row.id,1)">删除</a>
                            </p>
                            <p>
                                <router-link :to="{ path:'/caseList',query: {id:scope.row.id}}">
                                    <a>病历</a>
                                </router-link>
                                <router-link :to="{ path:'/medicalHistoryDetail',query: {id:scope.row.id}}">
                                    <a>病史</a>
                                </router-link>
                            </p>
                            <div slot="reference" class="name-wrapper text-overflow-1">
                                <a>更多操作</a>
                            </div>
                        </el-popover>

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
    import {hdUserList, userBatchDelete, userDelete, userBatchFaceId, companyAllList,adminListAll} from '../../../api/api';
    export default {
        name: 'userList',
        data() {
            return {
                form: {
                    userName: '', // 用户姓名
                    userAgeBegin: '', // 开始年龄
                    userAgeEnd: '', // 结束年龄
                    userSex: '', // 性别
                    userPhone: '', // 手机号
                    companyId: '', // 企业ID
                    createdTimeBegin: '', // 创建开始时间
                    createdTimeEnd: '', // 创建结束时间
                    createdUserId: '', // 添加人
                },
                tableData: [],
                companyList: [], // 企业列表
                createdUserList: [], // 创建人列表
                multipleSelection: '',
                total: 0, // 条数
                page: 1, // 页码
                loading: false,
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    rdDisabled: false,
                    bfDisabled: false,
                    upDisabled: false,
                    csDisabled: false,
                    mcDisabled: false,
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
            this.getCompanyList();
            if (this.$route.query.userSex) {
                this.form.userSex = Number(this.$route.query.userSex);
            }
            if (this.$route.query.companyId) {
                this.form.companyId = this.$route.query.companyId;
            }
            this.getUserList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:user:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdUser:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdUser:read') {
                        this.jurisdictionList.rdDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdUser:update') {
                        this.jurisdictionList.upDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdUser:batchFaceId') {
                        this.jurisdictionList.bfDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdMedical:read') {
                        this.jurisdictionList.mcDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:hdMedicalCase:list') {
                        this.jurisdictionList.csDisabled = true;
                    }
                }
            }
        },
        methods: {
            /**
             * 获取企业
             */
            getCompanyList() {
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
            },
            /**
             * 用户一键更新faceId
             */
            batchFaceId() {
              userBatchFaceId().then(res => {
                  if (res.data.errno === 0) {
                      this.$message({
                          showClose: true,
                          message: '更新成功',
                          type: 'success'
                      });
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
             * 删除操作
             * @param {Number} id 删除用户id
             * @param {Number} type 删除标记 1 单个  2  批量
             */
            userDelete(id,type) {
                if (id) {
                    this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            userDelete(id).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getUserList(1, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            userBatchDelete({ids: id}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getUserList(1, 10);
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
                        message: '请选择要删除的用户',
                        type: 'error'
                    });
                }
            },
            /**
             * 查询用户列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getUserList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    userName: this.form.userName, // 用户姓名
                    userAgeBegin: this.form.userAgeBegin, // 开始年龄
                    userAgeEnd: this.form.userAgeEnd, // 结束年龄
                    userSex: this.form.userSex, // 性别
                    userPhone: this.form.userPhone, // 手机号
                    companyId: this.form.companyId, // 企业ID
                    createdTimeBegin: this.form.createdTimeBegin, // 创建开始时间
                    createdTimeEnd: this.form.createdTimeEnd, // 创建结束时间
                    createdUserId: this.form.createdUserId // 创建人
                };
                for (let key in para) {
                    if (para[key] === '') {
                        delete para[key];
                    }
                }
                this.loading = true;
                hdUserList(para).then(res => {
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
                        this.loading = true;
                    }
                });
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getUserList((typeof val === 'number' ? val : 1), 10);
            },
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
            }
        },
        watch: {
            $route() {
                this.getUserList(1,10);
            }
        },
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
    .el-popover {
        text-align: center;
        a {
            color: #009ce1;
        }
    }
    .el-table--scrollable-x .el-table__body-wrapper {
        overflow-x: auto;
    }

    .el-table .cell {
        white-space: pre-line;
    }
    .query {
        background: #fff;
        padding: 15px 10px 0 10px;
    }
    .el-button {
        margin-left: 10px;
    }
</style>