<template>
    <div class='live-video'>
        <div class="query">
            <el-form :inline="true" ref="recordForm" :model="recordForm" :rules="recordRules"
                     class="demo-form-inline query-btn recorded-broadcast">
                <span class="choice-camera">选择摄像头</span>
                <el-form-item label="" prop="companyId">
                    <el-select v-model="recordForm.companyId"
                               placeholder="请选择企业" @change="getAllRegions()">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="regionId">
                    <el-select v-model="recordForm.regionId" placeholder="请选择区域"
                               @change="getAllDevice()">
                        <el-option v-for="(item,index) in regionList" :key="index" :label="item.regionName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="deviceId">
                    <el-select v-model="recordForm.deviceId"
                               placeholder="请选择设备">
                        <el-option v-for="(item,index) in deviceList" :key="index" :label="item.deviceName"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLiveStreaming()"><i
                            class="icon-picture icon-picture-query"></i>查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="video-play">
            <div id="video-container" style="background: #000;"></div>
        </div>
        <div class="clearfix videos-detail">
            <span class="detail-state">今日数据</span>
            <span style="margin: 15px 0;display:inline-block;" v-if="Object.keys(videosList).length === 0">未检测到人脸数据</span>
            <template v-for="(item,index) in videosList">
                <div class="device-user" :key="index">
                    <div class="user-detail">
                        <ul class="clearfix">
                            <li><img :src="item.userImage1?item.userImage1:userImgUrl" alt=""></li>
                            <li>
                                <div class="user-name">{{item.userName?item.userName: '未知用户'}}</div>
                                <div class="user-rests">FaceId：{{item.faceId}}</div>
                            </li>
                            <li style="width: 140px;">
                                <div class="user-rests1">心率 <span class="user-name">{{item.rate}}</span></div>
                                <div class="user-rests" style="width: 250px;">检测时间：{{item.checkTime}}</div>
                            </li>
                            <li>
                                <div class="user-rests1">疲劳度 <span class="user-name">{{item.fatigue == 0?'正常':'疲劳'}}</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </div>
        <div class="clearfix videos-detail">
            <span class="detail-state">历史数据</span>
            <span style="margin: 15px 0;display:inline-block;" v-if="Object.keys(videosOldList).length === 0">未检测到人脸数据</span>
            <template v-for="(item,index) in videosOldList">
                <div class="device-user" :key="index">
                    <div class="user-detail">
                        <ul class="clearfix">
                            <li><img :src="item.userImage1?item.userImage1:userImgUrl" alt=""></li>
                            <li>
                                <div class="user-name">{{item.userName?item.userName: '未知用户'}}</div>
                                <div class="user-rests">FaceId：{{item.faceId}}</div>
                            </li>
                            <li style="width: 140px;">
                                <div class="user-rests1">心率 <span class="user-name">{{item.rate}}</span></div>
                                <div class="user-rests" style="width: 250px;">检测时间：{{item.checkTime}}</div>
                            </li>
                            <li>
                                <div class="user-rests1">疲劳度 <span class="user-name">{{item.fatigue == 0?'正常':'疲劳'}}</span></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import EZUIKit from 'ezuikit-js';
    import {companyAllList, allRegions, allDevice, queryVideos,queryDeviceRateAndFatigue,queryRateAndFatigueOld} from '../../../api/api';

    export default {
        name: 'liveStreaming',
        data() {
            return {
                recordForm: {
                    companyId: '', // 企业
                    regionId: '', // 区域
                    deviceId: '', // 设备
                },
                recordRules: {
                    companyId: [
                        {required: true, message: '请选择企业', trigger: 'change'},
                    ],
                    regionId: [
                        {required: true, message: '请选择区域', trigger: 'change'},
                    ],
                    deviceId: [
                        {required: true, message: '请选择设备', trigger: 'change'},
                    ],
                },
                companyList: {}, // 企业列表
                regionList: {}, // 区域列表
                deviceList: {}, // 设备列表
                videosListFlag: false, // 设备用户信息
                videosList: {}, // 设备用户信息
                videosOldList: {}, // 设备非当日历史最新的九条心率和疲劳度
                videoUrl: '', // 视频播放地址
                setIntervalExample: null, // 定时器
                setTimeout: null, // 定时器
                /* eslint-disable */
                userImgUrl: require("../../../common/image/user.png"),
                /* eslint-disable */
            };
        },
        created() {
            // 初始化获取企业
            this.getCompanyList();
        },
        mounted() {
            this.initGetDevice();
        },
        methods: {
            /**
             * 获取企业
             *
             // * @param {string} type 判断初始或者有值情况 1,初始化。2路由带值过来的
             */
            getCompanyList() {
                // 获取企业
                companyAllList().then(res => {
                    if (res.data.errno === 0) {
                        this.companyList = res.data.data;
                        if (!this.$route.query.obj) {
                            this.recordForm.companyId = this.companyList[0].id;
                            this.getAllRegions(1);
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error',
                        });
                    }
                });
            },
            /**
             * 查询区域
             *
             * @param {number} type 1为初始化 ，2位路由带值 ，其余情况不做处理
             */
            getAllRegions(type) {
                // this.form.regionId = '';
                // this.form.deviceId = '';
                allRegions({companyId: this.recordForm.companyId}).then(res => {
                    if (res.data.errno === 0) {
                        this.regionList = res.data.data;
                        if (type === 1) {
                            if ( this.regionList.length > 0) {
                                this.recordForm.regionId = this.regionList[0].id;
                                this.getAllDevice(1);
                            } else if (type === 1 && this.regionList.length < 1) {
                                this.recordForm.regionId = '';
                                this.recordForm.deviceId = '';
                            }
                        } else if (type === 2) {
                            //do something
                        } else {
                            this.recordForm.regionId = '';
                            this.recordForm.deviceId = '';
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error',
                        });
                    }
                });
            },
            /**
             * 查询设备
             * @param {number} type 1为初始化 ，2位路由带值 ，其余情况不做处理
             */
            getAllDevice(type) {
                // this.recordForm.deviceId = '';
                allDevice({regionId: this.recordForm.regionId}).then(res => {
                    if (res.data.errno === 0) {
                        this.deviceList = res.data.data;
                        if (type === 1) {
                            if ( this.deviceList.length > 0 ) {
                                this.recordForm.deviceId = this.deviceList[0].id;
                            } else {
                                this.recordForm.deviceId = '';
                            }
                        } else if ( type === 2) {
                            // this.recordForm.deviceId = '' ;
                        } else {
                            this.recordForm.deviceId = '';
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error',
                        });
                    }
                });
            },
            /**
             * 查询视频
             */
            getLiveStreaming() {
                this.$refs.recordForm.validate(valid => {
                    if (valid) {
                        document.getElementById('video-container').innerHTML = '';
                        /* eslint-disable */
                        queryVideos(this.recordForm).then(res => {
                            if (res.data.errno === 0) {
                                let player = new EZUIKit.EZUIKitPlayer({
                                    autoplay: true,
                                    id: 'video-container',
                                    accessToken: res.data.data[0].token,
                                    // url: 'ezopen://open.ys7.com/E99840550/1.live',
                                    url: res.data.data[0].devicePath,
                                    template: 'standard', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                                    // 视频上方头部控件
                                    // header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                                    // plugin: ['talk'],                       // 加载插件，talk-对讲
                                    // 视频下方底部控件
                                    // footer: [/*"talk", "broadcast",*/ "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
                                    audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                                    openSoundCallBack: data => console.log('开启声音回调', data),
                                    closeSoundCallBack: data => console.log('关闭声音回调', data),
                                    // startSaveCallBack: data => console.log("开始录像回调", data),
                                    // stopSaveCallBack: data => console.log("录像回调", data),
                                    // capturePictureCallBack: data => console.log("截图成功回调", data),
                                    fullScreenCallBack: data => console.log('全屏回调', data),
                                    getOSDTimeCallBack: data => console.log('获取OSDTime回调', data),
                                    width: 1150,
                                    height: 600,
                                });
                                console.log('player', player);
                                this.videosListFlag = true;
                                // this.videoUrl = res.data.data[0].devicePath;
                                this.setIntervalExample = setInterval(() => {
                                    setTimeout(() => {
                                        if (this.videosListFlag) {
                                            queryDeviceRateAndFatigue({deviceId: this.recordForm.deviceId}).then(res => {
                                                if (res.data.errno === 0) {
                                                    this.videosList = res.data.data;
                                                }
                                            });
                                        }
                                    }, 0);
                                }, 3000);
                                queryRateAndFatigueOld({deviceId: this.recordForm.deviceId}).then(res => {
                                    if (res.data.errno === 0) {
                                        this.videosOldList = res.data.data;
                                    }
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error',
                                });
                            }
                        });
                        /* eslint-disable */
                    }
                });
            },
            /**
             * 初始化带路由情况
             */
            initGetDevice() {
                // 判断是否从区域进入
                if (this.$route.query.obj) {
                    let obj = JSON.parse(this.$route.query.obj);
                    // 获取区域
                    if (obj.companyId) {
                        this.recordForm.companyId = obj.companyId;
                        this.getAllRegions(2);
                    }
                    // 获取设备
                    if (obj.deviceRegionId) {
                        this.recordForm.regionId = obj.deviceRegionId;
                        this.getAllDevice(2);
                    }

                    if(obj.id){
                        this.recordForm.deviceId = obj.id;
                        // 获取视频链接
                        this.getLiveStreaming();
                    }
                } else { //直接进去录频页面
                    let _this = this;
                    this.setTimeout = window.setTimeout(function (){
                        if (_this.recordForm.deviceId) {
                            _this.getLiveStreaming();
                        }
                    },1000);
                }
            },
        },
        // 离开页面销毁实例  释放资源
        destroyed() {
            if (this.setIntervalExample) {
                clearInterval(this.setIntervalExample);
            }
            if (this.setTimeout) {
                window.clearTimeout(this.setTimeout);
            }
        }
    };
</script>

<style lang="less">
</style>