<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索用户" v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link :to="{ path:'/addAdministrator'}">
                    <el-button>添加</el-button>
                </router-link>
                <el-button>批量导入</el-button>
                <el-button>批量导出</el-button>
                <el-button>一键更新faceId</el-button>
                <el-button>批量删除</el-button>
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
                <el-table-column prop="account" label="账号" min-width="80"></el-table-column>
                <el-table-column prop="name" label="姓名" min-width="60"></el-table-column>
                <el-table-column prop="management" label="管理员角色" min-width="60"></el-table-column>
                <el-table-column prop="tel" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="id" label="操作" width="90">
                    <template slot-scope="scope">
                        <a href="#">{{scope.row.id}}</a>
                        <router-link :to="{ path:'/caseList'}">
                            <a>编辑</a>
                        </router-link>
                        <a href="#">删除</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {adminList} from '../../../api/api';
    export default {
        name: 'administratorList',
        data() {
            return {
                userName: '',
                tableData: [],
                multipleSelection: []
            };
        },
        created() {
            adminList().then(res => {
                console.log(res)
            })
        },
        methods: {
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