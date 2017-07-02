<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 14px;">请求消息</span>
        </div>
        <div class="text item">
          <span>{{ req.reqBody }}</span>
        </div>
      </el-card>
    </div>
</template>

<script>
    export default{
      data () {
        return {}
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
