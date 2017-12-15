<template>
  <div class='operation'>
    <div>
      <el-autocomplete
        class='inline-input'
        v-model='req.api'
        :fetch-suggestions='querySearch'
        placeholder='请输入内容'
        @select='handleSelect'
      >
        <template slot='prepend'>选择日期:</template>
      </el-autocomplete>
    </div>
    <el-collapse v-for="data in datas" :key="data.name">
      <el-collapse-item v-bind:name="data.name">
        <template slot="title">
          {{ data.name }}
        </template>
        <div>
          <h3>请求消息:</h3>
          <code><pre>appid: {{ data.content.appid }}</pre></code>
          <code><pre>uri: {{ data.content.uri }}</pre></code>
          <code><pre>method: {{ data.content.method }}</pre></code>
          <code><pre>body: {{ data.content.body}}</pre></code>
        </div>
        <div>
          <h3>响应消息：</h3>
          <code><pre>{{ data.content.response}}</pre></code>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import comm from './common.js'

  export default {
    data () {
      return {
        req: {
          'apis': this.loadAll(),
          'api': ''
        },
        datas: []
      }
    },
    components: {},
    methods: {
      // 搜素日期
      querySearch (queryString, cb) {
        var apis = this.req.apis
        var results = queryString ? apis.filter(this.createFilter(queryString)) : apis
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      // 过滤方法
      createFilter (queryString) {
        return (api) => {
          return (api.value.indexOf(queryString.toLowerCase()) >= 0)
        }
      },
      // 加载所有历史文件夹
      loadAll () {
        return comm.listHistoryDays()
      },
      // 选择操作
      handleSelect (item) {
        comm.llog('选择日期是：' + item.value)
        this.datas = comm.listHistoryReqs(item.value).reverse()
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
      content: '';
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: auto;
    margin-top: 4px;
  }
  .el-select .el-input {
    width: 110px;
  }
</style>
