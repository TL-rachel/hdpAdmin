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
</style>
