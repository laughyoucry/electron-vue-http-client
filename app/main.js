import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'

// 默认主题
// import 'element-ui/lib/theme-default/index.css';
// 浅绿色主题
import '../static/css/theme-green/index.css'
import '../dist/assets/app.css'
import 'babel-polyfill'

// 开启debug模式
Vue.config.debug = true

/* eslint-disable no-new */
Vue.prototype.$axios = axios
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#main')
