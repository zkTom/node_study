import Vue from 'vue'
import './assets/scss/index.scss'
// Vue.config.errorHandler 追踪全局组件渲染错误
import App from './App.vue'
import router from '@/router/index.js';
// todo 完成项目本身模块单独打包
// todo 第三方模块（lodash/moment/jquery）单独使用cdn
// todo 使用prefetch/preload
// todo 优化打包速度，和文件归类位置
/**
 * App组件最后会被打包成为一个render函数，
 * 基本结构如下（大致）：
 * var render = function() {
 *      var _vm = this
 *      var _h = _vm.$createElement
 *      var _c = _vm._self._c || _h
 *      return _c("div", { staticClass: "app" },
 *          [_c("span", { staticClass: "text" }, 
 *          [
 *           _vm._v("I am root App")]),
 *           _vm._v(""), 
 *           _c("img", { attrs: { src: require(./assets/img/logo.png))}
 *          ])
 * */
new Vue({
	router,
	render: (h) => h(App)
}).$mount('#app')
