<template>
    <div class="equipmentList">
        <div class="query query-role">
            <div><i class="icon-picture icon-picture-grabble icon-position"></i><el-input class="query-input user-input icon-position" type="text" placeholder="搜索角色名称" @blur="getRoleList(1,10)" v-model="name"></el-input></div>
            <div class="query-btn">
                <el-button v-if="jurisdictionList.adDisabled" @click="openUpdateRole(0,{})"><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                <!--<el-button><i class="icon-picture icon-picture-to-lead"></i>批量导入</el-button>
                <el-button><i class="icon-picture icon-picture-export"></i>批量导出</el-button>
                <el-button><i class="icon-picture icon-picture-update"></i>一键更新faceId</el-button>-->
                <el-button v-if="jurisdictionList.dtDisabled" @click="deleteRole(multipleSelection,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
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
<!--                <el-table-column prop="id" label="ID" min-width="60"></el-table-column>-->
                <el-table-column prop="name" label="角色名称" min-width="80"></el-table-column>
                <el-table-column prop="desc" label="权限说明" min-width="60"></el-table-column>
                <el-table-column prop="id" label="操作" width="180">
                    <template slot-scope="scope">
                        <a v-if="jurisdictionList.upDisabled" class="operation-table" @click="openUpdateRole(1,scope.row)">编辑</a>
                        <a v-if="jurisdictionList.dtDisabled" class="operation-table" @click="deleteRole(scope.row,1)">删除</a>
                        <a v-if="jurisdictionList.upDisabled" class="operation-table" @click="openTree(scope.row)">授权</a>
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

        <el-dialog :title="titleName" width="500" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="角色名称" prop="name" label-width="100px">
                    <el-input class="w320" v-model="form.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" prop="desc" label-width="100px">
                    <el-input type="textarea" class="w320" v-model="form.desc" placeholder="请输入角色说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm()">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="授权" width="500" :visible.sync="dialogAuthorization">
            <el-tree
                    :data="authorizationList"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-checked-keys = "authorizationData"
                    :props="defaultProps"
                    :render-content="renderContent">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="authorizationForm()">确 定</el-button>
                <el-button @click="dialogAuthorization = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {roleList, roleCreate, roleUpdate, rolePermissions,roleUpdatePermissions,roleBatchDelete} from '../../../api/api';
    export default {
        name: 'roleManagement',
        data() {
            return {
                name: '', // 查询姓名
                tableData: [], // 列表
                authorizationList: [], // 授权数据
                authorizationData: [], // 角色的权限数据
                // 创建角色
                form: {
                    name: '', // 角色名称
                    desc: '' // 角色说明
                },
                // 树形结构
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                // 创建编辑弹框
                dialogFormVisible: false,
                // 授权弹框
                dialogAuthorization: false,
                multipleSelection: '',
                // 必填校验
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入角色说明', trigger: 'blur' }
                    ],
                },
                total: 0, // 条数
                page: 1, // 页码
                titleName: '添加角色', // 弹框title
                roleId: '', // 授权使用角色id
                loading: false,
                jurisdictionList: {
                    adDisabled: false,
                    dtDisabled: false,
                    upDisabled: false,
                }
            };
        },
        created() {
            // 获取列表
            this.getRoleList(1,10);
            // 权限
            if (sessionStorage.getItem('assignedPermissions')) {
                let assignedPermissions = JSON.parse(sessionStorage.getItem('assignedPermissions'));
                for (let i = 0; i < assignedPermissions.length; i++) {
                    if (assignedPermissions[i] === 'admin:role:create') {
                        this.jurisdictionList.adDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:role:delete') {
                        this.jurisdictionList.dtDisabled = true;
                    } else if (assignedPermissions[i] === 'admin:role:update') {
                        this.jurisdictionList.upDisabled = true;
                    }
                }
            }
        },
        methods: {
            /* eslint-disable */
            renderContent(h, { node, data, store }) {
                console.log(node);
                let labelApi = '';
                if (node.childNodes.length === 0) {
                    labelApi = node.key;
                }
                return (
                    <span class="custom-tree-node"><span>{node.label} </span> {labelApi ? <span class="label-api"> {labelApi}</span> : <span></span>}</span>
                );
            },
            /* eslint-disable */
            /**
             * 获取授权列表
             * @param {Object} obj 用户信息
             */
            openTree(obj) {
                this.dialogAuthorization = true;
                // 获取权限列表
                rolePermissions({roleId: obj.id}).then(res => {
                    if (res.data.errno === 0) {
                        // 权限列表
                        this.authorizationList = res.data.data.systemPermissions;
                        // 角色自身权限
                        this.authorizationData = res.data.data.assignedPermissions;
                        this.roleId = obj.id;
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
             * 授权确认
             */
            authorizationForm() {
                let rolePermissionsList = this.$refs.tree.getCheckedKeys(true);
                let para = {
                    roleId: this.roleId,
                    permissions: rolePermissionsList
                };
                roleUpdatePermissions(para).then(res => {
                    if (res.data.errno === 0) {
                        this.$message({
                            showClose: true,
                            message: '授权成功',
                            type: 'success'
                        });
                        this.dialogAuthorization = false;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                })
            },
            /**
             * 删除角色
             * @param {*} obj 角色信息
             * @param {Number} type 1 单个删除  2 批量删除
             */
            deleteRole(obj,type) {
                if (obj) {
                    this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (type === 1) {
                            let para = obj;
                            para.deleted = true;
                            roleUpdate(para).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                    this.getRoleList(this.page, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            roleBatchDelete({ids: obj}).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'success'
                                    });
                                    this.getRoleList(this.page, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            })
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
                        message: '请选择要删除的角色',
                        type: 'error'
                    });
                }
            },
            /**
             * 编辑角色  创建
             * @param {number} type 0 添加 1 编辑
             * @param {Object} obj 编辑角色信息
             */
            openUpdateRole(type,obj) {
                // 打开弹框
                this.dialogFormVisible = true;
                // 判断是否为编辑
                if (type === 1) {
                    this.form = obj;
                    this.titleName = '编辑角色';
                } else {
                    this.form = {
                        name: '',
                        desc: ''
                    };
                    this.titleName = '添加角色';
                }
            },
            // 修改页数
            handleCurrentChange(val) {
                this.page = val;
                this.getRoleList((typeof val === 'number' ? val : 1), 10);
            },
            /**
             * 创建角色
             */
            submitForm() {
                // 必填
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        // 接口
                        if (this.form.id) {
                            // 编辑
                            roleUpdate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    this.getRoleList(this.page, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            // 添加
                            roleCreate(this.form).then(res => {
                                if (res.data.errno === 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.dialogFormVisible = false;
                                    this.getRoleList(this.page, 10);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.errmsg,
                                        type: 'error'
                                    });
                                }
                            });
                        }
                    }
                });
            },
            /**
             * 查询角色列表
             * @param {number} currentPage 当前页
             * @param {number} pageSize 一页多少条
             */
            getRoleList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    order: 'desc',
                    sort: 'add_time',
                    page: currentPage,
                    name: this.name
                };
                this.loading = true;
                roleList(para).then(res => {
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
    .label-api {
        border: 1px solid #28dc29;
        border-radius: 3px;
        padding: 2px 10px;
        margin-left: 20px;
        background: #28dc29;
        background: local;
        color: #28dc29;
    }
    .query-role.query {
        display: flex;
        justify-content: space-between;
        background: transparent;
        position: relative;
        .query-input.icon-position .el-input__inner {
            padding-left: 40px;
        }
    }
</style>