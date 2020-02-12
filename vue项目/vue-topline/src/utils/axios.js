// 引入Vue
import Vue from 'vue'
// 引入vue-router
import router from './router'
// 引入axios
import axios from 'axios'
// 引入json-bigint
import JSONBig from 'json-bigint'

// 给axios做配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // config是对象，可以理解为 axios.defaults，可以给config做配置
  // 给所有axios请求统一配置token，token需要通过http头协议信息形式传递
  // console.log(config)
  var token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.defaults.transformResponse = [function (data) {
  // 对服务器返回的第一手数据data做处理，该数据本质是 字符串对象
  // 服务器端会返回两种类型：
  // 1) 字符串对象  '{xxx:xxx}'
  // 2) 空字符串  ''
  if (data) {
    return JSONBig.parse(data)
  } else {
    return data
  }
}]

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // 正常的响应逻辑处
  // response代表服务器端返回的信息
  // console.log(2222, response)
  return response
}, function (error) {
  // 如果出现token过期401错误，那么要执行此处代码
  // console.dir(error.response.status=======401)
  if (error.response.status === 401) {
    // 强制登录系统
    // this.$router.push({ name: 'login' })
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios
