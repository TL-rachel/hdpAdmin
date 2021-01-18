<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#fff"
            text-color="#778CA2"
            active-text-color="#f3f7fa"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i class="icon-picture" :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="icon-picture" :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    // import {rolePermissions} from '../../api/api';
export default {
    data() {
        return {
            // 是否水平折叠收起菜单
            collapse: false,
            // 菜单
            items: [
                {
                    icon: 'icon-picture-nav-home',
                    index: 'home',
                    title: '首页'
                },
                {
                    icon: 'icon-picture-nav-equipment',
                    index: '/equipment',
                    title: '设备管理',
                    subs: [
                        {
                            index: 'equipmentList',
                            title: '设备列表'
                        },
                        {
                            index: 'areaList',
                            title: '区域列表'
                        },
                        {
                            index: 'liveStreaming',
                            title: '视频直播'
                        },
                        {
                            index: 'recordedBroadcast',
                            title: '视频录播'
                        }
                    ]
                },
                {
                    icon: 'icon-picture-nav-people',
                    index: '/user',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'userList',
                            title: '用户列表'
                        },
                        {
                            index: 'healthDataList',
                            title: '健康数据'
                        }
                    ]
                },
                {
                    icon: 'icon-picture-nav-system',
                    index: 'system',
                    title: '系统管理',
                    subs: [
                        {
                            index: 'administratorList',
                            title: '管理员'
                        },
                        {
                            index: 'roleManagement',
                            title: '角色管理'
                        },
                        {
                            index: 'operationLog',
                            title: '操作日志'
                        }
                    ]
                },
                {
                    icon: 'icon-picture-nav-enterprise',
                    index: 'enterprise',
                    title: '企业管理',
                    subs: [
                        {
                            index: 'companyList',
                            title: '企业列表'
                        },
                        {
                            index: 'companyAdministratorList',
                            title: '企业管理员'
                        },
                        {
                            index: 'companyAuditList',
                            title: '企业准入审核'
                        }
                    ]
                }
            ],
            // 上一级路由
            oldValue: '',
            systemPermissions: [],
            assignedPermissions: [],
        };
    },
    methods: {
    },
    created() {
        /*let userData = JSON.parse(sessionStorage.getItem('userData'));
        rolePermissions({roleId: userData.roleIds[0]}).then(res => {
            if (res.data.errno === 0) {
                this.systemPermissions = res.data.data.systemPermissions;
                this.assignedPermissions = res.data.data.assignedPermissions;
                for (let i = 0; i < this.systemPermissions.length; i++) {
                    if (this.systemPermissions[i].children) {
                        for (let j = 0; j < this.systemPermissions[i].children.length; j++) {
                            if (this.systemPermissions[i].children[j].children) {
                                for (let k = 0; k < this.systemPermissions[i].children[j].children.length; k++) {
                                    if (this.systemPermissions[i].children[j].children[k].id) {
                                        for (let l = 0; l < this.assignedPermissions.length; l++) {
                                            if (this.assignedPermissions[l] === this.systemPermissions[i].children[j].children[k].id) {
                                                console.log(this.systemPermissions[i])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                this.$message({
                    showClose: true,
                    message: '获取菜单列表失败',
                    type: 'error'
                });
            }
        });*/
    },
    computed: {
        /**
         * 除去/  获取菜单index
         * @returns {string} 当前激活菜单的 index
         */
        onRoutes() {
            return this.oldValue.replace('/', '');
        }
    },
    watch: {
        /**
         * 获取路由
         * @param {string} newValue  当前路由
         * @param {string} oldValue  上一级路由
         */
        $route(newValue, oldValue) {
            // 是否是二级页面  获取当前激活的菜单的index
            if ( newValue.meta.flag === 2 ) {
                this.oldValue = oldValue.path;
            } else {
                this.oldValue = newValue.path;
            }
        }
    }
};
</script>

<style>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 52px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 210px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu {
    border: 0;
}
    .el-menu-item.is-active,
    .el-submenu.is-active .el-submenu__title {
        border-left: 3px solid #4D7CFE;
        padding-left: 14px!important;
        background-color: #F2F7FA!important;
        color: #4D7CFE!important;
    }
    .el-submenu .el-menu .el-menu-item.is-active {
        border: 0;
        padding-left: 40px!important;
        background-color: transparent!important;
    }
    .menudian {
        font-size: 14px;
        margin-right: 5px;
    }
</style>
