<template>
  <div class="setting">
    <h1>{{ setting.msg }}</h1>
    <span> from {{ setting.appName }} running on {{ setting.platform }} </span>
    <el-button type="primary" @click="onSubmit">发送</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        setting: {
          platform: 'os.platform()',
          appName: 'remote.app.getName()',
          msg: '这是设置页面'
        }
      }
    }
  }
</script>
