<template>
    <div class="home">
        <div v-if="myChart.length > 0" class="chart clearfix">
            <div v-for="(item,index) in myChart" :key="index" :id="item.id" :ref="item.ref" :style="{width: '520px', height: '352px',float: 'left','margin-right': '20px','margin-bottom': '40px'}"></div>
        </div>
    </div>
</template>

<script>
    import {adminChart} from '../../api/api';
    import echarts from 'echarts';
    export default {
        name: 'home',
        data() {
            return {
                myChart: [
                    {
                        id: 'myChartAge',
                        ref: 'myChartAge'
                    },
                    {
                        id: 'chartMedical',
                        ref: ''
                    },
                    {
                        id: 'chartPieSex',
                        ref: ''
                    },
                    {
                        id: 'myChartEquipment',
                        ref: 'myChartEquipment'
                    },
                    {
                        id: 'chartPieIllness',
                        ref: ''
                    },
                    {
                        id: 'myChartEnterprise',
                        ref: 'myChartEnterprise'
                    }
                ],
                deviceType: [], // 设备状态分布数据
                age: [], // 年龄分布数据
                companyDevice: [], // 企业设备分布数据
                medical: [], // 疾病分布
                companyUser: [], // 查询企业用户分布数据
                sex: [], // 性别分布数据
            };
        },
        created() {
            adminChart().then(res => {
                if (res.data.errno === 0) {
                    this.deviceType = res.data.data.deviceType;
                    this.age = res.data.data.age;
                    this.companyDevice = res.data.data.companyDevice;
                    this.companyUser = res.data.data.companyUser;
                    this.sex = res.data.data.sex;
                    this.medical = res.data.data.medical;
                } else {
                    this.myChart = [];
                    if (res.data.errno !== 501) {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        watch: {
            companyDevice: {
                immediate: true,
                handler() {
                    this.$nextTick(() => {
                        this.chartMedical(); // 疾病状态分布
                        this.chartPieIllness(); // 疾病状态分布
                        this.chartPieSex(); // 性别分布
                        this.myChartAge(); // 年龄分布
                        this.myChartEquipment(); // 企业设备分布
                        this.myChartEnterprise(); // 企业人员分布
                    });
                }
            }
        },
        methods: {
            /**
             * 疾病分布图
             */
            chartMedical() {
                let xData = Object.keys(this.medical);
                if (xData.length > 0) {
                    let yData = [];
                    for (let i in this.medical) {
                        yData.push({
                            value: this.medical[i] * 100,
                            name: i
                        });
                    }
                    this.chartPie = echarts.init(document.getElementById('chartMedical'));
                    this.chartPie.setOption(this.pieChart('疾病状态分布',xData,'疾病状态',yData,['#7CE7AC', '#F4BE5E','#5E81F4','#8E90FF','#8ED5FF','#ffe08e','#A8DD1F','#FF8ED0','#FF808B']));
                }
            },
            /**
             * 设备状态分布
             */
            chartPieIllness() {
                if (this.deviceType && this.deviceType.length > 0) {
                    let xData = [];
                    for (let i = 0; i < this.deviceType.length; i++) {
                        xData.push({value: this.deviceType[i].cont,name: (this.deviceType[i].deviceStatus * 1 === 0 ? '正常' : '断开')});
                    }
                    this.chartPie = echarts.init(document.getElementById('chartPieIllness'));
                    this.chartPie.setOption(this.pieChart('设备状态分布',['正常','断开'],'设备状态',xData,['#8AF1B9', '#F4BE5E']));
                    let _this = this;
                    this.chartPie.on('click', function (res) {
                        let deviceStatus = res.data.name === '正常' ? '0' : '1';
                        _this.$router.push({
                            path: '/equipmentList',
                            query: {
                                deviceStatus: deviceStatus
                            }
                        });
                    });
                }
            },
            /**
             * 性别分布
             */
            chartPieSex() {
                if (this.sex && this.sex.length > 0) {
                    let sexList = [];
                    for (let i = 0; i < this.sex.length; i++) {
                        sexList.push({value: this.sex[i].cont,name: !this.sex[i].user_sex ? '男' : '女'});
                    }
                    this.chartPie = echarts.init(document.getElementById('chartPieSex'));
                    this.chartPie.setOption(this.pieChart('性别分布',['男','女'],'性别',sexList,['#4D75F6', '#FF808B']));
                    let _this = this;
                    this.chartPie.on('click', function (res) {
                        let userSex = res.data.name === '男' ? '0' : '1';
                        _this.$router.push({
                            path: '/userList',
                            query: {
                                userSex: userSex
                            }
                        });
                    });
                }
            },
            /**
             * 企业设备分布
             */
            myChartEquipment() {
                if (this.companyDevice && this.companyDevice.length > 0) {
                    let xName = [];
                    let xData = [];
                    for (let i = 0; i < this.companyDevice.length; i++) {
                        xName.push(this.companyDevice[i].company_name);
                        xData.push(this.companyDevice[i].cont);
                    }
                    let myChart = echarts.init(document.getElementById('myChartEquipment'));
                    // 绘制图表
                    myChart.setOption(this.histogramOption('企业设备分布',xName,'设备数','企业',xData));
                    let _this = this;
                    myChart.on('click', function (res) {
                        let companyId = '';
                        for (let i = 0; i < _this.companyDevice.length; i++) {
                            if (_this.companyDevice[i].company_name === res.name) {
                                companyId = _this.companyDevice[i].company_id;
                            }
                        }
                        _this.$router.push({
                            path: '/equipmentList',
                            query: {
                                companyId: companyId
                            }
                        });
                    });
                }
            },
            /**
             * 企业人员分布
             */
            myChartEnterprise() {
                if (this.companyUser && this.companyUser.length > 0) {
                    let xName = [];
                    let xData = [];
                    for (let i = 0; i < this.companyUser.length; i++) {
                        xName.push(this.companyUser[i].company_name);
                        xData.push(this.companyUser[i].cont);
                    }
                    let myChart = echarts.init(document.getElementById('myChartEnterprise'));
                    // 绘制图表
                    myChart.setOption(this.histogramOption('企业人员分布',xName,'人数','企业',xData));
                    let _this = this;
                    myChart.on('click', function (res) {
                        let companyId = '';
                        for (let i = 0; i < _this.companyUser.length; i++) {
                            if (_this.companyUser[i].company_name === res.name) {
                                companyId = _this.companyUser[i].company_id;
                            }
                        }
                        _this.$router.push({
                            path: '/userList',
                            query: {
                                companyId: companyId
                            }
                        });
                    });
                }
            },
            /**
             * 年龄分布
             */
            myChartAge() {
                if (this.age && this.age.length > 0) {
                    let xName = [];
                    let xData = [];
                    for (let i = 0; i < this.age.length; i++) {
                        if (this.age[i].age_range) {
                            xName.push(this.age[i].age_range + '岁');
                            xData.push(this.age[i].cont);
                        }
                    }
                    let myChart = echarts.init(document.getElementById('myChartAge'));
                    // 绘制图表
                    myChart.setOption(this.histogramOption('年龄分布',xName,'人数','年龄',xData));
                    let _this = this;
                    myChart.on('click', function (res) {
                        let userAgeBegin = '';
                        let userAgeEnd = '';
                        if (res.name.indexOf('100') === -1) {
                            userAgeBegin = res.name.substring(0,res.name.indexOf('-'));
                            userAgeEnd = res.name.substring(res.name.indexOf('-') + 1,res.name.indexOf('-') + 3);
                        } else {
                            userAgeBegin = res.name.substring(0,3);
                        }
                        _this.$router.push({
                            path: '/userList',
                            query: {
                                userAgeBegin: userAgeBegin,
                                userAgeEnd: userAgeEnd
                            }
                        });
                    });
                }
            },
            /**
             * 饼状图
             * @param {String} text 图名称
             * @param {Array} lData 类型
             * @param {String} name 类型名称
             * @param {Array} sData 数据
             * @param {Array} pColor 颜色
             * @returns {{backgroundColor: string, color: string[], legend: {data: *, top: string}, series: [{animationDuration: number, animationEasing: string, data: *, center: string[], name: *, label: {normal: {formatter: string, show: boolean, position: string}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}, title: {text: *}}} 对象
             */
            pieChart(text,lData,name,sData,pColor) {
                return {
                    title: {
                        text: text,
                    },
                    backgroundColor: '#f8fafb',
                    // color: ['#7CE7AC', '#F4BE5E','#5E81F4','#8E90FF','#8ED5FF','#ffe08e','#A8DD1F','#FF8ED0','#FF808B'],
                    color: pColor,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                    },
                    legend: {
                        data: lData,
                        top: 'bottom',
                        icon: 'circle',
                    },
                    series: [
                        {
                            name: name,
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            data: sData,
                            animationEasing: 'cubicInOut',
                            animationDuration: 100,
                            label: { //去除饼图的指示折线label
                                normal: {
                                    show: true,
                                    position: 'inner',
                                    formatter: '{d}%',
                                    fontSize: '10'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                        }
                    ]
                };
            },
            /**
             * 柱状图
             * @param {String} text 图名称
             * @param {Array} xData 类型
             * @param {String} yName y类型名称
             * @param {String} xName x类型名称
             * @param {Array} sData 数据
             * @returns {{backgroundColor: string, yAxis: {axisLine: {lineStyle: {color: string}}, name: *, splitLine: {show: boolean}}, xAxis: {data: *, axisLine: {lineStyle: {color: string}}, name: string, splitLine: {lineStyle: {color: string, width: number, type: string}, show: boolean}}, series: [{barWidth: string, data: *, name: *, itemStyle: {normal: {color: *}}, label: {normal: {color: string, show: boolean, position: string}}, type: string}], title: {text: *}}} 对象
             */
            histogramOption(text,xData,yName,xName,sData) {
                return {
                    title: { text: text },
                    backgroundColor: '#f8fafb',
                    xAxis: {
                        data: xData,
                        name: xName,
                        axisLine: {
                            lineStyle: {
                                color: '#9BB0DB'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: { //X轴网格线型样式
                                color: 'rgba(253,103,96,0.2)',
                                width: 1,
                                type: 'soild'
                            }
                        },
                    },
                    yAxis: {
                        name: yName,
                        axisLine: {
                            lineStyle: {
                                color: '#9BB0DB'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        allowDecimals: false,
                    },
                    series: [
                        {
                            name: yName,//系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
                            type: 'bar',
                            itemStyle: {//
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        1, 1, 1, 0,
                                        [
                                            {offset: 1, color: '#1C5DFF'},
                                            {offset: 0, color: '#ffffff'}
                                        ]
                                    )
                                },
                            },
                            label: {//label要加入normal才可生效,label即为x轴对应Y轴的值
                                normal: {
                                    show: true,
                                    color: '#9BB0DB',//设置渐变时候控制不到颜色，只能通过全局textStyle来控制
                                    position: 'top'
                                }
                            },
                            barWidth: '30%',
                            data: sData
                        }
                    ],
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100,
                        zoomOnMouseWheel: 'ctrl'
                    }, {
                        start: 0,
                        height: 16,//这里可以设置dataZoom的尺寸
                        fillerColor: '#f4f4f4',
                        end: 100
                    }],
                };
            }
        },
    };
</script>

<style>
    .tag-top .el-tag {
        width: 140px;
        height: 36px;
        line-height: 36px;
        border-radius: 2px;
        background: #fff;
        font-size: 14px;
        color: #576F88;
        text-align: center;
        border: 0;
        margin-right: 14px;
        margin-top: 14px;
        cursor: pointer;
    }
    .tag-top .el-tag.active {
        color: #4D7CFE;
    }
    .chart {
        width: 100%;
        background: #fff;
        padding: 16px;
        margin-top: 16px;
        display: inline-block;
    }
</style>