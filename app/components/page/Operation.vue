<template>
  <div class="operation">
      <el-form ref="form" :model="req" label-width="80px" :inline="true" class="demo-form-inline">
          <el-form-item label="ip">
              <el-input v-model="req.ip"></el-input>
          </el-form-item>
          <el-form-item label="appid">
              <el-input v-model="req.appid"></el-input>
          </el-form-item>
          <el-form-item label="uri">
              <el-input v-model="req.uri"></el-input>
          </el-form-item>
          <el-form-item label="请求方法">
              <el-select v-model="req.method">
                  <el-option label="GET" value="GET"></el-option>
                  <el-option label="POST" value="POST"></el-option>
                  <el-option label="PUT" value="PUT"></el-option>
                  <el-option label="DELETE" value="DELETE"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">发送</el-button>
          </el-form-item>
      </el-form>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 14px;">请求消息</span>
        </div>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请求内容"
          v-model="req.reqBody">
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
          v-model="res.resBody">
        </el-input>
      </el-card>
  </div>
</template>

<script>
  import request from 'request'
  // import qs from 'querystring'

  export default {
    data () {
      return {
        req: {
          'ip': '127.0.0.1:8088',
          'appid': '1234kfasdfkdslklfhfgh4567',
          'uri': 'http://127.0.0.1:8180/api/user',
          'method': 'GET',
          'reqBody': {
            name: 'lemo',
            age: 12,
            pwd: '123456'
          }
        },
        res: {
          resBody: '这里是响应内容'
        }
      }
    },
    components: {},
    methods: {
      onSubmit: function () {
        // // 请求头信息
        // var headers = ''
        // if (this.req.method === 'GET') {
        //   headers = 'application/x-www-form-urlencoded'
        // } else {
        //   headers = 'application/json;charset=utf-8'
        // }
        // console.log('headers is ' + headers)
        //
        // // 请求体信息
        // var reqBody = ''
        // if (this.req.reqBody) {
        //   reqBody = JSON.stringify(this.req.reqBody)
        //   console.log('reqBody is ' + reqBody)
        // }
        // var _this = this
        // var opt = {
        //   method: _this.req.method,
        //   uri: _this.req.uri,
        //   headers: {
        //     headers
        //   },
        //   body: reqBody
        // }

        var baseUrl = 'http://127.0.0.1:8180/api/'
        var opt = {}
        var reqMethod = this.req.method
        var user = {
          'name': '1',
          'age': 22,
          'pwd': '*********'
        }

        if (reqMethod === 'GET') {
          opt = {
            baseUrl: baseUrl,
            uri: 'user',
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
              // 'Content-Length': data.length
            }
          }
        } else if (reqMethod === 'POST') {
          opt = {
            baseUrl: baseUrl,
            uri: 'user',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
              // 'Content-Length': data.length
            },
            body: JSON.stringify(user)
          }
        } else if (reqMethod === 'PUT') {
          opt = {
            baseUrl: baseUrl,
            uri: 'user',
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
              // 'Content-Length': data.length
            },
            body: JSON.stringify(user)
          }
        } else if (reqMethod === 'DELETE') {
          opt = {
            baseUrl: baseUrl,
            uri: 'user',
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
              // 'Content-Length': data.length
            },
            body: JSON.stringify(user)
          }
        }

        this.$message('发送请求中...')
        var _this = this
        request(opt, function (error, response, body) {
          console.log('error:', error)
          console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received
          if (response && response.statusCode === 200) {
            _this.res.resBody = JSON.stringify(JSON.parse(body), null, 2)
          }
          console.log('body:', body) // Print the HTML for the Google homepage.
        })
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
    width: 480px;
  }
</style>
