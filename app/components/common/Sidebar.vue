<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title">
                <i :class="item.icon"></i>
                {{ item.title }}
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        items: [
          {
            icon: 'el-icon-star-on',
            index: 'readme',
            title: '欢迎'
          }, {
            icon: 'el-icon-menu',
            index: 'operation',
            title: '操作'
          }, {
            icon: 'el-icon-document',
            index: 'script',
            title: '脚本执行'
          }, {
            icon: 'el-icon-setting',
            index: 'setting',
            title: '设置'
          }
        ]
      }
    },
    computed: {
      onRoutes () {
        return this.$route.path.replace('/', '')
      }
    }
  }
</script>
<style>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
