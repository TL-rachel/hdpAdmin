<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar
    },
    created() {

    }
};
</script>
<style>
    #app {
        min-width: 1440px!important;
    }
    .content-box {
        background: #f8fafb;
        height: calc(100% - 52px);
        position: absolute;
        width: calc(100% - 210px);
        left: 210px;
        overflow: auto;
    }
    .content-box .content {
        /*background: #ffffff;*/
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        margin: 16px;
        overflow: auto;
        min-width:880px
    }
    ::-webkit-scrollbar {
        width: 6px;
        height:10px;
        background-color: #f2f3f7;
        scrollbar-arrow-color: #d5dce6;
    }

    ::-webkit-scrollbar-track {
        border-radius:10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d5dce6;
    }
    .icon-picture {
        width: 20px;
        height: 20px;
        line-height: 16px;
        display: inline-block;
        background-size: cover;
        vertical-align: text-top;
        cursor: pointer;
    }
    .icon-picture.icon-picture-add {
        background-image: url("../../common/image/page_icons_new.png");
    }
    .icon-picture.icon-picture-to-lead {
        background-image: url("../../common/image/page_icons_import.png");
    }
    .icon-picture.icon-picture-export {
        background-image: url("../../common/image/page_icons_export.png");
    }
    .icon-picture.icon-picture-update {
        background-image: url("../../common/image/page_icons_faceId.png");
    }
    .icon-picture.icon-picture-delete {
        background-image: url("../../common/image/page_icons_delete.png");
    }
    .icon-picture.icon-picture-query {
        background-image: url("../../common/image/query.png");
    }
    .icon-picture.icon-picture-detection {
        background-image: url("../../common/image/page_icons_new_maintain.png");
    }
    .icon-picture.icon-picture-grabble {
        background-image: url("../../common/image/grabble.png");
    }
    .icon-picture.icon-position {
        position: absolute;
        z-index: 10;
        width: 20px;
        height: 20px;
        display: inline-block;
        top: 23px;
        left: 24px;
    }
    .query .query-input.icon-position .el-input__inner {
        padding-left: 30px;
    }

    .icon-picture.icon-picture-nav-home {
        background-image: url("../../common/image/navi_home.png");
    }
    .icon-picture.icon-picture-nav-home-selected {
        background-image: url("../../common/image/navi_home_selected.png");
    }
    .icon-picture.icon-picture-nav-enterprise {
        background-image: url("../../common/image/navi_enterprise.png");
    }
    .icon-picture.icon-picture-nav-enterprise-selected {
        background-image: url("../../common/image/navi_enterprise_selected.png");
    }
    .icon-picture.icon-picture-nav-equipment {
        background-image: url("../../common/image/navi_equipment.png");
    }
    .icon-picture.icon-picture-nav-equipment-selected {
        background-image: url("../../common/image/navi_navi_equipment_selected.png");
    }
    .icon-picture.icon-picture-nav-people {
        background-image: url("../../common/image/navi_people.png");
    }
    .icon-picture.icon-picture-nav-people-selected {
        background-image: url("../../common/image/navi_people_selected.png");
    }
    .icon-picture.icon-picture-nav-system {
        background-image: url("../../common/image/navi_system.png");
    }
    .icon-picture.icon-picture-nav-system-selected {
        background-image: url("../../common/image/navi_system_selected.png");
    }
    .is-active .icon-picture.icon-picture-nav-home {
        background-image: url("../../common/image/navi_home_selected_white.png");
    }
    .is-active .icon-picture.icon-picture-nav-enterprise {
        background-image: url("../../common/image/navi_enterprise_selected_white.png");
    }
    .is-active .icon-picture.icon-picture-nav-equipment {
        background-image: url("../../common/image/navi_navi_equipment_selected_white.png");
    }
    .is-active .icon-picture.icon-picture-nav-people {
        background-image: url("../../common/image/navi_people_selected_white.png");
    }
    .is-active .icon-picture.icon-picture-nav-system {
        background-image: url("../../common/image/navi_system_selected_white.png");
    }
    .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li {
        background-color: #f8fafb;
        border: 0!important;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #4D7CFE;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
    .el-input.el-pagination__editor.is-in-pagination .el-input__inner {
        width: 30px;
        background-color: #f8fafb;
        height: 20px;
    }
</style>
