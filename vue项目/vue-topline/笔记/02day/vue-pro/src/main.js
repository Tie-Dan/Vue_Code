import Vue from 'vue'
import App from './App.vue'
import router from './router' // 有省略.js后缀名字

// 1) 完整引入
// eslint要求import系列代码都要在普通代码上边设置
// 引入elementui组件库
import ElementUI from 'element-ui'
// // 引入css样式
// // import 'element-ui/lib/theme-chalk/index.css'
// // 把组件库注册给Vue
// // 之前组件注册：Vue.component(名称,组件) 每次只能注册一个
// // 现在组件注册: Vue.use(组件模块) 一次性注册"全部"的组件，非常高效
//                 use()同时兼顾事件方法的注册工作
Vue.use(ElementUI)

// // 2) 按需引入
// import { Row, Button, MessageBox, Message } from 'element-ui'
// // 按需注册组件
// Vue.use(Row)
// Vue.use(Button)
// // 按需注册事件方法(原型继承)
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message

Vue.config.productionTip = false
new Vue({
  router,
  // render: h => h(App)
  // render方法通过App根组件对主模板容器(public/index.html)进行渲染
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
