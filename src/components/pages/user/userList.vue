<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索用户" v-model="userName"></el-input></div>
            <div class="query-btn">
                <router-link :to="{ path:'/addUser'}">
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
                <el-table-column label="img" min-width="60">
                    <template slot-scope="scope">
                        <img class="head-portrait" :src="scope.row.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="80">
                    <template slot-scope="scope">
                        <span class="user-name">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" min-width="60"></el-table-column>
                <el-table-column prop="sex" label="性别" min-width="60"></el-table-column>
                <el-table-column prop="enterprise" label="归属企业" width="180"></el-table-column>
                <el-table-column prop="phoneNumber" label="手机号" min-width="120"></el-table-column>
                <el-table-column prop="status" label="状态" min-width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == '1'">有效</span>
                        <span v-if="scope.row.status == '0'">无效效</span>
                    </template>
                </el-table-column>
                <el-table-column prop="addUser" label="添加人"> </el-table-column>
                <el-table-column prop="bigTime" label="添加时间" min-width="150"> </el-table-column>
                <el-table-column prop="updateUser" label="更新人"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" min-width="150"></el-table-column>
                <el-table-column prop="id" label="操作" width="90">
                    <template slot-scope="scope">
                        <a href="#">{{scope.row.id}}查看详情</a>
                        <a href="#">更多操作</a>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'userList',
        data() {
            return {
                userName: '',
                tableData: [
                    {
                        id: '1',
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        name: '刘亚芳',
                        age: '56',
                        sex: '女',
                        enterprise: '江苏省某某医疗器械公司',
                        phoneNumber: '15900000000',
                        status: '1',
                        addUser: '张三三',
                        bigTime: '2020-12-05 11:00:01',
                        updateUser: '张三三',
                        updateTime: '2020-12-05 11:00:01'
                    },
                    {
                        id: '2',
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        name: '李建国',
                        age: '49',
                        sex: '男',
                        enterprise: '江苏省某某医疗器械公司',
                        phoneNumber: '15900000000',
                        status: '1',
                        addUser: '张三三',
                        bigTime: '2020-12-05 11:00:01',
                        updateUser: '张三三',
                        updateTime: '2020-12-05 11:00:01'
                    },
                    {
                        id: '3',
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        name: '张春梅',
                        age: '59',
                        sex: '女',
                        enterprise: '江苏省某某医疗器械公司',
                        phoneNumber: '15900000000',
                        status: '1',
                        addUser: '张三三',
                        bigTime: '2020-12-05 11:00:01',
                        updateUser: '张三三',
                        updateTime: '2020-12-05 11:00:01'
                    },
                    {
                        id: '4',
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        name: '周平',
                        age: '51',
                        sex: '男',
                        enterprise: '江苏省某某医疗器械公司',
                        phoneNumber: '15900000000',
                        status: '1',
                        addUser: '张三三',
                        bigTime: '2020-12-05 11:00:01',
                        updateUser: '张三三',
                        updateTime: '2020-12-05 11:00:01'
                    },
                    {
                        id: '5',
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        name: '刘力',
                        age: '47',
                        sex: '男',
                        enterprise: '江苏省某某医疗器械公司',
                        phoneNumber: '15900000000',
                        status: '1',
                        addUser: '张三三',
                        bigTime: '2020-12-05 11:00:01',
                        updateUser: '张三三',
                        updateTime: '2020-12-05 11:00:01'
                    }
                ],
                multipleSelection: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
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