<template>
    <div class="home">
        <div class="chart clearfix">
            <div v-for="(item,index) in myChart" :key="index" :id="item.id" :ref="item.ref" :style="{width: '555px', height: '352px',float: 'left','margin-right': '20px','margin-bottom': '40px'}"></div>
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
                        id: 'chartPieIllness',
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
                        id: 'myChartEnterprise',
                        ref: 'myChartEnterprise'
                    }
                ],
                deviceType: [], // 设备状态分布数据
                age: [], // 年龄分布数据
                companyDevice: [], // 企业设备分布数据
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
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.errmsg,
                        type: 'error'
                    });
                }
            })
        },
        watch: {
            companyDevice: {
                immediate: true,
                handler() {
                    this.$nextTick(() => {
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
             * 设备状态分布
             */
            chartPieIllness() {
                let xData = [];
                for (let i = 0; i < this.deviceType.length; i++) {
                    xData.push({value: this.deviceType[i].proportion * 100,name: !this.deviceType[i].del_flag === 1 ? '无效' : '有效'});
                }
                this.chartPie = echarts.init(document.getElementById('chartPieIllness'));
                this.chartPie.setOption(this.pieChart('设备状态分布',['有效','无效'],'设备状态',xData));
            },
            /**
             * 性别分布
             */
            chartPieSex() {
                let sexList = [];
                for (let i = 0; i < this.sex.length; i++) {
                    sexList.push({value: this.sex[i].proportion * 100,name: !this.sex[i].user_sex ? '男' : '女'});
                }
                this.chartPie = echarts.init(document.getElementById('chartPieSex'));
                this.chartPie.setOption(this.pieChart('性别分布',['男','女'],'性别',sexList));
            },
            /**
             * 企业设备分布
             */
            myChartEquipment() {
                let xName = [];
                let xData = [];
                for (let i = 0; i < this.companyDevice.length; i++) {
                    xName.push(this.companyDevice[i].company_name);
                    xData.push(this.companyDevice[i].cont);
                }
                let myChart = echarts.init(document.getElementById('myChartEquipment'));
                // 绘制图表
                myChart.setOption(this.histogramOption('企业设备分布',xName,'设备数','企业',xData));
            },
            /**
             * 企业人员分布
             */
            myChartEnterprise() {
                let xName = [];
                let xData = [];
                for (let i = 0; i < this.companyUser.length; i++) {
                    xName.push(this.companyUser[i].company_name);
                    xData.push(this.companyUser[i].cont);
                }
                let myChart = echarts.init(document.getElementById('myChartEnterprise'));
                // 绘制图表
                myChart.setOption(this.histogramOption('企业人员分布',xName,'人数','企业',xData));
            },
            /**
             * 年龄分布
             */
            myChartAge() {
                let xName = [];
                let xData = [];
                for (let i = 0; i < this.age.length; i++) {
                    xName.push(this.age[i].age_range + '岁');
                    xData.push(this.age[i].cont);
                }
                let myChart = echarts.init(document.getElementById('myChartAge'));
                // 绘制图表
                myChart.setOption(this.histogramOption('年龄分布',xName,'人数','年龄',xData));
            },
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
             * 饼状图
             * @param {String} text 图名称
             * @param {Array} lData 类型
             * @param {String} name 类型名称
             * @param {Array} sData 数据
             * @returns {{backgroundColor: string, color: string[], legend: {data: *, top: string}, series: [{animationDuration: number, animationEasing: string, data: *, center: string[], name: *, label: {normal: {formatter: string, show: boolean, position: string}}, labelLine: {normal: {show: boolean}}, type: string, radius: [string, string]}], tooltip: {formatter: string, trigger: string}, title: {text: *}}} 对象
             */
            pieChart(text,lData,name,sData) {
                return {
                    title: {
                        text: text,
                    },
                    backgroundColor: '#f8fafb',
                    // color: ['#37a2da', '#32c5e9','#67e0e3','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e062ae','#e690d1','#e7bcf3','#9d96f5','#8378ea','#96bfff'],
                    color: ['#96bfff', '#8378ea','#9d96f5','#e7bcf3','#e690d1','#e062ae','#fb7293','#ff9f7f','#ffdb5c','#9fe6b8','#67e0e3','#32c5e9','#37a2da'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                    },
                    legend: {
                        data: lData,
                        top: 'bottom',
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
                                    formatter: '{d}%'
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
                                            {offset: 1, color: '#3562F5'},
                                            {offset: 0, color: '#d5deff'}
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
                            barWidth: '40%',
                            data: sData
                        }
                    ]
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