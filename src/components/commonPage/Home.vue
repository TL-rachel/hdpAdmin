<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box">
            <v-tags></v-tags>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {

    }
};
</script>
<style>
    .content-box {
        background: #f2f3f7;
        height: calc(100% - 70px);
        position: absolute;
        width: calc(100% - 185px);
        left: 185px;
        overflow: auto;
    }
    .content-box .content {
        background: #ffffff;
        width: calc(100% - 40px);
        height: calc(100% - 50px);
        margin: 0 20px 20px 20px;
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
