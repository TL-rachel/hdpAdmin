<template>
    <div class='live-video'>
        <div class="query">
            <el-form :inline="true" ref="recordForm" :model="recordForm" :rules="recordRules" class="demo-form-inline query-btn">
                <span class="choice-camera">选择摄像头</span>
                <el-form-item label="" prop="companyId">
                    <el-select v-model="recordForm.companyId" placeholder="请选择企业" @change="getAllRegions()">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="regionId">
                    <el-select v-model="recordForm.regionId" placeholder="请选择区域" @change="getAllDevice()">
                        <el-option v-for="(item,index) in regionList" :key="index" :label="item.regionName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="deviceId">
                    <el-select v-model="recordForm.deviceId" placeholder="请选择设备">
                        <el-option v-for="(item,index) in deviceList" :key="index" :label="item.deviceName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div style="display:inline-block;">
	                <span class="choice-camera">选择时间</span>
	                <el-form-item label="" prop="begin" >
	                    <el-date-picker
	                            v-model="recordForm.begin"
	                            type="datetime"
	                            value-format="yyyy-MM-dd HH:mm:ss"
	                            placeholder="选择开始日期时间">
	                    </el-date-picker>
	                </el-form-item>
	                -
	                <el-form-item label="" prop="end">
	                    <el-date-picker
	                            v-model="recordForm.end"
	                            type="datetime"
	                            format="yyyy-MM-dd HH:mm:ss"
	                            value-format="yyyy-MM-dd HH:mm:ss"
	                            placeholder="选择结束日期时间">
	                    </el-date-picker>
	                </el-form-item>
                </div>
                <el-form-item>
                    <el-button style="margin-left: 20px" type="primary" @click="getLiveStreaming()"><i class="icon-picture icon-picture-query"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="video-play">
            <div id="video-container"></div>
        </div>
    </div>
</template>

<script>
    import EZUIKit from 'ezuikit-js';
    import {companyAllList, allRegions, allDevice, queryBackVideos} from '../../../api/api';

    export default {
        name: 'recordedBroadcast',
        data() {
            return {
                recordForm: {
                    companyId: '', // 企业
                    regionId: '', // 区域
                    deviceId: '', // 设备
                    begin: '',
                    end: '',
                    beginTime: '',//传后台时间格式
                    endTime: '',//传后台时间格式
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
                    begin: [
                        {required: true, message: '请选择设备', trigger: 'blur'},
                    ],
                    end: [
                        {required: true, message: '请选择设备', trigger: 'blur'},
                    ],
                },
                companyList: {}, // 企业列表
                regionList: {}, // 区域列表
                deviceList: {}, // 设备列表
                videosList: {}, // 设备用户信息
                videoUrl: '', // 视频播放地址
                // 起期范围选择
                /* pickerDateBefore: {
                     disabledDate: time => {
                         if (this.recordForm.end) {
                             return (
                                 time.getTime() > new Date(this.recordForm.end).getTime()
                             );
                         } else {
                             return (
                                 time.getTime() > new Date().getTime() - 8.64e7
                             );
                         }
                     },
                 },
                 // 止期范围选择
                 pickerDateAfter: {
                     disabledDate: time => {
                         return (
                             time.getTime() > new Date().getTime() - 8.64e7 ||
                             time.getTime() < new Date(this.recordForm.begin).getTime() - 8.64e7);
                     },
                 },*/
            };
        },
        created() {
            // 初始化获取企业
            this.getCompanyList();
        },
        mounted() {
            this.setTime();
            this.initGetDevice();
        },
        methods: {
            setTime() {
                let endNowTime = new Date();
                let endTimeY = endNowTime.getFullYear();
               /* let endTimeM = endNowTime.getMonth() + 1;
                let endTimeD = endNowTime.getDate();
                let endTimeH = endNowTime.getHours();
                let beginTimeH = endNowTime.getHours() - 2;
                let endTimem = endNowTime.getMinutes();
                let endTimeS = endNowTime.getSeconds();*/

                let endTimeM = (endNowTime.getMonth() + 1) < 10 ? '0' + (endNowTime.getMonth() + 1) : (endNowTime.getMonth() + 1);
                let endTimeD = endNowTime.getDate() < 10 ? '0' + endNowTime.getDate() : endNowTime.getDate();
                let endTimeH = endNowTime.getHours() < 10 ? '0' + endNowTime.getHours() : endNowTime.getHours();
                let beginTimeH = endNowTime.getHours() - 2 < 10 ? '0' + (endNowTime.getHours() - 2) : (endNowTime.getHours() - 2);
                let endTimem = endNowTime.getMinutes() < 10 ? '0' + endNowTime.getMinutes() : endNowTime.getMinutes();
                let endTimeS = endNowTime.getSeconds() < 10 ? '0' + endNowTime.getSeconds() : endNowTime.getSeconds();
                // let endTimeS = endNowTime.getSeconds();

                this.recordForm.end = endTimeY + '-' + endTimeM + '-' + endTimeD + ' ' + endTimeH + ':' + endTimem + ':' + endTimeS;
                this.recordForm.begin = endTimeY + '-' + endTimeM + '-' + endTimeD + ' ' + beginTimeH + ':' + endTimem + ':' + endTimeS;
            },
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
                // this.recordForm.regionId = '';
                // this.recordForm.deviceId = '';
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
                        let para = {
                            deviceId: this.recordForm.deviceId,
                            beginTime: this.recordForm.begin.replace(/:/g, '').replace(/-/g,'').replace(/\s+/g, ''),
                            endTime: this.recordForm.end.replace(/:/g, '').replace(/-/g,'').replace(/\s+/g, ''),
                        };
                        // para.beginTime = '20210115100000';
                        // para.endTime = '20210115120000';
                        /* eslint-disable */
                        queryBackVideos(para).then(res => {
                            if (res.data.errno === 0) {
                                let player = new EZUIKit.EZUIKitPlayer({
                                    autoplay: true,
                                    id: 'video-container',
                                    accessToken: res.data.data.token,
                                    // url: 'ezopen://open.ys7.com/E99840550/1.live',
                                    url: res.data.data.backPath,
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
                                // this.videosList = res.data.data;
                                // this.videoUrl = res.data.data[0].devicePath;
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
                        this.recordForm.deviceId = obj.id;
                       /* this.recordForm.beginTime = this.recordForm.begin.replace(/:/g, '').replace(/\s+/g, '');
                        this.recordForm.endTime = this.recordForm.end.replace(/:/g, '').replace(/\s+/g, '');*/
                        // 获取视频链接
                        this.getLiveStreaming();
                        /*queryBackVideos(this.recordForm).then(res => {
                            if (res.data.errno === 0) {
                                // this.videosList = res.data.data;
                                // this.videoUrl = res.data.data[0].devicePath;
                                let player = new EZUIKit.EZUIKitPlayer({
                                    autoplay: true,
                                    id: 'video-container',
                                    // accessToken: 'at.0ausyc9n4kwj6fkt2o1dtxe509rqwa7v-4jml95kdof-1yd6qo4-bassrnzjb',
                                    // url: 'ezopen://open.ys7.com/E99840550/1.live',
                                    url: 'ezopen://open.ys7.com/E99840550/1.local.rec?begin=20210115100000&end=20210115120000',
                                    template: 'standard', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                                    // 视频上方头部控件
                                    // header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                                    // plugin: ['talk'],                       // 加载插件，talk-对讲
                                    // 视频下方底部控件
                                    // footer: [/!*"talk", "broadcast",*!/ "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
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
                                console.log(player);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error',
                                });
                            }
                        });*/
                    }
                } else { //直接进去录频页面
                    // this.getAllDevice(1);
                }
            },
        },
    };
</script>

<style lang="less">
    .live-video {
        .query {
            background: #fff;
            padding: 20px 20px 0 20px;

            .choice-camera {
                height: 35px;
                line-height: 35px;
                color: #0F0F10;
                margin-right: 20px;
            }
        }

        .video-play {
            height: 630px;
            width: 100%;
            background: #fff;
            margin-top: 20px;
            padding: 20px;
            position: relative;
            text-align: center;

            .play-pause-img {
                width: 97%;
                height: 100%;
                background: #000;
                opacity: .3;
                position: absolute;
                top: 0;
                z-index: 10;

                .pause-img {
                    background-image: url("../../../common/image/pause.png");
                    background-size: cover;
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -40px;
                    margin-left: -40px;
                    cursor: pointer;
                }

                .play-img {
                    background-image: url("../../../common/image/play.png");
                    background-size: cover;
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -40px;
                    margin-left: -40px;
                    cursor: pointer;
                }
            }
        }

        .device-user {
            width: 580px;
            height: 100px;
            margin: 20px 10px 20px 0;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(188, 189, 190, 0.21);
            float: left;

            ul {
                padding: 20px 0;

                li {
                    float: left;
                    margin-left: 16px;

                    img {
                        width: 64px;
                        height: 64px;
                        border-radius: 50px;
                    }

                    .user-name {
                        color: rgba(77, 124, 254, 100);
                        font-size: 20px;
                        text-align: left;
                        margin-top: 10px;
                    }

                    .user-rests {
                        color: rgba(119, 140, 162, 100);
                        font-size: 14px;
                        text-align: left;
                    }

                    .user-rests1 {
                        color: rgba(66, 77, 88, 100);
                        font-size: 20px;
                        text-align: left;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>