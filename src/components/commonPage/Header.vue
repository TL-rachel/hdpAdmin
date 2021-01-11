<template>
    <div class="main_top">
        <div class="header-left">此处为系统名称</div>
        <div class="header-right">
            <div class="header-bar-left">
                {{headerTitle}}
            </div>
            <div class="header-bar-right">
                <ul class="header-bar-right-menu">
                    <li>
                        <el-menu class="el-menu-demo" mode="horizontal">
                            <el-submenu index="1">
                                <template slot="title">
                                    {{sysUserName}}
                                    <img class="header-img" src="http://hdposs.zerorui.cn/i5nyubzubju70h92hnej.jpg" alt="">
                                </template>
                                <el-menu-item @click="$router.push({path: '/'})">首页</el-menu-item>
                                <el-menu-item>修改密码</el-menu-item>
                                <el-menu-item>退出登陆</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </li>
                </ul>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import {} from '../../api/api';
export default {
    data() {
        return {
            sysUserName: '', // 用户名
            headerTitle: ''
        };
    },
    created() {
        let username = sessionStorage.getItem('user');
        if (username) {
            this.sysUserName = username;
        } else {
            this.sysUserName = '张三';
        }
        // 设置标签
        this.setTags(this.$route);
    },
    methods: {
        /**
         * 设置标签
         * @param {string} route 当前路由
         */
        setTags(route) {
            this.headerTitle = route.meta.title;
        },
        /**
         * 退出登陆 返回登陆页
         */
        logout() {

        }
    },
    watch: {
        /**
         * 获取路由
         * @param {string} newValue 当前路由
         */
        $route( newValue ) {
            this.setTags(newValue);
        }
    },
};
</script>
<style lang="less" rel="stylesheet/less">
    @import "../../common/less/commonheader-other.less";
    .main_top{
        background: #fff;
        position: relative;
        z-index:100;
        height: 52px;
    }
    .header-img {
        width: 38px;
        height: 38px;
        border-radius: 50px;
        margin-left: 10px;
    }
    .el-menu.el-menu--horizontal {
        border: 0;
    }
    .header-bar-right-menu .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 52px;
        border: 0;
    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
        width: 120px;
        min-width: 120px;
    }
</style>
