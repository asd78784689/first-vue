// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'assets/scss/index.scss' 
import 'swiper/dist/css/swiper.css' //引入swiper的css 

Vue.config.productionTip = 
// 解决移动端300毫秒延迟
// fastclick.attach(document.body);
// 全局都可以使用VueLazyload插件
Vue.use(VueLazyload,{
    preLoad:1,   // 是个小数 还剩多少时候进行加载 1为完全显示时候加载 1.1等以上时会进行预加载之后的
    error:require('@/assets/img/error.png'),   //失败时候的加载的图片
    loading:require('@/assets/img/loading.gif'),   //加载中时候的图片
    attempt:1,   //尝试加载次数
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
