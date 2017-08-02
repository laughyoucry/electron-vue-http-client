<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入文件或文件夹路径" v-model="folderPath">
      <el-button slot="append" icon="search" @click="startTest">开始测试</el-button>
    </el-input>
    <h3 style="margin:40px 0 15px;font-weight: 400;color: #1f2f3d;">测试结果：</h3>
    <el-collapse v-for="resp in resps" :key="resp.name">
      <el-collapse-item v-bind:name="resp.name">
        <template slot="title">
          {{ resp.title }}
          <i v-bind:class="resp.class"></i>
        </template>
        <div>
          <h3>请求消息：</h3>
          <code><pre>{{ resp.content }}</pre></code>
        </div>
        <div>
          <h3>响应消息：</h3>
          <code><pre>{{ resp.body }}</pre></code>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import fs from 'fs'
    import path from 'path'
    import moment from 'moment'
    import request from 'request'

    // 信息 type 类型
    var respType = ['header-icon el-icon-circle-check', 'header-icon el-icon-circle-close', 'header-icon el-icon-warning']

    export default{
      data () {
        return {
          // 是否需要加密、签名
          isEncrypt: this.getFromLocal('conf_isEncrypt', true),
          encryptKey: this.getFromLocal('conf_encryptKey', ''),
          // 是否需要密码加密
          isPwdEncrypt: this.getFromLocal('conf_isPwdEncrypt', true),
          pwdEncryptKey: this.getFromLocal('conf_pwdEncryptKey', ''),
          folderPath: this.getFromLocal('folder_path', ''),
          files: [],
          resps: []
        }
      },
      methods: {
        // 开始测试
        startTest: function () {
          // 初始化 files
          this.files = []
          this.scanDir(this.folderPath)
          if (this.files.length > 0) {
            var _this = this
            // 保存文件路径到本地存储
            localStorage.setItem('folder_path', this.folderPath)
            // 初始化响应
            this.resps = []
            // 执行测试
            this.files.forEach(function (file) {
              _this.sendRequest(file)
            })
          } else {
            this.$message.error('未找到有效文件，请检查路径和文件名!')
          }
        },
        // 扫描文件
        scanDir: function (filePath) {
          var _this = this
          // json文件
          if (fs.statSync(filePath).isFile() && path.extname(filePath).toLowerCase() === '.json') {
            return _this.files.push(filePath)
          }
          try {
            fs.readdirSync(filePath).forEach(function (file) {
              _this.scanDir(filePath + '/' + file)
            })
          } catch (e) {
            _this.llog(filePath + '不是文件路径')
          }
        },
        // 解析文件并发送测试请求
        sendRequest: function (filePath) {
          this.llog('解析文件开始，文件路径：' + filePath)
          var name = path.basename(filePath, '.json')
          this.llog('文件名为：' + name)
          // 读取文件
          var fileData = fs.readFileSync(filePath)
          // 解析文件
          var reqData = JSON.parse(fileData)
          if (!reqData) {
            this.llog('文件：' + name + '无内容或JSON格式不正确')
            return
          }
          // 获取请求参数对象
          var opt = this.getOpt(reqData)

          var _this = this
          // 发送请求
          request(opt, function (error, response, body) {
            _this.llog(name + ' 成功返回信息')
            _this.llog(name + ' error:' + error)
            _this.llog(name + ' statusCode:', response && response.statusCode)
            var resp = {
              title: name + ' 结果',
              // 默认都是成功的
              class: respType[0],
              name: name,
              content: reqData,
              body: {}
            }
            if (response && response.statusCode === 200) {
              // 特殊响应的处理
              if (_this.isEncrypt !== 'false') {
                var resMsg = JSON.stringify((JSON.parse(body)).message)
                var decMsg = new Buffer(resMsg, 'base64').toString()
                resp.body = JSON.stringify(JSON.parse(decMsg), null, 2)
                // resp.body = decMsg
              } else {
                // 直接展示
                resp.body = JSON.stringify(JSON.parse(body), null, 2)
                // resp.body = body
              }
            } else {
              resp.class = respType[1]
              resp.body = error
            }
            _this.llog('返回消息为：' + resp.body)
            // 添加返回结果
            _this.resps.push(resp)
          })
        },
        // 获取 opt 对象
        getOpt: function (req) {
          // 请求头信息
          var method = req.method
          var uri = req.uri
          var body = req.body
          var appid = req.appid

          // application/x-www-form-urlencoded
          var contentType = 'application/json;charset=utf-8'
          var opt = {
            method: method,
            uri: uri,
            headers: {
              'Content-Type': contentType
            }
          }

          // GET 请求
          if (method === 'GET') {
            opt.qs = this.getBody(appid, body)
          } else {
            // 其他请求
            opt.body = JSON.stringify(this.getBody(appid, body))
          }
          this.llog('opt is :' + JSON.stringify(opt))
          return opt
        },
        // 获取请求体
        getBody: function (appid, body) {
          // 是否需要加密
          if (this.isEncrypt !== 'false') {
            var message = this.base64(this.getMessage(body))
            var signature = this.sign(appid + message, this.encryptKey)
            return {
              message: message,
              signature: signature
            }
          }
          if (!!body && body !== '' && !this.isEmptyObject(body)) {
            return JSON.parse(body)
          }
          return {}
        },
        // 组装message,拼装上必须信息
        getMessage: function (body) {
          if (!body) {
            body = {}
          } else if (typeof body === 'string') {
            body = JSON.parse(body)
          }
          // 目前只支持 /user/encrypted_pay_pin 字段加密
          if (this.isPwdEncrypt !== 'false') {
            if (this.pwdEncryptKey === '') {
              this.llog.error('请配置密码加密公钥')
              return
            }
            if (!!body.user && !!body.user.encrypted_pay_pin) {
              var encryptedPayPin = this.pkEncrypt(body.user.encrypted_pay_pin, this.pwdEncryptKey)
              body.user.encrypted_pay_pin = encryptedPayPin
            }
          }

          body['timestamp'] = moment().format('YYYY-MM-DD HH:mm:ss')
          body['nonce'] = '123456'
          body['ex_serial_no'] = Date.parse(new Date())
          this.llog('body' + JSON.stringify(body))
          return body
        },
        // 判断是否空对象
        isEmptyObject: function (e) {
          var t
          for (t in e) {
            console.log(t)
            return !1
          }
          return !0
        },
        // 输出返回结果到文件中
        llog: function (content) {
          var _this = this
          var timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
          content = '[' + timestamp + ']:' + content + '\n'
          // 默认输出文件
          fs.appendFile('logs/script_log.log', content, 'utf8', (err) => {
            if (err) {
              _this.$message.error(err)
            }
          })
          // 追加返回结果
        }
      }
    }
</script>
<style>

</style>
