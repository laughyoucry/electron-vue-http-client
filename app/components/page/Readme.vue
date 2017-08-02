<template>
  <div>
    <div class="readme">
      <h2>关于http-client</h2>
        <p>http-client 是一个模拟用户发送 http 请求的客户端。</p>
        <br/>
      <h2>功能：</h2>
      <ul>
        <li>
          <h3>欢迎页</h3>
          <p>    也就是本页面。</p>
        </li>
        <li>
          <h3>操作页</h3>
          <p>    按照要求填入相应的内容可以点击 "发送" 测试请求，相应的结果会在 "响应消息" 下的文本框显示，请求成功会在本地保存填写内容</p></li>
        <li>
          <h3>脚本页</h3>
          <p>    批量测试请求，需要先把请求以特定格式准备好，在文本框填入脚本存放的文件夹绝对路径，点击 "开始测试"，测试结果会以 "文件名" + " 结果 的形式批量展示，
          也可以查看软件目录下 <code>logs/script_log.log</code> 中内容。文件夹路径有效会在本地保存填写内容。</p>
        </li>
        <li>
          <h3>设置页</h3>
          <p>    目前主要是 加密公私钥的设置</p>
          <p>    软件有加密和普通两种形式。</p>
          <p>      普通形式：appid 无需填写。</p>
          <p>      加密形式：需要将 "设置" -> "信息加密" 置为 "是"，并填上 "信息密钥" 内容，点击 “确定” 保存设置。</p>
          <p>    目前密码加密功能尚未完成。</p>
        </li>
      </ul>
      <br/>
      <h2>Tips:</h2>
      <ul>
        <li><p>因为采用的是 node 转发 http 请求，所以 http 请求 uri 里面只能是 ip。</p></li>
        <li><p>脚本测试没有设计太多，建议用户以 文件夹+文件名 的形式区分和编写测试脚本。</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    }
  }
</script>
<style>
  .readme body {
    padding: 20px;
    font-family: system, -apple-system, '.SFNSText-Regular', 'SF UI Text', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, sans-serif;
    color: #fff;
    background-color: #8aba87;
    text-align: left;
  }

  .readme p {
    margin-top:5px;
    font-size: 16px;
  }

  .readme li {
    margin-top: 15px;
  }
</style>
