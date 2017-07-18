<template>
  <div class="operation">
      <div>
        <el-input placeholder="请输入appid" v-model="req.appid">
          <template slot="prepend">APPID:</template>
        </el-input>
      </div>
      <div style="margin-top: 10px;">
        <el-input placeholder="请输入地址" v-model="req.uri">
          <el-select v-model="req.method" slot="prepend" placeholder="请选择">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
          <el-button slot="append" icon="search" @click="onSubmit">发送</el-button>
        </el-input>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 14px;">请求消息</span>
        </div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请求内容"
          v-model="req.body">
        </el-input>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 14px;">响应消息</span>
        </div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="响应内容"
          v-model="res.body">
        </el-input>
      </el-card>
  </div>
</template>

<script>
  import request from 'request'
  // import fs from 'fs'
  import moment from 'moment'

  export default {
    data () {
      return {
        req: {
          'uri': this.getFromLocal('req_uri', ''),
          'appid': this.getFromLocal('req_appid', ''),
          'method': this.getFromLocal('req_method', 'GET'),
          'body': this.getFromLocal('req_body', '')
        },
        res: {
          body: ''
        }
      }
    },
    components: {},
    methods: {
      // 发送事件
      onSubmit: function () {
        this.$message('发送请求中...')

        // 是否需要加密、签名
        var isEncrypt = this.getFromLocal('conf_isEncrypt', true)
        var encryptKey = this.getFromLocal('conf_encryptKey', '')
        if (isEncrypt !== 'false' && !encryptKey) {
          this.$message.error('请配置信息公钥')
          return
        }

        // 验证appid是否输入
        if (isEncrypt !== 'false' && !this.req.appid) {
          this.$message.error('请填写appid')
          return
        }

        // 获取请求参数对象
        var opt = this.getOpt()

        var _this = this
        // 发送请求
        request(opt, function (error, response, body) {
          _this.$message('成功返回信息')
          _this.$message('error:' + error)
          _this.$message('statusCode:', response && response.statusCode)
          if (response && response.statusCode === 200) {
            // 特殊响应的处理
            if (isEncrypt !== 'false') {
              var resMsg = JSON.stringify((JSON.parse(body)).message)
              var decMsg = new Buffer(resMsg, 'base64').toString()
              _this.res.body = JSON.stringify(JSON.parse(decMsg), null, 2)
            } else {
              // 直接展示
              _this.res.body = JSON.stringify(JSON.parse(body), null, 2)
            }
          } else {
            _this.res.body = error
            _this.$message.error('statusCode' + response.statusCode)
          }
        })

        // 保存请求信息
        this.saveReq()
      },
      // 获取 opt 对象
      getOpt: function () {
        // 请求头信息
        var method = this.req.method
        var uri = this.req.uri
        var body = this.req.body
        var appid = this.req.appid

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
        this.$message('opt is :' + JSON.stringify(opt))
        return opt
      },
      // 获取请求体
      getBody: function (appid, body) {
        // 是否需要加密
        var isEncrypt = this.getFromLocal('conf_isEncrypt', true)
        if (isEncrypt !== 'false') {
          var message = this.base64(this.getMessage(body))
          var rsaPrivateKey = this.getFromLocal('conf_encryptKey', '')
          var signature = this.sign(appid + message, rsaPrivateKey)
          return {
            message: message,
            signature: signature
          }
        }
        if (!!body && body !== '') {
          return JSON.parse(body)
        }
        return {}
      },
      // 组装message,拼装上必须信息
      getMessage: function (body) {
        if (!body) {
          body = {}
        } else {
          body = JSON.parse(body)
        }
        body['timestamp'] = moment().format('YYYY-MM-DD HH:mm:ss')
        body['nonce'] = '123456'
        body['ex_serial_no'] = Date.parse(new Date())
        this.$message('body' + JSON.stringify(body))
        return body
      },
      // 保存请求参数信息
      saveReq: function () {
        localStorage.setItem('req_uri', this.req.uri)
        localStorage.setItem('req_appid', this.req.appid)
        localStorage.setItem('req_method', this.req.method)
        localStorage.setItem('req_body', this.req.body)
      }
    }
  }
</script>
<style>
  .text {
    font-size: 12px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix{
    font-size: 14px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: auto;
  }
  .el-select .el-input {
    width: 110px;
  }
</style>
