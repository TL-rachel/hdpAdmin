<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input user-input" type="text" placeholder="搜索用户" v-model="userName"></el-input></div>
            <div class="query-btn">
                <el-button @click="dialogFormVisible = true">添加</el-button>
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
                <el-table-column prop="name" label="账号" min-width="80"></el-table-column>
                <el-table-column prop="age" label="姓名" min-width="60"></el-table-column>
                <el-table-column prop="sex" label="管理员角色" min-width="60"></el-table-column>
                <el-table-column prop="phoneNumber" label="手机号" min-width="120"></el-table-column>
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

        <el-dialog title="收货地址" width="500" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" prop="name" label-width="100px">
                    <el-input class="w320" v-model="form.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" prop="state" label-width="100px">
                    <el-input type="textarea" class="w320" v-model="form.state" placeholder="请输入角色说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm()">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {roleOptions} from '../../../api/api';
    export default {
        name: 'roleManagement',
        data() {
            return {
                userName: '',
                tableData: [],
                form: {
                    name: '',
                    state: ''
                },
                dialogFormVisible: false,
                multipleSelection: '',
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: '请输入角色说明', trigger: 'blur' }
                    ],
                }
            };
        },
        created() {
            roleOptions().then(res => {
                console.log(res)
            })
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        console.log(this.form)
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    };
</script>

<style lang="less">
    .el-dialog {
        width: 500px;
        .el-button {
            width: 153px;
            height: 46px;
            border-radius: 4px;
            border: 0;
            color: #4D7CFE;
            background-color: rgba(242, 247, 250, 1);
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .w320 {
        width: 320px!important;
    }
    .el-textarea {
        textarea {
            width: 320px!important;
        }
    }
    .el-dialog__header {
        text-align: center;
        color: rgba(42, 42, 53, 100);
        font-size: 14px;
        font-family: PingFangSC-Medium;
    }
    .el-dialog__footer {
        text-align: center;
    }
</style>