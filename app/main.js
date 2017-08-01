import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Element from 'element-ui'
import crypto from 'crypto'

// 默认主题
// import 'element-ui/lib/theme-default/index.css';
// 浅绿色主题
import '../static/css/theme-green/index.css'
// import '../dist/assets/app.css'
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

// base64转码
Vue.prototype.base64 = function (obj) {
  if (!obj) {
    return
  }
  var tmp = obj
  if (typeof obj === 'object') {
    tmp = JSON.stringify(obj)
  }
  var buf = new Buffer(tmp)
  return buf.toString('base64')
}

// 签名
Vue.prototype.sign = function (body, pk) {
  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }
  var sign = crypto.createSign('SHA1')
  // var rsaPrivateKey = this.getFromLocal('conf_encryptKey', '')
  sign.update(body)
  return sign.sign(pk, 'base64')
}

// 公钥加密
Vue.prototype.pkEncrypt = function (body, pk) {
  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }
  var content = new Buffer(body)
  var encrypt = crypto.publicEncrypt(pk, content)
  return encrypt.toString('base64')
}

// 从localStorage获取值
Vue.prototype.getFromLocal = function (item, dval) {
  var result = localStorage.getItem(item)
  if (!result) {
    return dval
  }
  return result
}

// 从localStorage获取布尔值
Vue.prototype.getBooleanFromLocal = function (item, dval) {
  var result = localStorage.getItem(item)
  if (!result) {
    return dval
  }
  return result === 'true'
}
