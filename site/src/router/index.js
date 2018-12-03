import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home/index'
import shop from '@/components/demo/shop'
import details from '@/components/demo/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
