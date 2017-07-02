<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 14px;">{{ msg }}</span>
        </div>
        <div v-for="o in 10" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
</template>

<script>
    export default{
      data () {
        return {
          msg: '返回消息'
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
