<template>
    <div class="equipmentList">
        <div class="query">
            <div>
                <i class="icon-picture icon-picture-grabble icon-position"></i><el-input class="query-input icon-position" type="text" placeholder="搜索区域" @blur="getRegionList()" v-model="regionName"></el-input>
            </div>
            <div class="query-btn">
                <router-link :to="{ path:'/addArea'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button @click="regionDelete(checkId,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <template v-for="(item,index) in areaList">
            <div class="equipmentType clearfix" v-if="item.regions.length" :key="index">
                <h4>{{item.regionPosition}}</h4>
                <template v-for="(t,i) in item.regions">
                    <div class="equipmentDetail" :key="i">
                        <el-checkbox-group class="module-checkbox" v-model="checkId">
                            <el-checkbox :label="t.id"></el-checkbox>
                        </el-checkbox-group>
                        <div class="equipmentTitle">
                            <div class="equipment-name" style="font-size: 16px;">{{t.regionName}}</div>
                        </div>
                        <div class="equipmentTitle areaTitle">
                            <div>设备总数 <span class="sum">{{t.totalDeviceNum}}</span></div>
                            <div>异常设备数 <span class="anomaly">{{t.badDeviceNum}}</span></div>
                        </div>
                        <span class="wire"></span>
                        <div class="rests">归属企业：{{t.companyName}}</div>
                        <div class="rests">负责人：{{t.regionLead}}</div>
                        <div class="rests">操作人：{{t.regionOperation}}</div>
                        <div class="rests">添加时间：{{t.createdTime}}</div>
                        <div class="rests">更新时间：{{t.updatedTime}}</div>
                        <span class="wire"></span>
                        <div class="button-btn">
                            <router-link :to="{ path:'/addArea',query: {id:t.id,type:1}}">
                                <el-button>查看</el-button>
                            </router-link>
                            <router-link :to="{ path:'/addArea',query: {id:t.id}}">
                                <el-button>编辑</el-button>
                            </router-link>
                            <el-button @click="regionDelete(t.id,1)">删除</el-button>
                        </div>
                    </div>
                </template>

            </div>
        </template>
    </div>
</template>

<script>
    import {regionBatchDelete, regionDelete, regionList} from '../../../api/api';

    export default {
        name: 'areaList',
        data() {
            return {
                regionName: '',
                areaList: [],
                checkId: [],
            };
        },
        created() {
            this.getRegionList();
        },
        methods: {
            /**
             * 删除操作
             * @param {*} id 删除区域id
             * @param {Number} type 删除标记 1 单个  2  批量
             */
            regionDelete(id,type) {
                this.$confirm('此操作将永久删除区域, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (type === 1) {
                        regionDelete({id: id}).then(res => {
                            if (res.data.errno === 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'success'
                                });
                                this.getRegionList();
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        let ids = '';
                        for (let i = 0; i < id.length; i++) {
                            if (i < id.length - 1) {
                                ids += id[i] + ',';
                            } else {
                                ids += id[i];
                            }
                        }
                        regionBatchDelete({ids: ids}).then(res => {
                            if (res.data.errno === 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'success'
                                });
                                this.getRegionList();
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error'
                                });
                            }
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            /**
             * 查询区域
             */
            getRegionList() {
                regionList({regionName: this.regionName}).then(res => {
                    if (res.data.errno === 0) {
                        this.areaList = res.data.data;
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
    };
</script>

<style lang="less">
    .areaTitle {
        color: #778CA2!important;
        font-size: 14px;
        .sum {
            color: #4D7CFE;
            font-size: 16px;
        }
        .anomaly {
            color: #DB1A1A;
            font-size: 16px;
        }
    }
    .button-btn {
        text-align: right;
    }
    .module-checkbox {
        .el-checkbox__inner {
            width: 20px;
            height: 20px;
        }
        .el-checkbox__inner:after {
            height: 10px;
            left: 7px;
        }
        .el-checkbox__label {
            display: none;
        }
    }
</style>