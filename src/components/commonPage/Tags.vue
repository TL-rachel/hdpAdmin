<template>
    <div class="tags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :key="index">
                <span>{{item.title?item.title:'首页'}}</span><span v-if="index!==tagsList.length-1">></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // tags 数组
                tagsList: []
            };
        },
        methods: {
            /**
             * 设置标签
             * @param {string} route 当前路由
             */
            setTags(route) {
                // 是否是一级页面
                if ( route.meta.flag === 1 || this.tagsList.length === route.meta.flag ) {
                    this.tagsList = [];
                }
                // 加入新的标签
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                });
            },
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
        created() {
            // 设置标签
            this.setTags(this.$route);
        }
    };
</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-left: 30px;
    }

    .tags-li {
        float: left;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }
</style>
