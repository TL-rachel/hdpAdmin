<template>
    <div class="main_top">
        <div class="header-left">
            <img style="height: 48px;" src="../../common/image/logo-big.png" alt="">
            <span style="height: 40px;line-height: 40px;color: #ffffff;font-size: 16px;margin-left: 10px;">智能健康管理系统</span>
        </div>
        <div class="header-right">
            <div class="header-bar-left">
                <i class="icon-picture" :class="headerIcon"></i> {{headerTitle}}
            </div>
            <div class="header-bar-right">
                <ul class="header-bar-right-menu">
                    <li>
                        <el-menu class="el-menu-demo" mode="horizontal">
                            <el-submenu index="1">
                                <template slot="title">
                                    {{userData.name}}
                                    <img class="header-img" :src="userData.avatar?userData.avatar:userImgUrl" alt="">
                                </template>
                                <el-menu-item @click="$router.push({path: '/'})">首页</el-menu-item>
                                <el-menu-item @click="updatePsw()">修改密码</el-menu-item>
                                <el-menu-item @click="logout()">退出登陆</el-menu-item>
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
export default {
    data() {
        return {
            userData: '', // 用户名
            headerTitle: '',
            headerIcon: '',
            /* eslint-disable */
            userImgUrl: require("../../common/image/user.png"),
            /* eslint-disable */
        };
    },
    created() {
        if (sessionStorage.getItem('userData')) {
            this.userData = JSON.parse(sessionStorage.getItem('userData'));
            // 设置标签
            this.setTags(this.$route);
        }
    },
    methods: {
        /**
         * 设置标签
         * @param {string} route 当前路由
         */
        setTags(route) {
            this.headerTitle = route.meta.title;
            this.headerIcon = route.meta.icon;
        },
        /**
         * 修改密码
         */
        updatePsw() {
            this.$router.push('/changePassword');
        },
        /**
         * 退出登陆 返回登陆页
         */
        logout() {
            sessionStorage.removeItem('userData');
            sessionStorage.removeItem('token');
            this.$router.push('/login');
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
    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
        background-color: rgba(242, 247, 250, 1);
        color: rgba(77, 124, 254, 100);
    }
    .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
        color: rgba(83, 89, 114, 100);
    }
    .el-menu--horizontal {
        left: unset!important;
        right: 30px!important;
    }
    .header-left {
        background: #313C56;
    }
</style>
