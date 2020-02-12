import Vue from "vue";
import App from "./App.vue";
import "../node_modules/bootstrap/dist/css/bootstrap.css"; // bootstarp样式引入
import "./assets/index.css"; //引入资源

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // 设置共享的方法

Vue.prototype.$https = axios; // 相当于 把axios共享给所有的vue实例使用

import router from "./router"; //引入router实例

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
// main.js是整个程序的入口
