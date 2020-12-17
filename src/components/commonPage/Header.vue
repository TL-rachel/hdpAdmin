<template>
    <div class="main_top">
        <div class="header-left">此处为系统名称</div>
        <div class="header-right">
            <div class="header-bar-left">
                首页
            </div>
            <div class="header-bar-right">
                <ul class="header-bar-right-menu">
                    <li class="user-icon tubiao">
                        <i class="otherMain_icon user"></i>
                    </li>
                    <li class="otherpeople">
                        <span class="otherpeople-name">{{sysUserName}}</span>
                    </li>
                    <li style="margin-left: 25px;margin-right: 10px;">
                        <span href="#" class="goback" @click="logout">
                            <i class="otherMain_icon exit"></i>
                        </span>
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
            sysUserName: '' // 用户名
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
    methods: {
        /**
         * 退出登陆 返回登陆页
         */
        logout() {

        }
    },
    mounted() {

    }
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
</style>
