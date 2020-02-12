import Vue from 'vue'
import Router from 'vue-router'

// 引入nprogress相关的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

var router = new Router({
  routes: [
    // login后边不设置index.vue也可以
    // 当前项目已经把index.vue  index.js 设置为默认索引文件了，它们会自动被寻找到
    { path: '/login', name: 'login', component: () => import('@/views/login') },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home'),
      redirect: '/welcome', // 重定向1
      children: [
        // { path: '/home', redirect: '/welcome' },  // 重定向2
        // 配置子路由
        { path: '/fans', name: 'fans', component: () => import('@/views/fans') },
        { path: '/material', name: 'material', component: () => import('@/views/material') },
        { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') },
        { path: '/article', name: 'article', component: () => import('@/views/article') },
        { path: '/account', name: 'account', component: () => import('@/views/account') },
        { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd') },
        // 注意：要通过:aid的形式给当前路由传递参数
        { path: '/articleedit/:aid', name: 'articleedit', component: () => import('@/views/articleedit') }
      ]
    }
  ]
})

// 简单使用"前置"路由守卫
router.beforeEach((to, from, next) => {
  // 开启加载进度条
  NProgress.set(0.4)
  // to: 要去哪的路由信息 对象，to.path可以获得要执行的路由锚点信息
  // from: 从哪来的路由信息 对象, from.path获得从哪来的路由锚点信息
  // next  继续的意思,是回调函数，没有特殊情况该方法都要执行
  //       next(false)  路由停止执行
  //       next('/home') 要执行具体的路由
  //       next()        当前的路由没有阻拦继续执行的意思
  // 用户如果处于“非登录”状态，是要禁止访问后台页面的，但是login要强制请求过去
  var token = window.sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    // this.$router.push({ name: 'login' })  //不ok
    // router.push({ name: 'login' }) // ok
    return next('/login') // ok
  }
  next()
})

// 使用"后置"路由守卫
router.afterEach((to, from) => {
  // 加载进度条完成显示
  NProgress.done()
})

export default router
