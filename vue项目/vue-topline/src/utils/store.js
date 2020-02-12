// 引入、配置vuex
// 引入vuex
import Vuex from 'vuex'
// 引入Vue
import Vue from 'vue'

// 把vuex注册给Vue，代表vue对象可以调用vuex的成员了
Vue.use(Vuex)

// 创建Vuex的对象
var store = new Vuex.Store({
  // state:用于“获取”共享的数据
  state: {
    // 要共享的数据就两个name/photo
    name: window.sessionStorage.getItem('name'),
    photo: window.sessionStorage.getItem('photo')
  },
  // mutations: 用于“修改”共享的数据
  mutations: {
    // 修改方法(stt就代表本身的state对象，被更新的数据参数){}
    upName (stt, arg) {
      // 更新sessionStorage的数据
      window.sessionStorage.setItem('name', arg)
      // 之后再更新本身name的数据
      stt.name = window.sessionStorage.getItem('name')
    },
    upPhoto (stt, arg) {
      // 更新sessionStorage的数据
      window.sessionStorage.setItem('photo', arg)
      // 之后再更新本身name的数据
      stt.photo = window.sessionStorage.getItem('photo')
    },
    // 清除名称和头像信息
    clearNamePhoto (stt) {
      window.sessionStorage.clear()
      stt.name = ''
      stt.photo = ''
    }
  }
})

// 把store做导出操作
export default store
