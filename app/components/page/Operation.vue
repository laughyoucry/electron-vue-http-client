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
  import crypto from 'crypto'
  import fs from 'fs'
  import moment from 'moment'

  export default {
    data () {
      return {
        req: {
          'uri': '',
          'appid': '',
          'method': 'GET',
          'body': ''
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
        var opt = this.getOpt()

        var _this = this
        request(opt, function (error, response, body) {
          // logger.info('成功返回信息')
          // logger.info('error:', error)
          // Print the response status code if a response was received

          _this.$message('成功返回信息')
          _this.$message('error:' + error)
          _this.$message('statusCode:', response && response.statusCode)
          if (response && response.statusCode === 200) {
            var resMsg = JSON.stringify((JSON.parse(body)).message)
            var decMsg = new Buffer(resMsg, 'base64').toString()
            _this.res.body = JSON.stringify(JSON.parse(decMsg), null, 2)
          }
          _this.$message('body:', body) // Print the HTML for the Google homepage.
        })
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
        // logger.info('获取请求体')
        var message = this.base64(this.getMessage(body))
        var signature = this.sign(appid + message)
        return {
          message: message,
          signature: signature
        }
      },
      // 组装message,拼装上必须信息
      getMessage: function (body) {
        this.$message('组装message')
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
      // base64转码
      base64: function (obj) {
        if (!obj) {
          return
        }
        var tmp = JSON.stringify(obj)
        var buf = new Buffer(tmp)
        return buf.toString('base64')
      },
      // 签名
      sign: function (body) {
        if (typeof body === 'object') {
          body = JSON.stringify(body)
        }
        var sign = crypto.createSign('SHA1')
        var rsaPrivateKey = fs.readFileSync('privateKey.js').toString()
        sign.update(body)
        return sign.sign(rsaPrivateKey, 'base64')
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
