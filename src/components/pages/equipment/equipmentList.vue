<template>
    <div class="equipmentList">
        <div class="query">
            <div><el-input class="query-input" type="text" placeholder="搜索设备" v-model="equipmentName"></el-input></div>
           <div class="query-btn">
               <router-link :to="{ path:'/addEquipment'}">
                   <el-button><i class="icon-picture icon-picture-add"></i> 添加</el-button>
               </router-link>
               <el-button @click="getRegionList()"><i class="icon-picture icon-picture-detection"></i>批量检测</el-button>
               <el-button @click="regionDelete(checkId,2)"><i class="icon-picture icon-picture-delete"></i>批量删除</el-button>
           </div>
        </div>
        <div class="tag-top" style="margin-top: 20px;">
            <el-tag v-for="(item,index) in tags" :key="index" :class="item.class" @click="cutTag(item.id)">{{item.name}}</el-tag>
        </div>
        <template v-for="(item,index) in equipmentList">
            <div class="equipmentType clearfix" v-if="item.devices.length" :key="index">
                <h4>{{item.regionName}}</h4>
                <template v-for="(t,i) in item.devices">
                    <div class="equipmentDetail" :key="i">
                        <div class="equipmentTitle">
                            <el-checkbox-group class="module-checkbox" v-model="checkId">
                                <el-checkbox :label="t.id"></el-checkbox>
                            </el-checkbox-group>
                            <div class="equipment-name">设备名称{{t.deviceName}}</div>
                            <div class="equipment-status">
                                <span class="point-1" v-if="t.deviceStatus == '0'"><span></span>正常</span>
                                <span class="point-0" v-if="t.deviceStatus == '1'"><span></span>断开</span>
                            </div>
                        </div>
                        <span class="encoding">编码{{t.deviceCode}}</span>
                        <span class="wire"></span>
                        <div class="rests">归属企业：{{t.companyName}}</div>
                        <div class="rests">负责人：{{t.deviceLead}}</div>
                        <div class="rests">设备区域：{{t.regionName}}</div>
                        <div class="rests">添加时间：{{t.createdTime}}</div>
                        <div class="rests">更新时间：{{t.updatedTime}}</div>
                        <span class="wire"></span>
                        <div class="button-btn">
                            <router-link :to="{ path:'/addEquipment',query: {id:t.id,type:1}}">
                                <el-button>查看</el-button>
                            </router-link>
                            <router-link :to="{ path:'/addEquipment',query: {id:t.id}}">
                                <el-button>编辑</el-button>
                            </router-link>
                            <el-button>直播</el-button>
                            <el-button>录播</el-button>
                            <el-button @click="regionDelete(t.id,1)">删除</el-button>
                        </div>
                    </div>
                </template>

            </div>
        </template>
    </div>
</template>

<script>
    import {deviceList, deviceBatchDelete, deviceDelete} from '../../../api/api';
    export default {
        name: 'equipmentList',
        data() {
            return {
                equipmentName: '', // 查询的设备名称
                tags: [
                    {
                        id: '0',
                        name: '基础设施设备',
                        class: 'active'
                    },
                    {
                        id: '1',
                        name: '病房护理设备',
                        class: ''
                    },
                    {
                        id: '2',
                        name: '治疗设备',
                        class: ''
                    },
                    {
                        id: '3',
                        name: '激光设备',
                        class: ''
                    },
                    {
                        id: '4',
                        name: '急救设备',
                        class: ''
                    },
                    {
                        id: '5',
                        name: '诊断设备',
                        class: ''
                    },
                    {
                        id: '6',
                        name: '实验设备',
                        class: ''
                    },
                    {
                        id: '7',
                        name: '其他设备',
                        class: ''
                    }
                ],
                equipmentList: [], // 设备列表
                checkId: [], // 用于批量删除的设备id
            };
        },
        created() {
            this.getRegionList();
        },
        methods: {
            /**
             * 切换标签
             * @param {String} id 标签id
             */
            cutTag(id) {
                for (let i = 0; i < this.tags.length; i++) {
                    this.tags[i].class = '';
                    if (id === this.tags[i].id) {
                        this.tags[i].class = 'active';
                    }
                }
            },
            /**
             * 删除操作
             * @param {*} id 删除区域id
             * @param {Number} type 删除标记 1 单个  2  批量
             */
            regionDelete(id,type) {
                this.$confirm('此操作将永久删除设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (type === 1) {
                        deviceDelete({id: id}).then(res => {
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
                        deviceBatchDelete({ids: ids}).then(res => {
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
                deviceList().then(res => {
                    if (res.data.errno === 0) {
                        this.equipmentList = res.data.data;
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
    .clearfix:after {
        content: "";
        display: block;
        visibility: hidden;
        height: 0;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }
    .query {
        display: flex;
        justify-content: space-between;
        .query-input {
            width: 772px;
            height: 36px;
            line-height: 36px;
            .el-input__inner {
                border-radius: 20px!important;
            }
        }
        .query-btn .el-button {
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: rgba(242, 247, 250, 1);
            padding: 0 15px;
            color: #4D7CFE;
            border: 0;
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .equipmentType {
        background: #fff;
        margin-top: 16px;
        padding: 16px;
        h4 {
            height: 22px;
            line-height: 22px;
            color: rgba(15, 15, 16, 100);
            font-size: 16px;
            font-family: PingFangSC-Regular;
        }
        .equipmentDetail {
            width: 268px;
            height: 268px;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.11);
            margin-top: 16px;
            padding: 14px 7px;
            float: left;
            margin-right: 16px;
            position: relative;
            .module-checkbox {
                position: absolute;
                top: 0;
                left: 0;
            }
            .equipmentTitle {
                display: flex;
                justify-content: space-between;
                color: #0F0F10;
                margin-left: 10px;
                .equipment-status {
                    font-size: 12px;
                    .point-1 {
                        color: #0DD90E;
                        span {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            background: #0DD90E;
                            margin-right: 4px;
                        }
                    }
                    .point-0 {
                        color: #D90D0D;
                        span {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            background: #D90D0D;
                            margin-right: 4px;
                        }
                    }
                }
            }
            .encoding {
                height: 20px;
                color: rgba(119, 140, 162, 100);
                font-size: 14px;
                font-family: PingFangSC-Regular;
                margin-left: 10px;
            }
            .wire {
                width: 234px;
                height: 1px;
                display: inline-block;
                background: #E8EEFC;
                margin-left: 10px;
            }
            .rests {
                color: #778CA2;
                font-size: 12px;
                height: 28px;
                line-height: 28px;
                margin-left: 10px;
            }
            .button-btn .el-button {
                width: 46px;
                height: 18px;
                border-radius: 3px;
                background-color: rgba(242, 247, 250, 1);
                color: #4D7CFE;
                padding: 0;
                border: 0;
                font-size: 12px;
                margin: 5px 0 0 0;
            }
        }
    }
</style>