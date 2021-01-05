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
                            <i class="iconfont" :class="item.icon"></i>
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
                            ><i class="iconfont menudian">&#xe63c;</i>{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="iconfont" :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 是否水平折叠收起菜单
            collapse: false,
            // 菜单
            items: [
                {
                    icon: 'icon-icon_svg_houtai-10',
                    index: 'home',
                    title: '首页'
                },
                {
                    icon: 'icon-icon_svg_houtai-9',
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
                    icon: 'icon-icon_svg_houtai-9',
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
                    icon: 'icon-icon_svg_houtai-10',
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
                    icon: 'icon-icon_svg_houtai-10',
                    index: 'enterprise',
                    title: '企业管理',
                    subs: [
                        {
                            index: 'companyList',
                            title: '企业列表'
                        },
                        {
                            index: 'addCompany',
                            title: '添加企业'
                        }
                    ]
                }
            ],
            // 上一级路由
            oldValue: '',
            sysUserName: ''
        };
    },
    created() {
        let username = sessionStorage.getItem('user');
        if (username) {
            this.sysUserName = username;
        } else {
            this.sysUserName = '';
        }
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
