<template>
    <div class='live-video'>
        <div class="query">
            <el-form :inline="true" ref="form" :model="form" :rules="rules" class="demo-form-inline query-btn">
                <span class="choice-camera">选择摄像头</span>
                <el-form-item label="" prop="companyId">
                    <el-select :disabled="$route.query.obj?true:false" v-model="form.companyId" placeholder="请选择企业" @change="getAllRegions()">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="regionId">
                    <el-select :disabled="$route.query.obj?true:false" v-model="form.regionId" placeholder="请选择区域" @change="getAllDevice()">
                        <el-option v-for="(item,index) in regionList" :key="index" :label="item.regionName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="deviceId">
                    <el-select :disabled="$route.query.obj?true:false" v-model="form.deviceId" placeholder="请选择设备">
                        <el-option v-for="(item,index) in deviceList" :key="index" :label="item.deviceName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <span class="choice-camera">选择时间</span>
                <el-form-item label="" prop="deviceId">
                    <el-date-picker
                            v-model="form.data1"
                            type="datetime"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                </el-form-item>
                -
                <el-form-item label="" prop="deviceId">
                    <el-date-picker
                            v-model="form.data2"
                            type="datetime"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                </el-form-item>
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
    import EZUIKit from "ezuikit-js";
    import {companyAllList,allRegions,allDevice,queryVideos} from '../../../api/api';
    export default {
        name: 'recordedBroadcast',
        data() {
            return {
                form: {
                    companyId: '', // 企业
                    regionId: '', // 区域
                    deviceId: '', // 设备
                },
                rules: {
                    companyId: [
                        { required: true, message: '请选择企业', trigger: 'change' }
                    ],
                    regionId: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    deviceId: [
                        { required: true, message: '请选择设备', trigger: 'change' }
                    ],
                },
                companyList: {}, // 企业列表
                regionList: {}, // 区域列表
                deviceList: {}, // 设备列表
                videosList: {}, // 设备用户信息
                videoUrl: '', // 视频播放地址
            };
        },
        created() {
            // 获取企业
            companyAllList().then(res => {
                if (res.data.errno === 0) {
                    this.companyList = res.data.data;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.errmsg,
                        type: 'error'
                    });
                }
            });
            // 判断是否从区域进入
            if (this.$route.query.obj) {
                let obj = JSON.parse(this.$route.query.obj);
                // 获取区域
                if (obj.companyId) {
                    this.form.companyId = obj.companyId;
                    this.getAllRegions();
                }
                // 获取设备
                if (obj.deviceRegionId) {
                    this.form.regionId = obj.deviceRegionId;
                    this.getAllDevice();
                    this.form.deviceId = obj.id;
                    // 获取视频链接
                    queryVideos(this.form).then(res => {
                        if (res.data.errno === 0) {
                            this.videosList = res.data.data;
                            this.videoUrl = res.data.data[0].devicePath;
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
        },
        methods: {
            /**
             * 查询视频
             */
            getLiveStreaming() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        queryVideos(this.form).then(res => {
                            if (res.data.errno === 0) {
                                this.videosList = res.data.data;
                                this.videoUrl = res.data.data[0].devicePath;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.errmsg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })
            },
            /**
             * 查询区域
             */
            getAllRegions() {
                this.form.regionId = '';
                this.form.deviceId = '';
                allRegions({companyId: this.form.companyId}).then(res => {
                    if (res.data.errno === 0) {
                        this.regionList = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                });
            },
            /**
             * 查询设备
             */
            getAllDevice() {
                this.form.deviceId = '';
                allDevice({regionId: this.form.regionId}).then(res => {
                    if (res.data.errno === 0) {
                        this.deviceList = res.data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.errmsg,
                            type: 'error'
                        });
                    }
                })
            },
        },
        mounted: () => {
            let player = new EZUIKit.EZUIKitPlayer({
                autoplay: true,
                id: "video-container",
                accessToken: "at.0ausyc9n4kwj6fkt2o1dtxe509rqwa7v-4jml95kdof-1yd6qo4-bassrnzjb",
                url: "ezopen://open.ys7.com/E99840550/1.live",
                template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                // 视频上方头部控件
                // header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                // plugin: ['talk'],                       // 加载插件，talk-对讲
                // 视频下方底部控件
                // footer: [/*"talk", "broadcast",*/ "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
                audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                openSoundCallBack: data => console.log("开启声音回调", data),
                closeSoundCallBack: data => console.log("关闭声音回调", data),
                // startSaveCallBack: data => console.log("开始录像回调", data),
                // stopSaveCallBack: data => console.log("录像回调", data),
                // capturePictureCallBack: data => console.log("截图成功回调", data),
                fullScreenCallBack: data => console.log("全屏回调", data),
                getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
                width: 1150,
                height: 600
            });
            console.log("player",player);
            // setTimeout(()=>{
            //   player.stop(); // 方法调用示例，10秒后关闭视频
            // },10000)
        }
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