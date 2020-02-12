import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/fat', name: 'fat', component: () => import('@/views/Fat.vue') },
    {
      path: '/',
      // path: '/aa/bb/cc/dd/ee/ff/gg',
      // 给路由起一个名字，方便调用
      // router.push('/aa/bb/cc/dd/ee/ff/gg')
      // router.push({name:'home'})
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('./views/About.vue')
      component: function () {
        return import('./views/About.vue')
      }
    }
  ]
})
