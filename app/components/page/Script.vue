<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入文件或文件夹路径" v-model="folderPath">
      <el-button slot="append" icon="search" @click="startTest">开始测试</el-button>
    </el-input>
    <h3 style="margin:40px 0 15px;font-weight: 400;color: #1f2f3d;">测试结果：</h3>
    <el-collapse v-for="resp in resps">
      <el-collapse-item v-bind:name="resp.name">
        <template slot="title">
          {{ resp.title }}
          <i v-bind:class="resp.class"></i>
        </template>
        <div>{{ resp.content }}</div>
        <div>{{ resp.body }}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import fs from 'fs'
    import path from 'path'

    // 信息 type 类型
    var respType = ['header-icon el-icon-circle-check', 'header-icon el-icon-circle-close', 'header-icon el-icon-warning']

    export default{
      data () {
        return {
          folderPath: '',
          files: [],
          resps: [{
            title: '一致性 Consistency',
            class: respType[0],
            name: '1',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: respType[1],
            name: '2',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: 'header-icon el-icon-circle-close',
            name: '3',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: 'header-icon el-icon-circle-cross',
            name: '4',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: 'header-icon el-icon-circle-cross',
            name: '5',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: 'header-icon el-icon-circle-cross',
            name: '6',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }, {
            title: '一致性 Consistency',
            class: 'header-icon el-icon-warning',
            name: '7',
            content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            body: '在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }]
        }
      },
      methods: {
        // 开始测试
        startTest: function () {
          // 初始化 files
          this.files = []
          this.scanDir(this.folderPath)
          if (this.files.length > 0) {
            console.log(this.files)
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
            console.log(filePath + '不是文件路径')
          }
        }
      }
    }
</script>
<style>

</style>
