<template>
    <div class='demo'>
        <video id="videoElement" width="1000px" class="flvplayer-app"></video>

        <button @click="play">
            播放
        </button>
        <button @click="pause">
            暂停
        </button>
    </div>
</template>

<script>
    import flvjs from 'flv.js';
    export default {
        name: 'liveStreaming',
        data() {
            return {
                test: '',
                player: '',
                flvPlayer: null
            };
        },
        props: {
            videoSrc: {
                type: String,
                default: 'https://flvopen.ys7.com:9188/openlive/bafac46e4b8d43e3ac055c8ff4ea7345.hd.flv'
            }
        },
        mounted() {
            if (flvjs.isSupported()) {
                let videoElement = document.getElementById('videoElement');
                let videoSrc = this.videoSrc;
                this.flvPlayer = flvjs.createPlayer({
                    // url:"https://flvopen.ys7.com:9188/openlive/bafac46e4b8d43e3ac055c8ff4ea7345.hd.flv",
                    url: videoSrc,
                    type: 'flv',
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
            }
        },
        methods: {
            play() {
                this.flvPlayer.play();
            },
            pause() {
                this.flvPlayer.pause();
            }
        },
        destroyed() {
            this.flvPlayer.pause();
            this.flvPlayer.unload();
            this.flvPlayer.detachMediaElement();
            this.flvPlayer.destroy();
            this.flvPlayer = null;
        }
    };
</script>

<style scoped>

</style>