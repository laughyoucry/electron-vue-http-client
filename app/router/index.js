import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const home = r => require.ensure([], () => r(require('../components/common/Home')), 'home')

// const readme = r => require.ensure([], () => r(require('../components/page/Readme')), 'readme')
// const operation = r => require.ensure([], () => r(require('../components/page/Operation')), 'operation')
// const script = r => require.ensure([], () => r(require('../components/page/Script')), 'script')
// const setting = r => require.ensure([], () => r(require('../components/page/Setting')), 'setting')
// const normal = r => require.ensure([], () => r(require('../components/page/Normal')), 'normal')

// const login = r => require.ensure([], () => r(require('../components/page/Login')), 'login')

import home from '../components/common/Home.vue'
import login from '../components/page/Login.vue'
import readme from '../components/page/Readme.vue'
import operation from '../components/page/Operation.vue'
import script from '../components/page/Script.vue'
import setting from '../components/page/Setting.vue'
import normal from '../components/page/Normal.vue'
import history from '../components/page/History.vue'

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
          path: '/history',
          component: history
        },
        {
          path: '/normal',
          component: normal
        },
        {
          path: '/script',
          component: script
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
