import Vue from 'vue';
import axios from 'axios';
import App from './App';
import ElementUI from 'element-ui';
import './assets/theme/theme-new/index.css';
import './assets/theme/theme-new/indexReset.css';
import Vuex from 'vuex';
import router from './routes/routes';
import './common/less/index.less';

import echarts from 'echarts';

Vue.prototype.$echarts = echarts;

//-导入全局自定义方法
import ZFCommon from './common/js/common-func';
Vue.use(ZFCommon);

//-导入全局自定义组件，进行注册
import ZFComponents from './components/modules';
Vue.use(ZFComponents);

import VideoPlayer from 'vue-video-player';
import 'vue-video-player/src/custom-theme.css';
import 'video.js/dist/video-js.css';

Vue.use(VideoPlayer);

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
var $http = axios.create({
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  withCredentials: true // 加了这段就可以跨域了
});
Vue.prototype.$http = $http;
Vue.use(ElementUI);
Vue.use(Vuex);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
