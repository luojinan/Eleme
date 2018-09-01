// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'style/border.css'	//引入移动端1像素边框样式库
import 'style/reset.css'	//引入移动端手机型号兼容样式库
import fastClick from 'fastclick'	//引入移动端300毫秒延迟点击js

Vue.config.productionTip = false
fastClick.attach(document.body)	//移动端300毫秒延迟点击js配置
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
