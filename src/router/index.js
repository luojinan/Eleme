import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import HomeGoods from '@/pages/home/components/HomeGoods'
import HomeComment from '@/pages/comment/HomeComment'
import HomeSell from '@/pages/sell/HomeSell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: './home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          redirect: './homegoods'
        },
        {
          path: '/home/homegoods',
          component: HomeGoods
        },
        {
          path: '/home/homecomment',
          component: HomeComment
        },
        {
          path: '/home/homesell',
          component: HomeSell
        }]
    },

  ]
})