<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索用户"  @blur="getUserList(1,10)"  v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link :to="{ path:'/addUser'}">
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
                <el-table-column label="img" min-width="60">
                    <template slot-scope="scope">
                        <img v-if="scope.row.userImage1" class="head-portrait" :src="scope.row.userImage1" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="80">
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
                <el-table-column prop="companyName" label="归属企业" width="180"></el-table-column>
                <el-table-column prop="userPhone" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="delFlag" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.delFlag == '0'">有效</span>
                        <span v-if="scope.row.delFlag == '1'">无效</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdUserName" label="添加人"> </el-table-column>
                <el-table-column prop="createdTime" label="添加时间" min-width="150"> </el-table-column>
                <el-table-column prop="updatedUserName" label="更新人"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" min-width="150"></el-table-column>
                <el-table-column prop="id" label="操作" width="90">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/addUser',query: {id:scope.row.id}}">
                            <a>查看详情</a>
                        </router-link>
                        <a href="#">更多操作</a>
                        <router-link :to="{ path:'/caseList'}">
                            <a>病例</a>
                        </router-link>
                        <router-link :to="{ path:'/medicalHistory'}">
                            <a>病史</a>
                        </router-link>
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
    import {hdUserList} from '../../../api/api';
    export default {
        name: 'userList',
        data() {
            return {
                userName: '',
                tableData: [],
                multipleSelection: [],
                total: 0, // 条数
                page: 1, // 页码
            };
        },
        created() {
            this.getUserList(1,10);
        },
        methods: { /**
             * 查询管理员列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getUserList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'created_time',
                    page: currentPage,
                    userName: this.userName
                };
                hdUserList(para).then(res => {
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
                this.getUserList((typeof val === 'number' ? val : 1), 10);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
</style>