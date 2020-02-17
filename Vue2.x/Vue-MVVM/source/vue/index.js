import {
  initState
} from './Observe'
import Watcher from './Observe/watcher'
import {
  compiler,
  util
} from './util'

function Vue(options) {
  // vue中传入的数据
  this._init(options); // 初始化Vue 并且将用户选项传入
}
// Vue 初始化
Vue.prototype._init = function (options) {
  // this.$options表示是Vue中的参数
  let vm = this
  vm.$options = options
  // MVVM原理 重新初始化数据  data computed watch
  initState(vm)
  // 初始化渲染页面
  if (vm.$options.el) {
    vm.$mount();
  }
};
// 获取挂载节点
function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  }
  return el
};

// 更新和渲染
Vue.prototype._update = function () {
  // 拿到数据更新试图
  let vm = this
  let el = vm.$el
  // 渲染所有元素 把内容替换成数据
  let node = document.createDocumentFragment()
  let firstChild
  while ((firstChild = el.firstChild)) {
    node.appendChild(firstChild)
  };

  // 对文本进行替换
  compiler(node, vm)
  // 替换完再放进去
  el.appendChild(node)
}
Vue.prototype.$mount = function () {
  let vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el); // 获取当前挂载的节点
  // 渲染节点时 通过Watcher渲染
  let updateComponent = () => {
    // 更新组件、渲染逻辑
    console.log('执行更新和渲染');
    vm._update(); // 更新和渲染
  }
  new Watcher(vm, updateComponent) // 渲染Watcher
  // 数据改变重新渲染

}
Vue.prototype.$watch = function (key, handler) {
  // 原理 创建一个watcher
  let vm = this
  new Watcher(vm, key, handler, {
    user: true // 用户自定义watcher
  })
}
export default Vue