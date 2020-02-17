# Vue源码

## 1. MVVM原理

**准备工作 :**

- 初始化项目

  ```js
  npm init -y
  ```

- 安装webpack

  ```js
  npm i webpack webpack-cli webpack-dev-server html-webpack-plugin --save-d
  ```

- 配置webpack

  ```js
  // webpack.config.js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
      entry:'./src/index.js',// 以src下的index.js 作为入口文件进行打包
      output:{
          filename:'bundle.js',
          path:path.resolve(__dirname,'dist')
      },
      devtool:'source-map', // 调试的时候可以快速找到源码
      resolve:{
          // 更改模块查找方方式（默认的是去node_modules里去找）去source文件里去找
          modules:[path.resolve(__dirname,'source'),path.resolve('node_modules')]
      },
      plugins:[
          new HtmlWebpackPlugin({
              template:path.resolve(__dirname,'public/index.html')
          })
      ]
  }
  ```

- 配置package.json

  ```js
  "scripts": {
      "start": "webpack-dev-server", // 启动
      "build":"webpack" // 打包
   }
  ```

1. 实现数据劫持

   1. 初始化数据

      ```js
      // index.js
      import {initState} from '../Observe'
      function Vue(options){ // vue中传入的数据
          this._init(options) // 初始化Vue 并且将用户选项传入
      }
      // Vue 初始化 
      Vue.prototype._init = function(options){
          // this.$options表示是Vue中的参数
          let vm = this
          vm.$options = options
          // MVVM原理 重新初始化数据  data computed watch
          initState(vm)
      }
      export default Vue
      ```

   2. 观察数据

      ```js
      // 6. 引入Observe.js
      import Observe from './observe'
      // 1. 初始化数据
      export function initState(vm) {
          // 2. 做不同的初始化工作
          let opts = vm.$options
          if (opts.data) {
              initData()
          }
          if (vm.computed) {
              initComputed()
          }
          if (vm.wactch) {
              initWatch()
          }
      }
      
      export function observe(data) {
      		// 5. 不是对象或者是null 直接return
          if (typeof data !== 'object' || data == null) {
              return 
          }
          return new Observe(data) // 观察数据的逻辑放在这里面
      }
      // 将用户data数据 通过object.defineProperty重新定义
      function initData(vm) {
          // 3. 用户传入的data
          let data = vm.$options.data
      
          // 4. 判断data是不是函数 把数据赋值给vm._data 方便观察
          data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
      
          observe(data) // 观察数据
      
      }
      function initComputed() {
      }
      function initWatch() {
      }
      ```

   3. 观察data

      ```js
      // 5. 引入观察函数
      import {observe} from './index'
      // 1.
      class Observe {
          constructor(data) { // data就是我们刚刚定义的vm._data
              //  2. 将用户的数据使用defineProperty重新定义
              this.walk(data)
          }
          walk(data) {
              let keys = Object.keys(data)
              for (let i = 0; i < keys.length; i++) {
                  let key = keys[i]; // 获取所有的key
                  let value = data[keys[i]] // 获取所有的value
                  defineReactive(data, key, value)
              }
          }
      }
      // 3. 定义相应数据的变化
      export function defineReactive(data, key, value) {
          // 6. 如果value 依旧是一个对象的话 需要深度观察
          observe(value) // 递归观察
          // 4. 观察data
          Object.defineProperty(data, key, {
              get() {
                  return value
              },
              set(newValue) {
                  if (newValue === value) return
                // 7. 如果你设置的值是一个对象的话 也要加一层监听
                	observe(newValue)
                  value = newValue
              }
          })
      }
      export default Observe
      ```

   4. vm的数据代理

      ```js
      // observe/index.js
      // 2. 数据代理函数 vm.msg = vm._data.msg
      function proxy(vm, source, key) {
          Object.defineProperty(vm, key, {
              get() {
                  return vm[source][key]
              },
              set(newValue) {
                  return vm[source][key] = newValue
              }
          })
      }
      function initData(vm) {
          let data = vm.$options.data
          data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
          // 1. 数据代理(vm上的取值和赋值操作让vm._data属性去代理)
          for (let key in data) {
              proxy(vm, "_data", key)
          }
          observe(data) 
      }
      ```

   5. 实现数组方法新增属性监听

      ```js
       // array.js
       // 因为defineProperty 监听不到数组修改以后的属性
       // 拦截可以修改数组的方法:push shift ubshift pop reverse sort splice 
       // 1 获取数组原型上的方法 
       let oldArrayProtoMethods = Array.prototype
       // 2 复制一份新的  然后修改新的
       export let arrayMethods = Object.create(oldArrayProtoMethods)
       // 3 可以修改数组的方法关键字
       let methods = [
           'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'
       ]
       // 4 循环重写这些方法 
       methods.forEach(method => {
           arrayMethods[method] = function (...args) {
               // 5 调用老方法 去执行监听新增属性以外的事情
               let res = oldArrayProtoMethods[method].apply(this, args)
               // TODO 实现新增属性监听 
                console.log('实现监听了数组属性的方法')
               // TODO 通知使用的其它人改变
               // 6. 返回结果执行结果
               return res
      
           }
       })
      ```

      ```js
      // observe.js
      import {arrayMethods} from './array';
      class Observe {
          constructor(data) { 
            // 假如是数组把重写数组的方法挂到原型链上
              if (Array.isArray(data)) {
                  data.__proto__ = arrayMethods
              } else {
                  this.walk(data)
              }
          }
        ......
      }
      ```

      ```js
      // array.js 实现监听新增属性的方法 
      import {observe} from "."
      // 3. 新增属性数组的监听方法
      function observerArray(inserted) {
          // 循环新增数组中每一个属性进行监听
          for (let i = 0; i < inserted.length; i++) {
              observe(inserted[i])
          }
      }
      methods.forEach(method => {
           arrayMethods[method] = function (...args) {
               let res = oldArrayProtoMethods[method].apply(this, args)
               // 1. 拿到新增属性
                let inserted;
                switch (method) {
                  case 'push':
                  case 'unshift':
                    inserted = args
                    break;
                  case 'splice':
                    inserted = args.slice(2)
                  default:
                    break;
                }
                // 2. 实现新增属性的监听
                if (inserted) observerArray(inserted)
                return res
           }
       })
      ```

      ```js
      // observe.js 监听数组中的没一项
      import { arrayMethods,observerArray} from './array';
      if (Array.isArray(data)) {
        data.__proto__ = arrayMethods
        // 1. 只能拦截数组的方法,数组里的每一项还需要去监听
        observerArray(data)
      } else {
        this.walk(data)
      }
      ```

      

2. 初始化渲染页面

   1. 初始化获取挂载节点

      ```js
      // vue/index.js
      Vue.prototype._init = function (options) {
        .....
        // 1. 初始化渲染页面
          if (vm.$options.el) {
              vm.$mount()
      }
      // 3. 获取挂载节点
      function query(el) {
          if (typeof el === 'string') {
              return document.querySelector(el)
          }
          return el
      }
        // 2. 声明方法
      Vue.prototype.$mount = function () {
          let vm = this;
          let el = vm.$options.el
          el = vm.$el = query(el) // 获取当前挂载的节点
      }
      ```

   2. Watcher实现渲染和更新

      ```js
      // vue/index.js
      // 3.导入
      import Watcher from '../Observe/watcher'
      Vue.prototype.$mount = function () {
          let vm = this;
          let el = vm.$options.el
          el = vm.$el = query(el) 
          // 2.更新组件、渲染逻辑
          let updateComponent = () => {
              console.log('执行更新和渲染')
              vm._update() // 4. 更新和渲染的函数实现
          }
          // 1. 渲染节点时 通过Watcher渲染
          new Watcher(vm, updateComponent) // 
      }
      ```

      ```js
      // Watcher.js
      let id = 0 // 每次产生一个Watcher 都要一个唯一的标识
      // 1. 
      class Watcher {
          /**
           * @param {*} vm  当前组件的实例
           * @param {*} exprOrfn 用户可能传入一个表达式 也有可能传入的是一个函数
           * @param {*} cb 用户传入的回调函数 vm.$watch(msg,cb) 有默认值
           * @param {*} opts 一些其他参数  有默认值
           */
         // 2.
          constructor(vm, exprOrfn, cb = () => {}, opts = {}) {
              this.vm = vm
              this.exprOrfn = exprOrfn
              this.cb = cb
              this.opts = opts
              this.id = id++
            	// 3. 
              if (typeof exprOrfn === 'function') {
                // getter是new Watcher传入的第二个参数（updateComponent函数）
                  this.getter = exprOrfn }
              this.get() // 默认创建一个watcher 会调用自身的get方法
          }
          get() {
              this.getter() // 让函数(updateComponent)执行
          }
      }
      export default Watcher
      ```

      ```js
      // vue/index.js （vm._update的实现）
      Vue.prototype._update = function () {
          // 拿到数据更新试图
          let vm = this
          let el = vm.$el
          // 渲染所有元素 把内容替换成数据 
          let node = document.createDocumentFragment()
          let firstChild
          while (firstChild = el.firstChild) {
              node.appendChild(firstChild)
          }
          // 对文本进行替换
          compiler(node, vm)
          // 替换完再放进去
          el.appendChild(node)
      }
      ```

      ```js
      import { compiler } from './util'
      // util.js 实现模版编译compiler方法 
      const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g
      // 2.
      export const util = {
         // 4.
          getValue(vm, expr) {
              let keys = expr.split('.')
              return keys.reduce((memo, current) => {
                  memo = memo[current];
                  return memo
              }, vm)
          },
        	// 3.
          compilerText(node, vm) {
              // 编译文本 替换{{内容}}
              node.textContent = node.textContent.replace(defaultRE, function (...args) {
                  // 获取value
                  console.log(args)
                  return util.getValue(vm, args[1])
              })
          }
      };
      // 1.
      export function compiler(node, vm) {
          // 取出所有子节点
          let childNodes = node.childNodes;
          // 将类数组转为数组循环 判断是 3 文本节点 1 元素节点
          [...childNodes].forEach(child => {
              if (child.nodeType == 1) { // 1 元素节点
                  compiler(child, vm) // 编译当前的子节点
              } else if (child.nodeType == 3) { // 3文本节点
                  util.compilerText(child, vm)
              }
          })
      };
      ```

3. 数据改变依赖收集（发布订阅模式）

   1. 创建Dep收集依赖

      ```js
      let id = 0;
      class Dep {
          constructor() {
              this.id = id++;
              this.subs = []
          }
          addSub(watcher) { // 订阅
              this.subs.push(watcher)
          }
          notify(watcher) { // 发布
              this.subs.forEach(watcher => {
                  watcher.update()
              })
          }
      }
      // 用来保存当前watcher
      let stack = [];
      // 存
      export function pushTarget(watcher) {
          Dep.target = watcher
          stack.push(watcher)
      }
      // 取
      export function popTarget() {
          stack.pop();
          Dep.target = stack[stack.length - 1]
      }
      export default Dep // 用来收集依赖
      ```

   2. 调用Watcher的时候存取

      ```js
      // watcher.js
      get(){
        pushTarget(this) // 渲染watcer存起来  如果data发生变化需要让这个watcher重新执行
      	this.getter(); // 默认创建的watcher会调用自身的get方法 渲染更新
      	popTarget() // 取
      }
      ```

   3. 给每个data属性创建dep

      ```js
      // observe.js
      export function defineReactive(data, key, value) {
          observe(value) // 递归观察
          // 1.  观察data
          let dep = new Dep()
          Object.defineProperty(data, key, {
              get() {
                  // 2.判断防止单独调用observe
                  if (Dep.target) {
                      // 让dep存watcher 还希望让watcher存dep 实现多对多的关系
                   //  3. 在dep里面 把dep传到watcher 实现watcher过滤重复
                      dep.depend() 
                  }
                  return value
              },
              set(newValue) {
                  console.log('设置成功')
                  if (newValue === value) return
                  observe(newValue)
                  value = newValue
                 // 4. 当设置属性的时候 实现更新
                  dep.notify();
              }
          })
      }
      ```

   4. dep中的depend方法

      ```js
      depend() {
        // 现在的Dep.target是watcher
        if (Dep.target) { // 防止直接调用此方法先判断
          // 调用watcher的addDep方法把dep传进去  过滤相同的属性的watcher
          Dep.target.addDep(this)// 相当于 watcher.addDep(dep) 
        }
      }
      ```

   5. wacher中的addDep

      ```js
      // watcher.js
      constructor(vm, exprOrfn, cb = () => {}, opts = {}) {
        this.cb = cb
        this.deps = []
        this.depsId = new Set()
      }
      update() { // 更新方法
        this.get()
      }
      addDep(dep) { // 同一个watcher 不应该重复记录dep
        let id = dep.id // Dep中构造函数的id
        // 让watcher 记住当前的dep
        if (!this.depsId.has(id)) {
          this.depsId.add(id)
          // 让watcher记住当前的dep
          this.deps.push(dep)
          // 在dep中订阅不同的watcher
          dep.addSub(this)// 相当于 dep.addSub(watcher)
        }
      }
      ```

   6. ```js
      // util.js  设置的时候有点小问题
      compilerText(node, vm) {
        if (!node.expr) {
          // 1. 给属性新增一个自定义属性 为了方便后续的更新操作
          node.expr = node.textContent
        }
        node.textContent = node.expr.replace(defaultRE, function (...args) {
          return util.getValue(vm, args[1])
        })
      }
      ```

   7. 批量更新防止重新渲染

       ```js
      class Watcher {
          update() {
            // 1.
              // this.get() // 重复设置属性 会多次get刷新 同一个属性所以要批量操作 防止重复创新
              queueWatcher(this)
          }
          run() {
              console.log('调用1次更新方法')
              this.get();
          }
      }
      // 2.1
      let has = {}
      let queue = []
      function flusQueue() {
          queue.forEach(watcher => watcher.run())
          has = {}
          queue = []
      }
      // 2.
      function queueWatcher(watcher) {
          let id = watcher.id
          if (has[id] == null) { // 取不到值是undefined和null都是false
              has[id] = true
              queue.push(watcher)
          }
          // setTimeout(flusQueue, 0)
          // 异步等待所有同步方法执行完毕 调用次方法
          nextTick(flusQueue)
      }
      
      let callbacks = []
      // 5.
      function flushCallbacks() {
          callbacks.forEach(cb => cb())
      }
      // 3.
      // cb就是 flusQueue
      function nextTick(cb) {
          callbacks.push(cb) // 因为此方法可以单独调用 所有放到数组
      		// 4.
          let aysncFn = () => {
              flushCallbacks();
          }
          // 使用异步的各种方法  执行顺序
          // 微任务:promise mutationObserver  宏任务: setImmediate setTimeout
          // 6.
          if (Promise) {
              Promise.resolve().then(aysncFn)
          }
          if (MutationObserver) {
              let observe = new MutationObserver(aysncFn)
              let textNode = document.createTextNode(1)
              observe.observe(textNode, {
                  characterData: true
              })
              textNode.textContent = 2
              return
          }
          if (setImmediate) {
              return setImmediate(aysncFn)
          }
          setTimeout(aysncFn, 0)
      }
      ```

   8. 数组方法的重新 只能实现了新增和修改属性的监听  没有实现每个属性的依赖收集

      ```js
      //  observe.js 
      // 1. 给数组创建dep并且每个对象添加__ob__属性(Observer)   
      this.dep = new Dep() // 此dep 专门为数组而设定的
      // 给每个对象 包含数组都添加一个__ob__属性 返回的当前observer实例
      Object.defineProperty(data, '__ob__', {
        get: () => this
      })
      // 2. 拿到数组的dep
       // childOb 是返回数组的dep
      let childOb = observe(value)
       // 如果有数组的dep收集依赖
      if (childOb) {
        childOb.dep.depend(); // 数组也收集了当前渲染watcher
        dependArray(value); // 收集儿子的依赖
      }
      ```

      ```js
      // 通知视图更新  array.js
      this.__ob__.dep.notify()
      ```

      ```js
      // observe.js
      if (data.__ob__) { // 已经被监控过了
        return data.__ob__
      }
      ```

      ```js
      // observe.js 多维数组的收集
      // 递归多维数组 收集依赖
      export function dependArray(value) {
          for (let i = 0; i < value.length; i++) {
              let currentItem = value[i] // 有可能是一个多维数组
              currentItem.__ob__ && currentItem.__ob__.dep.depend();
              if (Array.isArray(currentItem)) {
                  dependArray(currentItem) // 递归收集多维数组中依赖关系
              }
          }
      }
      ```

4. watch方法的实现

   ```js
   // 1.初始化
   if (opts.watch) {
      initWatch(vm)
   }
   // 3.
   function createWatcher(vm, key, handler) {
       // 内部最终也会使用$watcher方法
       return vm.$watch(key, handler);
   }
   // 2.
   function initWatch(vm) {
       let watch = vm.$options.watch; // 获取用户传入的watch属性
       for (let key in watch) { // msg(){} 有能是多个
           let handler = watch[key]
           createWatcher(vm, key, handler)
       }
   }
   ```

   ```js
   Vue.prototype.$watch = function (key, handler) {
     // 原理 创建一个watcher
     let vm = this
     new Watcher(vm, key, handler, {
       user: true // 用户自定义watcher
     })
   }
   ```

   ```js
   if (typeof exprOrfn === 'function') {
     this.getter = exprOrfn
   } else {
     // 1. 现在exprOrfn是我们调用watcher方法传进来的key 需要获取相对应的值
     this.getter = function () {
       return util.getValue(vm, exprOrfn)
     }
   }
   // 2. 标识是用户自己写的watcher
   if (opts.user) {
     this.user = true
   }
   // 3. 创建watcher的时候 现将表达式对应的值取出来 就是老值
   this.value = this.get(); // 默认创建的watcher会调用自身的get方法 渲染更新
   get() {
     pushTarget(this) 
     // 4. 获取值
     let value = this.getter(); 
     popTarget() 
     return value // 并返回
   }
   run() {
     // 5. 更新后的新值 不相同给cb也就是msg()
     let value = this.get(); 
     if (this.value !== value) {
       this.cb(value, this.value)
     }
   }
   ```

5. computed实现

   ```js
   if (opts.computed) {
           initComputed(vm, opts.computed)
   }
   ```

   ```js
   function initComputed(vm, computed) {
       // 将计算属性的配置放到vm上  创建存储计算属性的watcher的对象
       let watchers = vm._watchersComputed = Object.create(null);
       for (let key in computed) {
           let userDef = computed[key];
           watchers[key] = new Watcher(vm, userDef, () => {}, {
               lazy: true // 计算属性watcher 默认刚开始这个方法不会执行
           })
           // 将key定义到vm上
           Object.defineProperty(vm, key, {
               get: createComputedGetter(vm, key)
           })
       }
   }
   ```

   ```js
   // 用户取值时调用此方法
   function createComputedGetter(vm, key) {
       // 这个watcher 就是我们定义的计算属性
       let watcher = vm._watchersComputed[key]
       return function () {
           if (watcher) {
               // 如果dirty 是fasle的话 不需要重新执行计算属性中的方法
               if (watcher.dirty) {
                   // 如果页面取值 而且dirty是true 就会去调用watcher的get方法
                   watcher.evaluate()
               }
               //  watcher中存着 td  msg 
               if (Dep.target) { // watcher就是计算属性 watcher
                   watcher.depend()
               }
               return watcher.value
           }
       }
   }
   ```

   ```js
   // 获取到计算属性刷新
   evaluate() {
     this.value = this.get()
     this.dirty = false;
   }
   get() {
     pushTarget(this) 
     let value = this.getter.call(this.vm); // 让函数(updateComponent)执行
     popTarget()
     return value
   }
   ```

   ```js
   // 如果当前我们是计算属性的话 不会默认调用get方法
    this.value = this.lazy ? undefined : this.get(); // 默认创建的watcher会调用自身的get方法 渲染更新
   ```

   ```js
   update() {
     // this.get() // 重复设置属性 会多次get刷新 同一个属性所以要批量操作 防止重复创新
     if (this.lazy) { // 如果是计算属性
       this.dirty = true
     } else {
       queueWatcher(this)
     }
   }
   ```

## 2. DOM-diff

1. js对象模拟DOM中的节点

   ```js
   // 1. 创建虚拟DOM
   h('div', {
       id: 'wrapper',
       a: 1,
       key: 'xxx'
   }, h('sapn', {
       style: {
           color: 'red'
       }
   }, 'hello'), 'td')
   ```

   ```js
   // 2. vdom/index.js
   import h from './h'
   export {
       h
   }
   ```

   ```js
   // 3. h.js
   /**
    * @param {*} type  节点
    * @param {*} props 节点属性
    * @param  {...any} children  所有孩子
    */
   import {vnode} from './vnode'
   export default function createElement(type, props = {}, ...children) {
     // 4. 获取属性的key 然后删掉
       let key;
       if (props.key) {
           key = props.key;
           delete props.key
       }
       // 5. 将不是虚拟节点的子节点 变成虚拟节点
       children = children.map(child => {
           if (typeof child === 'string') {
               return vnode(undefined, undefined, undefined, undefined, child)
           } else {
               return child
           }
       })
       return vnode(type, props, key, children)
   }
   ```

   ```js
   // 6.vnode.js
   export function vnode(type, props, key, children, Text) {
       return {
           type,
           props,
           key,
           children,
           Text
       }
   }
   ```

2. 渲染虚拟DOM

   ```js
   // 1. index.js
   render(vnode, app)
   ```

   ```js
   // 2. patch.sj
   xport function render(vnode, container) {
       // 通过这个方法可以将虚拟节点转化为真实节点
       let ele = createDomElementFromVnode(vnode)
       //  插入到容器
       container.appendChild(ele)
   }
   // 通过虚拟节点创建一个真实的DOM节点
   function createDomElementFromVnode(vnode) {
       let {
           type,
           key,
           props,
           children,
           text
       } = vnode
       // 传递了类型 说明是一个标签
       if (type) {
           // 建立虚拟节点和真实元素一个关系 后面可以用来更新真实DOM
           vnode.domElement = document.createElement(type)
       } else {
           // 文本
           vnode.domElement = document.createTextNode(text)
       }
       return vnode.domElement
   }
   ```

   ```js
   // 创建完真实DOM节点 根据当前的虚拟节点的属性 更新真实的dom元素
   if (type) {
     // 建立虚拟节点和真实元素一个关系 后面可以用来更新真实DOM
     vnode.domElement = document.createElement(type)
     updateProperties(vnode) // 1. 根据当前的虚拟节点的属性 去更新真实的DOM元素
   } else {
     vnode.domElement = document.createTextNode(text)
   }
   ```

   ```js
   // 2. 后续对象的时候 会根据老的属性和新的属性 重新更新节点
   function updateProperties(newVnode, oldProps = {}) {
       let domElement = newVnode.domElement // 真实的DOM元素
       let newProps = newVnode.props // 当前虚拟节点中的属性
       // 3. 老的里面有 新的里面没有 这个属性被移除了
       for (let oldPropName in oldProps) {
           if (!newProps[oldPropName]) {
               delete domElement[oldPropName]
           }
       }
       // 4. 如果老的里面没有 新的里面有
       for (let newPropsName in newProps) {
           domElement[newPropsName] = newProps[newPropsName]
       }
       // console.log(domElement.a)
   }
   ```

   ```js
   // 如果属性是style
   for (let newPropsName in newProps) {
     // 6. 如果当前是style属性 取出来赋值给真实的DOM元素
     if (newPropsName == 'style') {
       let styleObj = newProps.style;
       for (let s in styleObj) {
         domElement.style[s] = styleObj[s];
       }
     } else {
       domElement[newPropsName] = newProps[newPropsName]
     }
   }
   ```

   ```js
   // 如果新的里面有style 老的里面也有style style有可能还不一样 老的有background新的里面咩有
   let newStyleObj = newProps.style || {}
   let oldStyleObj = oldProps.style || {}
   for (let propName in oldStyleObj) {
     if (!newStyleObj[propName]) {
       // 老dom元素上跟新之后 没有某个样式需要删除
       document.style[propName] = ''
     }
   }
   ```

   ```js
   // 递归调用render()渲染子节点
   vnode.domElement = document.createElement(type)
   updateProperties(vnode)
   // children中放的也是一个个的虚拟节点 递归调用渲染
   children.forEach(childVnode => render(childVnode, vnode.domElement))
   ```

3. 新老节点对比

   ```js
   let oldVnode = h('div', {
       id: 'wrapper',
       a: 1,
       key: 'xxx',
       style: {
           color: 'red'
       }
   }, h('sapn', {
       style: {
           color: 'red'
       }
   }, 'hello'), 'td')
   
   render(oldVnode, app)
   
   let newVnode = h('a', {}, 'hello word')
   
   setTimeout(() => {
       patch(oldVnode, newVnode)
   }, 2000);
   ```

   ```js
   export function patch(oldVnode, newVnode) {
       // 1. 类型不同
       if (oldVnode.type !== newVnode.type) {
           return oldVnode.domElement.parentNode.replaceChild(
               createDomElementFromVnode(newVnode), // 创建新的DOM
               oldVnode.domElement // 老的DOM
           )
       }
       // 2. 类型相同 换文本
       if (oldVnode.text) {
           if (oldVnode.text == newVnode.text) return
           return oldVnode.domElement.textContent = newVnode.text
       }
   }
   ```

   ```js
   // 类型一样 并且是标签 需要根据新节点的属性 更新老节点的属性
   let domElement = newVnode.domElement = oldVnode.domElement;
   // 根据最新的虚拟节点来更新属性
   updateProperties(newVnode, oldVnode.props)
   ```

   ```js
   // 三种情况
   // 1.老的有儿子 新的有儿子
   // 2.老的有儿子 新的没儿子
   // 3.新增了儿子
   let oldChildren = oldVnode.children;
   let newChildren = newVnode.children;
   // 1.老的有儿子 新的有儿子
   // 2.老的有儿子 新的没儿子
   // 3.新增了儿子
   if (oldChildren.length > 0 && newChildren.length > 0) {
     updateChildren(domElement, oldChildren, newChildren)
   } else if (oldChildren.length > 0) {
     domElement.innerHTML = ''
   } else if (newChildren.length > 0) {
     for (let i = 0; i < newChildren.length; i++) {
       domElement.appendChild(createDomElementFromVnode(newChildren[i]))
     }
   }
   ```

   ```js
   // 两个节点对比
   function isSomeVnode(oldVnode, newVnode) {
       return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type
   }
   // diff 最复杂的列表
   function updateChildren(parent, oldChildren, newChildren) {
       let oldStartIndex = 0
       let oldStartVnode = oldChildren[0]
       let oldEndIndex = oldChildren.length - 1
       let oldEndVnode = oldChildren[oldEndIndex]
   
       let newStartIndex = 0
       let newStartVnode = newChildren[0]
       let newEndIndex = newChildren.length - 1
       let newEndVnode = newChildren[newEndIndex]
   
       // 判断老的孩子和新的孩子 循环的时候 谁先结束就停止循环
       while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
           if (isSomeVnode(oldStartVnode, newStartVnode)) {
               // 如果标签相同 调用patch方法 让他们去对比属性
               patch(oldStartVnode, newStartVnode)
               // 如果他们俩相同 分别往后移一位
               oldStartVnode = oldChildren[++oldStartIndex]
               newStartVnode = newChildren[++newStartIndex]
           }
       }
   }
   ```

   ```js
   while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
           // 头部一样 
           if (isSomeVnode(oldStartVnode, newStartVnode)) {
               // 如果标签相同 调用patch方法 让他们去对比属性
               patch(oldStartVnode, newStartVnode)
               // 如果他们俩相同 分别往后移一位
               oldStartVnode = oldChildren[++oldStartIndex]
               newStartVnode = newChildren[++newStartIndex]
           } else if (isSomeVnode(oldEndVnode, newEndVnode)) { // 尾部一样
               patch(oldEndVnode, newEndVnode)
               oldEndVnode = oldChildren[--oldEndIndex]
               newEndVnode = newChildren[--newEndIndex]
           }
       }
       // 把多余节点放进去  只有小于或者等于 才说明有剩余
       if (newStartIndex <= newEndIndex) {
           for (let i = newStartIndex; i <= newEndIndex; i++) {
               // parent.appendChild(createDomElementFromVnode(newChildren[i]))
               let beforeElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement;
               parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement)
           }
       }
   ```

   ```js
   
   ```

   







## 3. 面试题

1. MVMM

2. DOM-diff
3. 权限校验
4. 路由原理
5. 组件通信原理
6. 声明周期