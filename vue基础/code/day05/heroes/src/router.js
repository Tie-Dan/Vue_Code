// 配置router
import Vue from "vue"; //vue.js
import VueRouter from "vue-router"; // 引入vue-router.js

import appList from "./components/app-list/app-list.vue";
import appWeapon from "./components/app-weapon/app-weapon.vue";
import appGear from "./components/app-gear/app-gear.vue";
import appAdd from "./components/app-list/app-add.vue";
import appEdit from "./components/app-list/app-edit.vue";
import test from "./components/test/test.vue";

Vue.use(VueRouter); // 标识Vue对象引用router

var router = new VueRouter({
  linkActiveClass: "active", // 相当于把router-link当前的激活样式名称换成active
  routes: [
    // 强制跳转
    {
      path: "/",
      redirect: "/heroes"
    },
    {
      path: "/heroes",
      component: appList
    },
    {
      path: "/weapon",
      component: appWeapon
    },
    {
      path: "/gear",
      component: appGear
    },
    {
      path: "/add",
      component: appAdd
    },
    {
      path: "/edit/:id", //动态路由 路由参数
      component: appEdit
    },
    {
      path: "/test",
      component: test
    }
  ]
});
export default router;
