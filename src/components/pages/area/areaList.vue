<template>
    <div class="equipmentList">
        <div class="query">
            <div>
                <el-input class="query-input" type="text" placeholder="搜索区域" v-model="areaName"></el-input>
            </div>
            <div class="query-btn">
                <router-link :to="{ path:'/addArea'}">
                    <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
                </router-link>
                <el-button @click="regionDelete(checkId,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
            </div>
        </div>
        <template v-for="(item,index) in areaList">
            <div class="equipmentType clearfix" :key="index">
                <h4>{{item.title}}</h4>
                <template v-for="(t,i) in item.child">
                    <div class="equipmentDetail" :key="i">
                        <el-checkbox-group class="module-checkbox" v-model="checkId">
                            <el-checkbox :label="t.id"></el-checkbox>
                        </el-checkbox-group>
                        <div class="equipmentTitle">
                            <div class="equipment-name" style="font-size: 16px;">设备名称{{t.name}}</div>
                        </div>
                        <div class="equipmentTitle areaTitle">
                            <div>设备总数 <span class="sum">{{t.sum}}</span></div>
                            <div>异常设备数 <span class="anomaly">{{t.anomaly}}</span></div>
                        </div>
                        <span class="wire"></span>
                        <div class="rests">归属企业：{{t.enterprise}}</div>
                        <div class="rests">负责人：{{t.principal}}</div>
                        <div class="rests">设备区域：{{t.area}}</div>
                        <div class="rests">添加时间：{{t.bigTime}}</div>
                        <div class="rests">更新时间：{{t.renewalTime}}</div>
                        <span class="wire"></span>
                        <div class="button-btn">
                            <router-link :to="{ path:'/addArea'}">
                                <el-button>查看</el-button>
                            </router-link>
                            <router-link :to="{ path:'/addArea'}">
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
    import {regionBatchDelete, regionDelete, regionList} from "../../../api/api";

    export default {
        name: 'areaList',
        data() {
            return {
                areaName: '',
                areaList: [
                    {
                        title: '住院部一楼',
                        child: [
                            {
                                id: '0',
                                name: '住院部一楼大厅',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '1',
                                name: '住院部一楼药房',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '0',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '3',
                                name: '住院部一楼急诊',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部一楼实验室',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            }
                        ]
                    },
                    {
                        title: '住院部二楼',
                        child: [
                            {
                                id: '0',
                                name: '住院部骨科病房',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '1',
                                name: 'X激光区',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '0',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '3',
                                name: '核磁共振区',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼挂号缴费处',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼大厅',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼门诊',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            }
                        ]
                    },
                    {
                        title: '住院部一楼',
                        child: [
                            {
                                id: '0',
                                name: '住院部骨科病房',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '1',
                                name: 'X激光区',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '0',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '3',
                                name: '核磁共振区',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼挂号缴费处',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼大厅',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            },
                            {
                                id: '0',
                                name: '住院部二楼门诊',
                                enterprise: '江苏省某某医药设备公司',
                                principal: '张三三',
                                area: '大厅',
                                bigTime: '2020-09-01 13:00:00',
                                renewalTime: '2020-12-05 11:30:22',
                                status: '1',
                                sum: '15',
                                anomaly: '3'
                            }
                        ]
                    }
                ],
                checkId: [],
            };
        },
        created() {
            this.getRegionList(1,10);
        },
        methods: {
            /**
             * 删除操作
             * @param {Number} id 删除区域id
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
                                this.getRegionList(1, 10);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        regionBatchDelete({ids: id}).then(res => {
                            if (res.data.errno === 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'success'
                                });
                                this.getRegionList(1, 10);
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
             * @param {Number} currentPage 第几页
             * @param {Number} pageSize 多少条
             */
            getRegionList(currentPage, pageSize) {
                let para = {
                    limit: pageSize,
                    page: currentPage
                };
                regionList(para).then(res => {
                    if (res.data.errno === 0) {
                        this.equipmentList = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                })
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
</style>