import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios

import "../node_modules/bootstrap/dist/css/bootstrap.css"; // bootstarp样式引入
import "./assets/index.css"; //引入资源
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
