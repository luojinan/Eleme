import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Evaluate from '@/pages/evaluate/Evaluate'
import Merchant from '@/pages/merchant/Merchant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/evaluate',
      name: 'Evaluate',
      component: Evaluate
    },
    {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant
    }
  ]
})
