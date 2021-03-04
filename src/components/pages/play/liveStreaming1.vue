<template>
    <div class='live-video'>
        <div class="query">
            <el-form :inline="true" ref="form" :model="form" :rules="rules" class="demo-form-inline query-btn">
                <span class="choice-camera">选择摄像头</span>
                <el-form-item label="" prop="companyId">
                    <el-select v-model="form.companyId" placeholder="请选择企业" @change="getAllRegions()">
                        <el-option v-for="(item,index) in companyList" :key="index" :label="item.companyName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="regionId">
                    <el-select v-model="form.regionId" placeholder="请选择区域" @change="getAllDevice()">
                        <el-option v-for="(item,index) in regionList" :key="index" :label="item.regionName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="deviceId">
                    <el-select v-model="form.deviceId" placeholder="请选择设备">
                        <el-option v-for="(item,index) in deviceList" :key="index" :label="item.deviceName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getLiveStreaming()"><i class="icon-picture icon-picture-query"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="video-play" @mouseover="videoFlag = true" @mouseout="videoFlag = false">
            <video id="videoElement" width="100%" height="100%" class="flvplayer-app"></video>
            <div class="play-pause-img" v-show="videoFlag && this.videoUrl && this.videoUrl.indexOf('.flv') != -1">
                <span class="play-img" @click="play()" v-show="playFlag"></span>
                <span class="pause-img" @click="pause()" v-show="!playFlag"></span>
            </div>
        </div>
        <div class="clearfix">
            <template v-for="(item,index) in videosList">
                <div class="device-user" :key="index">
                    <div class="user-detail">
                        <ul class="clearfix">
                            <li><img :src="item.userImage" alt=""></li>
                            <li>
                                <div class="user-name">{{item.userName}}</div>
                                <div class="user-rests">FaceId：{{item.faceId}}</div>
                            </li>
                            <li style="width: 200px;">
                                <div class="user-rests1">心率{{item.rate}}</div>
                                <div class="user-rests" style="width: 250px;">检测时间：{{item.checkTime}}</div>
                            </li>
                            <li>
                                <div class="user-rests1">疲劳度{{item.fatigue == 0?'正常':'疲劳'}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import flvjs from 'flv.js';
    import {companyAllList,allRegions,allDevice,queryVideos} from '../../../api/api';
    export default {
        name: 'liveStreaming',
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
                flvPlayer: null,
                companyList: {}, // 企业列表
                regionList: {}, // 区域列表
                deviceList: {}, // 设备列表
                videosList: {}, // 设备用户信息
                videoUrl: '', // 视频播放地址
                videoFlag: false,
                playFlag: false,
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
            /**
             * 创建实例
             * @param {String} url 播放链接
             */
            goPlay(url) {
                if (flvjs.isSupported()) {
                    let videoElement = document.getElementById('videoElement');
                    this.flvPlayer = flvjs.createPlayer({
                        url: url,
                        type: 'flv',

                    });
                    this.flvPlayer.attachMediaElement(videoElement);
                    this.flvPlayer.load();
                }
            },
            /**
             * 播放事件
             */
            play() {
                this.playFlag = false;
                if (!this.flvPlayer) {
                    this.goPlay(this.videoUrl);
                }
                this.flvPlayer.play();
            },
            /**
             * 暂停事件  同时销毁实例  释放资源
             */
            pause() {
                this.playFlag = true;
                this.flvPlayer.pause();
                this.flvPlayer.unload();
                this.flvPlayer.detachMediaElement();
                this.flvPlayer.destroy();
                this.flvPlayer = null;
            }
        },
        // 监听视频链接变化 及 校验 不是有效视频链接 不创建实例
        watch: {
            videoUrl: {
                handler(newVal) {
                    if (newVal.indexOf('.flv') !== -1) {
                        this.goPlay(newVal);
                        this.play();
                    } else {
                        this.$message({
                            showClose: true,
                            message: '视频链接不是有效链接',
                            type: 'error'
                        });
                    }
                },
                deep: true
            }
        },
        // 离开页面销毁实例  释放资源
        destroyed() {
            if (this.videoUrl.indexOf('.flv') !== -1) {
                this.flvPlayer.pause();
                this.flvPlayer.unload();
                this.flvPlayer.detachMediaElement();
                this.flvPlayer.destroy();
                this.flvPlayer = null;
            }
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
            width: 545px;
            height: 100px;
            margin: 20px 10px 20px 0;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 5px 0px rgba(188, 189, 190, 0.21);
            float: left;
            ul {
                padding: 20px 0;
                li {
                    float: left;
                    margin-left: 20px;
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