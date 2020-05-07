import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home/index'
// import Category from '@/pages/category/index'
// import Cart from '@/pages/cart/index'
// import Personal from '@/pages/personal/index'
// import Product from '@/pages/product/index'
// import Search from '@/pages/search/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: ()=> import('@/pages/home/index'), //懒加载 当页面被访问时才进行加载其代码
      children:[{
          path: 'product/:id',
          name: 'home-product',
          component: ()=> import('@/pages/product/index')
      }]
    },
    {
      path: '/category',
      name: 'category',
      component: ()=> import('@/pages/category/index')
    },
    {
      path: '/cart',
      name: 'cart',
      component: ()=> import('@/pages/cart/index')
    },
    {
      path: '/personal',
      name: 'personal',
      component: ()=> import('@/pages/personal/index')
    },
    // {
    //   path: '/product',
    //   name: 'product',
    //   component: Product
    // },
    {
      path: '/search',
      name: 'search',
      component: ()=> import('@/pages/search/index')
    },
    {
      path: '*',
      redirect: '/home',
    }
  ]
})
