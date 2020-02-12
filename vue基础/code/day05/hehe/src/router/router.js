import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import List from '../components/list/appList.vue'
import Bar from '../components/bar/bar.vue'
import Foo from '../components/foo/foo.vue'
import Add from '../components/list/add.vue'
import Edit from '../components/list/edit.vue'
const router = new VueRouter({
  linkExactActiveClass: "active",
  routes: [{
    path: '/',
    component: List
  }, {
    name: 'list',
    path: '/list',
    component: List
  }, {
    path: '/bar',
    component: Bar
  }, {
    path: '/foo',
    component: Foo
  }, {
    name: "add",
    path: '/add',
    component: Add
  }, {
    name: "edit",
    path: '/edit/:id',
    component: Edit
  }]
})
export default router
