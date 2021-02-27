<template>
    <div class="equipmentList">
        <div class="query">
            <div><i class="icon-picture icon-picture-grabble icon-position"></i><el-input class="query-input user-input icon-position" type="text" placeholder="搜索用户"  @blur="getUserList(1,10)"  v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link v-if="jurisdictionList.adDisabled" :to="{ path:'/addUser'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <!--<el-button><i class="icon-picture icon-picture-to-lead"></i>批量导入</el-button>
                <el-button><i class="icon-picture icon-picture-export"></i>批量导出</el-button>-->
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
    import {hdUserList, userBatchDelete, userDelete,userBatchFaceId} from '../../../api/api';
    export default {
        name: 'userList',
        data() {
            return {
                userName: '',
                tableData: [],
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
                    userName: this.userName,
                    userSex: this.$route.query.userSex ? this.$route.query.userSex : '',
                    companyId: this.$route.query.companyId ? this.$route.query.companyId : '',
                };
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
</style>