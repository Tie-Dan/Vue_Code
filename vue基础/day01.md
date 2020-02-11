## 01.基础-现在的前端现状

- 开发人员大部分在用Vue开发
- Vue学习曲线相比其他框架简单很多

## 02.基础-了解什么是vue

> **`目标:`**坚定学习vue的信心
>
> - 目前前端**`必备`**技能
>
> - 传统方式已经不能适应目前越来越**`复杂`**的开发需求
>
> - 用vue的开发方式会简单、高效
>
>   三大框架(vue、react、angular)

## 03.基础-vue 能做什么

> **`目标:`**了解Vue能做什么
>
> 1. 不用操作DOM
> 2. 单页面应用web项目(SinglePageApplication 项目，例如<https://worktile.com/>）简称:SPA
> 3. 传统网站开发  一般来说  需求不大
> 4. 当下各种新框架都采用了类似Vue或者类似React的语法去作为主语法, 微信小程序/MpVue.....
>
> **`结论:`**掌握Vue的开发语法 相当于掌握了新的开发模式,可以适应目前绝大多数的技术环境

##  04.基础-vue 特点

> **`目标:`**了解Vue的特点 
>
> 1. 数据驱动视图  可以让我们只关注数据
> 2. MVVM 双向绑定 
> 3. 通过**`指令`**增强了html功能 
> 4. 组件化 复用代码
> 5. 开发者一般只需要关注数据

## 05.基础-Vue-API

> **`目标:`** 知道如何查阅文档
>
> [Vue官方文档](https://cn.vuejs.org/)
>
> [Vue开源项目汇总](https://github.com/opendigg/awesome-github-vue)
>
> [Vue.js中文社区](https://www.vue-js.com/)
>
> - 所有关于Vue的问题都可以通过**查阅文档**解决
>
> **`任务:`** 学会Vue官网官方文档 查阅资料

## 06.基础-vue 三种安装方式

> **`目标`**: 了解采用几种方式安装vue
>
> 1. 直接下载源码然后通过路径引入
>
>    - 开发版本：https://vuejs.org/js/vue.js
>    - 生产版本：https://vuejs.org/js/vue.min.js
>
> 2. 在线cdn引入的方式
>
>    ```js
>    <script  src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
>    ```
>
> 3. 采用 npm 安装的方式 
>
>    ```js
>    // 现状: 都会采用npm的方式来进行正式项目开发
>    npm install vue 
>    ```
>
> **`注意:`**  ` Vue.js 不支持 IE8 及其以下版本`
>
> **`任务`**: 
>
> 1. 下载一个vue.js
> 2. 新建一个html页面
> 3. 在页面中引入vue.js

## 07.基础-HelloWorld

> **`目标`** 掌握如何在页面中实例化 一个Vue对象	
>
> **`步骤`**:
>
> ```html
> 1. body中,设置Vue管理的视图<div id="app"></div>
> 2. 引入vue.js
> 3. 实例化Vue对象new Vue();
> 4. 设置Vue实例的选项:如el、data...     
> 	new Vue({选项:值});
> 5. 在<div id='app'></div> 中通过{{ }}使用data中的数据
> ```
>
> ```js
> // 1.我是Vue所管理的视图div #app 
> <div id="app">
>     // 5.在视图里使用Vue实例中data里面的list数据
>     <p>{{list}}</p>
> </div>
> // 2.引入vue.js 
> <script src="./vue.js"></script>
> <script>
>     // 3.实例化Vue对象
>     new Vue({
>     // 4.设置Vue实例的选项：如el、data...  
>         el: '#app',
>         data: {
>             list: '我是模拟发起ajax请求后从服务端返回的数据'
>         }
>     })
> </script>
> ```
>
> **`任务`**:  
>
> 1. 用vue语法 在html页面中 将hello world显示在页面上

## 08.基础-实例选项-el

> **`目标`**:了解 Vue实例中el选项的含义
>
> - 作用:当前Vue实例所管理的html视图
> - 值:通常是id选择器(或者是一个dom对象)
> - **注意！！！！**不要让el所管理的视图是html或者body!!!!
>
> **`路径:`**
>
> ```js
> new Vue({
>     // el: '#app' ,  id选择器
>     // el: '.app',   class选择器
>     el: document.getElementById("#app") // dom对象
> })
> ```
>
> **`任务:`**
>
> 1. 尝试用 id选择器   设置el 页面显示hello world
> 2. 尝试用class选择器 设置el 页面显示hello world
> 3. 尝试用dom对象  设置el 页面显示hello  world
> 4. 尝试设置html 或者body为el 查看效果 

## 09.基础-实例选项-data

> **`目标`**: 掌握data基本用法
>
> > Vue 实例的data(数据对象)，是响应式数据(数据驱动视图)
>
> 1. data中的值{数据名字:数据的初始值}
> 2. data中的数据msg/count 可以在视图中通过{{msg/count}}访问数据
> 3. data中的数据也可以通过实例访问 vm.msg或者vm.$data.msg
>
> 4. data中的数据特点:响应式的数据->data中的数据一旦发生变化->视图中使用该数据的位置就会发生变化
>
> **`路径`**
>
> ```js
> let vm = new Vue({
>     el: "#app",
>     data: {
>        msg: 'abc',
>        count: 100
>        list: [1, 2, 3]
>     }
> })
> vm.msg = 200
> console.log(vm)
> console.log(vm.msg)
> console.log(vm.$data.msg)
> ```
>
> **`任务`**
>
> 1. 将数据对象中count初始值设置为100
> 2. 通过vm.属性的方式打印 以上三个属性
> 3. 通过 {{ 变量名 }} 的方式 将以上三个属性显示在页面上
> 4. 通过vm.属性 = 赋值的方式，改变 count 为300、msg为"铁蛋儿最帅"、数组为 [1,2,3,4]

## 10.基础-实例选项-methods

> **目标**: 掌握实例选项methods中方法的使用及注意事项
>
> - methods其值为一个对象
> - 可以直接通过 VM 实例访问这些方法，或者在**指令表达式中使用**。
> - 方法中的 `this` 自动绑定为 Vue 实例。
> - methods中所有的方法 同样也被代理到了 Vue实例对象上,都可通过this访问
> - 注意，**不应该使用箭头函数来定义 method 函数**。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例
>
> ```js
> let vm =new Vue({
>  el:"#app",
>  data:{
>      name:"Hello world",
>      name2:"Hello world2"
>  },
>  methods:{
>      // 常规函数写法
>      fn1:function(){
>          console.log(this.name)
>          this.fn2()
>      },
>      // es6 函数简写法
>      fn2() {
>          console.log(this.name2)
>      }
>  }
> })
> ```
>
> **`任务:`** 
>
> 1. 实例化一个Vue实例, 
> 2. 定义两个属性 name1 name2 初始值分别为  Hello world   Hello world2
> 3. 定义两个方法 fn1 fn2  两个方法中分别输出 name1 和 name2的值
>
> **`路径:`** 参照代码示例

## 11.基础-术语解释-插值表达式(重要)

> **`目标`**: 理解和使用插值表达式

> 作用:会将绑定的数据实时的显示出来
>
> 形式: 通过 **`{{ 插值表达式 }}`**包裹的形式 
>

> 用法:{{js表达式、三元运算符、方法调用等}}

- {{ a }}
- {{a == 10 }}
- {{a > 10}}
- {{a + b + c}}
- {{a.split('').reverse().join('')}}
- {{a > 0 ? "成功" : "失败"}}

```js
// 错误写法
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

```js
// 正确写法
<!-- js表达式 -->
<p>{{ 1 + 2 + 3 }}</p>
<p>{{ 1 > 2 }}</p>
<!-- name为data中的数据 -->
<p>{{ name + ':消息' }}</p> 
<!-- count 为data中的数据 -->
<p>{{ count === 1 }}</p>
<!-- count 为data中的数据 -->
<p>{{ count === 1 ? "成立" : "不成立" }}</p>
```

```html
<!-- 方法调用 -->
<!-- fn为methods中的方法 -->
<p>{{ fn() }}</p>
```

> **`任务`**
>
> 1. 初始化一个Vue实例
> 2. 在data中定义 name: "张三"  count: 2 , list:'123'
> 3. 要求根据data中的数据用插值表达式输出 张三,  2, 321,   
>
> **`路径`** 参照代码示例

## 12.基础-术语解释-指令(重要)

> **`目标`**:了解指令的基本含义 并应用一个指令
>
> - 指令 (Directives) 是带有 `v-` 前缀的特殊特性。
> - 指令特性的值预期是**单个 JavaScript 表达式**(`v-for` 是例外情况，稍后我们再讨论)。
> - 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。
> - 指令位置:  起始标签
>
> 代码示例:
>
> ```html
> <p v-text="name">内容</p>
> ```
>
> **`任务`**: 
>
> 1. 初始化一个Vue实例
> 2. 定义一个data属性 name: 我是内容
> 3. 使用v-text指令将data内容显示在p标签上
>
> **`路径`** 参照代码示例

## 13.基础-系统指令-v-text和v-html

> **`目标`**:掌握如何使用v-text 和 v-html用法和区别
>
> - 很像innerText和innerHTML
>
> - v-text:更新标签中的内容
> - v-text和插值表达式的区别
>   - v-text  更新**`整个`**标签中的内容
>   - 插值表达式: 更新标签中局部的内容
> - v-html:更新标签中的内容/标签
> - 可以渲染内容中的html标签
> - 注意:尽量避免使用，容易造成危险 (XSS跨站脚本攻击)
>
> ```html
> <div id="app">
>   <!-- v-text指令的值会替换标签内容 -->
>   <p>{{str}}</p>
>   <p v-text="str"></p>
>   <p v-text="str">我是p标签中的内容</p>
>   <p v-text="strhtml">我是p标签中的内容</p>
>   <!-- v-html指令的值(包括标签字符串)会替换掉标签的内容 -->
>   <p v-html="str"></p>
>   <p v-html="strhtml">我是p标签中的内容</p>
> </div>
> <script src="./vue.js"></script>
> <script>
>   new Vue({
>       el: '#app',
>       data: {
>           str: 'abc',
>           strhtml: '<span>content</span>'
>       }
>   });
> </script>
> ```
>
> **`任务`**
>
> 1. 初始化一个vue实例
> 2. 定义一个 数据对象 name: 张三
> 3. 分别使用v-text和插值表达式将张三显示在p标签上
> 4. 定义一个数据对象 nameHtml: 内容,使用v-html将内容显示在p标签上,并且内容为红色
>
> **`路径`** 参照代码示例

## 14.基础-系统指令-v-if 和 v-show

> **`目标`**:掌握条件渲染指令的两种方式
>
> 使用: v-if 和 v-show 后面跟着表达式的值是布尔值 ，布尔值来决定该元素显示隐藏
>
> **注意** : v-if 是直接决定元素 的 添加 或者删除  而 v-show 只是根据样式来决定 显示隐藏
>
> - `v-if`    有更高的切换开销
> -  `v-show` 有更高的初始渲染开销。
>
> 如果需要非常频繁地切换，则使用 `v-show` 较好.
>
> 如果在运行时条件很少改变，则使用 `v-if` 较好.
>
> **`任务`**:
>
> 1. 定义一个Vue实例
> 2. 定义一个布尔型变量isShow
> 3. 分别使用v-if 和 v-show来条件渲染 P标签内容
>
> **`路径`** 参照代码示例

## 15.基础-系统指令-v-on绑定事件

> **`目标:`**掌握vue绑定事件的方式
>
> - **使用:** 
>
>   -  第一种:v-on:事件名="方法名"   
>   -  第二种:@事件名="方法名"的方式
>
> ```js
> // v-on:xx事件名='当触发xx事件时执行的语句' 
> <button v-on:click="fn">按钮</button>
> // v-on的简写方法 
> <button @click="fn">按钮</button>
> ```
>
> - **修饰符**
>   - 使用:@事件名.修饰符="方法名"
>     - `.once` - 只触发一次回调
>     - `.prevent` - 调用 `event.preventDefault()` 阻止默认事件
>
> ```js
> // v-on修饰符 如 once: 只执行一次
> <button @click.once="fn">只执行一次</button>
> // v-on修饰符 如 prevent: 阻止默认事件
> <button @contextmenu.prevent` ="fn">阻止默认事件</button>
> ```
>
> - **事件对象**(扩展)
>   - 第一种:方法名中采用$event的方式传形参 
>   - 第二种:**直接写事件名**  默认第一个参数为event事件参数
>
> **`任务`**: 
>
> 1. 初始化一个Vue实例，
>
> 2. 添加一个button按钮
>
> - 定义data中 name  为hello world
> - 注册button点击事件 获取当前data对象中的name值 输出
>
> 3. 添加一个 input文本框  
>
> - 注册input值改变事件 值改变时获取 文本框内容(扩展）

> **`路径`**(参考任务代码)

## 16.基础-系统指令-v-for(数组)

> **`目标`**:掌握v-for循环数组的用法 
>
> - `v-for` 指令基于一个数组来渲染一个列表
>
> - `v-for` 语法 `item in items` 或者 `item of items` 
>
> - 其中 items 是源数据数组  而 item 则是被迭代的数组元素的别名。
>
>   ```js
>    // 第一种用法：
>   <ul>
>     <li v-for="item in items">
>       {{ item.name }}
>     </li>
>   </ul>
>   
>   // data中的数组
>   data: {
>       items: [
>         { name: '大娃' },
>         { name: '二娃' }
>       ]
>   }
>   ```
>
>   ```js
>   // 第二种用法: v-for 还支持一个可选的第二个参数，即当前项的索引
>   <ul>
>     <li v-for="(item, index) in items">
>        {{ index }} {{ item.name }}
>     </li>
>   </ul>
>   ```
>
> **`注意`**： v-for写的位置 应该是重复的标签上  不是其父级元素上 需要注意
>
> **`任务`**: 
>
> 1. 初始化一个Vue实例
> 2. 定义data对象中list:['北京','上海','天津']
> 3. 将list中的内容 v-for循环在li标签上显示
>
> **`路径`**参照代码示例

## 17.基础-系统指令-v-for（对象）

> **`目标`**:掌握v-for循环对象的用法 
>
> 第一种用法:
>
> ```js
> // items 为对象  item为当前遍历属性对象的值
> v-for="item in items"
> ```
>
> 第二种用法:
>
> ```js
> //item为当前遍历属性对象的值  key为当前属性名 index为当前索引的值
> v-for="(item, key, index) in  items"   
> ```
>
> **`任务`**: 
>
> 1. 初始化一个Vue实例
> 2. 定义data对象中 person: { name: '张三', sex:'男',age: 18 }
> 3. 将person中的内容 v-for循环在li标签上显示
>
> **`路径`**参照代码示例

## 17.基础-系统指令-v-for（key属性）（非常重要的面试题）

> **`目标:`** 掌握在 v-for循环中key的使用
>
> **`场景:`** 列表数据变动会导致  视图列表重新更新  为了提升性能  方便更新 需要提供一个属性 key
>
> ```js
> //  使用v-for时 建议给每个元素设置一个key属性 （必须加上）
> //  key属性的值 要求是每个元素的唯一值 （唯一索引值）
> //  好处:vue渲染页面标签 速度快
> 
> // 数组
> <li v-for="(v,i) in arr" :key="i">{{v}}</li>
> // 对象
> <li v-for="(v,k,i) in json" :key="i">{{v}}-{{k}}</li>
> ```
>
> **`任务:`**
>
> 1. 初始化一个Vue实例
> 2. 定义data对象中list:['北京','上海','天津']
> 3. 将list中的内容 v-for循环在li标签上显示
> 4. 给每个li标签赋值key
>
> **`路径:`**参照代码示例

## 18.基础-表格案例-效果演示

> **`目标`**通过分析页面需求,提取案例功能点
>
> 功能点:  
>
> 1. 添加商品
> 2. 删除商品
> 3. 搜索商品
> 4. 列表循环 
> 5. 数据不存在 显示不存在数据
> 6. 时间格式

## 19.基础-表格案例-列表渲染

> **`目标：`**完成表格案例的列表渲染
>
> **`路径：`**
>
> 1. 静态页面准备
> 2. 实例化一个Vue
> 3. 定义表格数据
> 4. 采用v-for 循环将静态内容切换为动态内容
> 5. 采用v-if控制提示消息
>
> 具体参考代码实现 