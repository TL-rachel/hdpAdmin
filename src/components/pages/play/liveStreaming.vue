<template>
    <div class='demo'>
        <div id="app-container">
            <video ref="videoElement" :src="test" id="videoElement" controls autoplay muted width="600" height="450"></video>
        </div>
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
            };
        },
        methods: {
            show() {
                let video = this.$refs.videoElement; //定义播放路径
                if (flvjs.isSupported()) {
                    this.player = flvjs.createPlayer({
                        type: result.type === 'flv',
                        url: 'abc.flv'
                    });
                } else {
                    this.$message.error('不支持的格式');
                    return;
                }
                this.player.attachMediaElement(video);
                this.player.load();
                this.player.play();
            },
            cancelVideo() {
                //销毁对象
                if (this.player) {
                    this.player.pause();
                    this.player.destroy();
                    this.player = null;
                }
            }
        }
    };
</script>

<style scoped>

</style>