import Vue from 'vue'
import App from './App.vue'
import router from './utils/router'

// 引入全局css样式控制文件
import '@/assets/css/global.css'

// 引入axios
import '@/utils/axios'

// 引入element组件库
import '@/utils/element.js'

// 引入store.js
import store from '@/utils/store'

Vue.config.productionTip = false

new Vue({
  // 挂载vuex到Vue实例内部
  store,
  router,
  render: h => h(App)
}).$mount('#app')
