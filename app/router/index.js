import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '../components/common/Home.vue'
import login from '../components/page/Login.vue'
import readme from '../components/page/Readme.vue'
import operation from '../components/page/Operation.vue'
import setting from '../components/page/Setting.vue'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/readme'
    },
    {
      path: '/readme',
      component: home,
      children: [
        {
          path: '/',
          component: readme
        },
        {
          path: '/operation',
          component: operation
        },
        {
          path: '/setting',
          component: setting
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})
