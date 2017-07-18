<template>
  <div class='header'>
    <div class='logo'>HTTP请求客户端</div>
    <div class='user-info'>
      当前系统：{{ platform }} app版本：{{ appVersion }}
    </div>
  </div>
</template>
<script>
  import { remote } from 'electron'
  import os from 'os'

  export default{
    data () {
      return {
        platform: os.platform(),
        appVersion: remote.app.getVersion()
      }
    }
  }
</script>
<style>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
