<template>
    <div class="equipmentList">
        <div class="user-data clearfix">
            <div class="user-property user-img">
                <img style="width: 42px;height: 42px;border-radius: 20px" v-if="userData.img" :src="userData.img" alt="">
            </div>
            <div class="user-property">
                <div class="user-name">{{userData.name}}</div>
                <div class="user-custom">{{userData.age}} &nbsp; {{userData.sex}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">联系电话</div>
                <div>{{userData.phoneNumber}}</div>
            </div>
            <div class="user-property">
                <div class="user-custom">身高</div>
                <div>{{userData.stature}} cm</div>
            </div>
            <div class="user-property">
                <div class="user-custom">体重</div>
                <div>{{userData.weight}} kg</div>
            </div>
            <div class="user-property">
                <div class="user-custom">BMI</div>
                <div>{{userData.BMI}}</div>
            </div>
        </div>
        <div class="table-list">
            <router-link :to="{ path:'/addCase'}">
                <el-button>添加</el-button>
            </router-link>
            <el-button>批量导入</el-button>
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="examinationTime" label="体检时间"> </el-table-column>
                <el-table-column prop="heartRate" label="心率"></el-table-column>
                <el-table-column prop="bloodPressure" label="血压"></el-table-column>
                <el-table-column prop="bloodOxygen" label="血氧"></el-table-column>
                <el-table-column prop="difference" label="异常症状描述"></el-table-column>
                <el-table-column prop="diagnosis" label="医生诊断"></el-table-column>
                <el-table-column prop="case" label="病例报告">
                    <template slot-scope="scope">
                        <a :href="scope.row.case" target="_blank">{{scope.row.caseName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="examinationReport" label="体检报告">
                    <template slot-scope="scope">
                        <a :href="scope.row.examinationReport" target="_blank">{{scope.row.examinationReportName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="ECGData" label="心电数据">
                    <template slot-scope="scope">
                        <a :href="scope.row.ECGData" target="_blank">{{scope.row.ECGDataName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="ECGPicture" label="心电图">
                    <template slot-scope="scope">
                        <a :href="scope.row.ECGPicture" target="_blank">{{scope.row.ECGPictureName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="measurementTime" label="测量时间"></el-table-column>
                <el-table-column prop="equipmentNo" label="设备编号"></el-table-column>
                <el-table-column prop="operation" label="操作人"></el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{ path:'/caseListUpdate'}">
                            <a>{{scope.row.id}}修改</a>
                        </router-link>
                        <router-link :to="{ path:'/medicalHistory'}">
                            <a>删除</a>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'emotionList',
        data() {
            return {
                tableData: [
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    },
                    {
                        id: '1',
                        examinationTime: '2020-11-11',
                        heartRate: '105',
                        bloodPressure: '100/96',
                        bloodOxygen: '0',
                        difference: '身体正常',
                        diagnosis: '',
                        case: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        caseName: '病例一',
                        examinationReport: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        examinationReportName: '体检报告一',
                        ECGData: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGDataName: '心电数据一',
                        ECGPicture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                        ECGPictureName: '心电图',
                        measurementTime: '2020-11-15',
                        equipmentNo: 'DK9372782',
                        operation: '张三'
                    }
                ],
                userData: {
                    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608201676388&di=4e25e8a710762b98ff7d3a9b9f2a7807&imgtype=0&src=http%3A%2F%2Ffa1.cnlinfo.net%2Fup%2Fproduct1%2F17031114174615223356.jpg',
                    name: '刘亚芳',
                    age: '56',
                    sex: '女',
                    phoneNumber: '15999999999',
                    stature: '158',
                    weight: '57',
                    BMI: '21',
                }
            };
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    };
</script>

<style lang="less">
    .table-list {
        background: #fff;
        padding: 10px;
        .el-button {
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: rgba(242, 247, 250, 1);
            padding: 0 15px;
            color: #4D7CFE;
            border: 0;
            margin-right: 20px;
            margin-bottom: 14px;
            box-shadow: 0px 2px 4px 0px rgba(196, 206, 220, 0.5);
        }
    }
    .user-data {
        height: 77px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(185, 187, 190, 0.5);
        padding: 15px;
        .user-property {
            float: left;
            width: 200px;
            .user-name {
                color: rgba(77, 124, 254, 100);
                font-size: 16px;
            }
            .user-custom {
                color: rgba(119, 140, 162, 100);
                font-size: 14px;
            }
        }
        .user-img {
            width: 80px;
        }
    }
</style>