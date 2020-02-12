## 01.基础-系统指令-v-bind基本用法

> **`目标:`**掌握v-bind是绑定属性的用法
>
> - 作用: 绑定标签上的任何属性
> - 场景: 当标签上的属性是变量/动态/需要改变的 
> - 用法:
>
> ```html
> // ID为数据对象中的变量值 
> <p v-bind:id="ID"></p>   
> // 简写
> <p :id="ID"></p>  
> ```
>
> **`任务`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个data属性 ID:‘obox’   (style里面给obox添加样式)
> 3. 将id属性绑定给到p标签id属性

## 02.基础-系统指令-v-bind绑定class(对象)

> **`目标`** 掌握v-bind绑定class的对象语法
>
> **`用法:`** 绑定class对象语法  :class="{ class名称: 布尔值}"
>
> ```html
> <p class="obox" :class="{obox:isBn}">内容</p>  // isBn为 data选项中的属性
> ```
>
> **`注意`**: 绑定class和原生class会进行合并(但是不会合并重复的)
>
> **`任务`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个p标签 原有class 为left
> 3. 使用v-bind对象语法将class变为 left right
>
> **`路径`**参照实现代码

## 03.基础-系统指令-v-bind-绑定class(数组)

> **`目标:`**掌握v-bind绑定class数组语法
>
> - 绑定class数组语法 :class="[a,b]"
> - a、b为data属性的key
> - data中key对应的value 为class名字
>
> ```html
> <p :class="[a,b]">内容</p>
> 
> data:{
> 	a:'obox'，
> 	b:'left'
> }
> ```

> **`任务:`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个p标签 原有class 为def
> 3. 使用v-bind数组语法将class变为 def  obox
>
> **`路径`**参照实现代码

## 04.基础-系统指令-v-bind-绑定style（对象）

> **`目标`**:掌握v-bind绑定style对象语法
>
> **`语法`**:style="{css属性名:属性值}"
>
> ```html
> <p :style="{color:a,fontSize:b}"></p> 
> 
> //a、b为data属性的key
> data: {
>  a: 'red',
>  b: '30px'
> },
> ```
>
> **`注意`**  css属性名 例如 font-size要写成 fontSize  以此类推   原有的style会覆盖
>
> **`任务`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个p标签 原有样式 为字体红色
> 3. 使用v-bind绑定对象语法 将字体大小设置为48px 
>
> **`路径`**参照实现代码

## 05.基础-系统指令-v-bind-绑定style（数组）

> **`目标`** 掌握v-bind绑定style的数组语法
>
> ```js
> // 语法: 
>  <div :style="[a,b]"></div>   
> // a,b 为data的属性
> data: { 
>      a: { color: "red" },
>      b: { fontSize: "30px" } 
> }
> ```
>
> **注意** 对象可以是多个属性的 集合  同样里面的css属性需要遵从小驼峰命名的规则
>
> **`任务`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个p标签 原有样式 为字体红色
> 3. 使用v-bind绑定数组语法 将字体大小设置为48px ,加粗
>
> **`路径`**参照实现代码

## 06.基础-系统指令-v-model-基础用法

> **`目标`:**掌握v-model的基础用法
>
> **作用:** 表单元素的绑定
>
> **特点:** **双向数据绑定**
>
> - 数据发生变化可以更新到界面
> - 通过界面可以更改数据
> - `v-model` 绑定表单元素，会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值 
> - 表单元素会将 Vue 实例的data中的数据作为数据来源，所以应该在 `data`选项中声明初始值。
>
> ```js
> // 表单中设置value值没用 v-model会忽略
> <input type="text" v-model="msg"  value="zhang">
> <p>{{msg}}</p>
> // 在data中设置msg
> data: {
> msg: 'zhangsan'
> }
> ```
>
> **`任务`**
>
> 1. 实例化一个Vue实例
> 2. 定义一个数据对象 name:张三
> 3. 使用v-model实现 input和p标签的数据双向同步
>
> **`路径`**参照实现代码

## 07.基础-系统指令-v-model-原理及实现

> **`目标`**:掌握 v-model的实现原理,
>
> **`分析`**   
>
> - 表单元素绑定的数据改变 => data数据发生改变=> 页面数据变化
>
> ```js
> <p>{{msg}}</p>
> <input type="text" :value="msg" @input="fn($event)">
> ```
>
> ```js
> data: {
>      msg: 'abc'
> },
> methods: {
>     fn(e) {
>     	//msg=最新的value
>     	this.msg = e.target.value
>     }
> }
> ```
>
> **`任务`**: 
>
> 1. 实例化一个Vue实例
> 2. 通过v-on指令和 v-bind指令组合实现v-model效果
>
> **`路径：`**
>
> 1. 绑定动态属性value 
>
> 2. 绑定input事件 监控value改变
>
> 3. 通过事件对象$event 实时获取input的value值
> 4. 通过事件对象获取到value值  赋值给data中绑定的属性

## 08.基础-系统指令-v-model-绑定其他表单元素

> **`目标:`**掌握 v-model绑定其他表单元素的方式
>
> 表单元素:  input  textarea checkbox radio  select 
>
> **`注意`**  checkbox在input标签中需要给定value值
>
> **`任务`**:
>
> 1. 实例化一个Vue实例
> 2. input 绑定 属性 nameInput,实现input同步
> 3. textarea 绑定 属性 nameTextArea 实现textarea同步 
> 4. checkbox 绑定一个属性 nameCheckbox 实现 checkbox同步   
> 5. 多个 checkbox绑定同一个属性 nameCheckboxs 实现 checkbox同步   北京 上海 天津
> 6. radio 绑定属性 nameRadio 实现同步  男 女 
> 7. select  绑定属性 nameSelect 实现同步  北京 上海 天津 
>
> **`路径:`**<https://cn.vuejs.org/v2/guide/forms.html>

## 09.基础-系统指令-v-cloak

> **`目标:`**v-cloak解决页面闪烁问题
>
> **`场景:`** 解决页面初次渲染时 页面模板闪屏现象
>
> ​       1. 写入v-cloak指令
>
> ​       2. 在style里面加给v-cloak加上display: none;
>
> **`注意:`**  避免多次写入标签 可以一次性 将v-cloak引用在实例视图上  
>
> ```html
> <style>
>  [v-cloak] {
>      display: none;
>  }
> </style>
> <div id="app" v-cloak>
>  {{msg}}
> </div>
> ```
>
> **`任务:`**
>
>  1. 使用v-cloak解决页面闪烁问题

## 10.基础-系统指令-v-once

> **`目标:`** 使用v-once指令 页面视图只渲染一次
>
> **`作用:`** 指令所在元素只渲染一次  
>
> ```js
> <p v-once>{{msg}}</p>
> <input type="text" v-model="msg">
> ```
>
> **`任务:`**
>
> 1. 使用v-once标记标签P
> 2. 测试更新数据时 p标签是否会渲染

## 11.基础-表格案例-添加商品

> **`目标:`** 实现在表格案例中 添加商品
>
> **`路径`**:  添加商品 
>
> ```js
> 1.  设置添加输入框的初始值
> 2.  给添加按钮绑定事件
> 3.  定义添加按钮的事件方法
> 4.  把输入框的值添加到list列表中
> 5.  清空输入框的内容
> ```

> **`任务:`**
>
> 1. 按照步骤实现添加商品的功能

## 12.基础-表格案例-删除商品

> **`目标:`**  实现在表格案例中 删除商品
>
> **`路径:`**  删除商品 
>
>            1. 给删除按钮绑定事件
>            2. 定义删除方法
>            3. 数组中删除元素
>               - 删除需要索引
>               - 删除方法传循环的索引值
>
> **`任务:`**
>
> 1. 按照步骤实现删除商品功能

## 13.基础-过滤器-过滤器的分析

> **`目标`**: 了解过滤器的功能和作用
>
> - 场景: data中的数据格式(日期格式/货币格式/大小写等)
>
>
> - 分类: 本地(局部)和全局  全局是所有实例均可使用0
>
> - 本地: 
>
> ```js
> // 组件的选项中定义本地的过滤器
> filters: {
>  过滤器名字:function (value) {
>      return ....
>  }
> }
> ```
>
> - 全局
>
> ```js
> // 如何注册一个全局过滤器
> Vue.filter("过滤器名字", function(value) {
> 	return ......
> });
> ```
>
> **`使用:`**
>
> ```js
> // 过滤器应该被添加在尾部 每个过滤器用管道符分隔
> // 第一种用法在双花括号中
> {{  数据 | 过滤器名字 }}
> 
> // 第二种用法在 `v-bind` 中
> <div v-bind:id="数据 |过滤器名字 "></div>
> ```
>
> **`任务:`**
>
> 1. 看过滤器API的用法https://cn.vuejs.org/v2/guide/filters.html>

## 14.基础-过滤器-过滤器的基本用法

> **`目标：`**掌握如何注册一个过滤器
>
> 1. 在创建 Vue 实例**`之前`**定义全局过滤器Vue.filter()
> 2. 在实例的filter选项中定义局部过滤器 
> 3. 在视图中通过{{数据 | 过滤器名字}}或者v-bind使用过滤器
>
> ```js
> // 如何注册一个全局过滤器
> Vue.filter("过滤器名字", function(value) {
> 	return value.charAt(0).toUpperCase() + value.substr(1);
> });
> // 如果注册一个局部过滤器
> filters: {
>  过滤器名字:function (value) {
>      return value.charAt(0).toUpperCase() + value.substr(1);
>  }
> }
> ```
>
> **`任务`**: 注册一个全局或者局部过滤器,实现 abc 转成 Abc的功能

## 15.基础-过滤器-传参数和串联使用

> **`目标`**掌握在过滤器中如何传参数和串行使用
>
> - 过滤器可以传递参数,接收的第一个参数永远是前面传递过来的过滤值
> - 过滤器也可以多个串行起来并排使用,
>
> ```js
> // 多个过滤器用 | 分割
> <p>{{count|a('元')|b}}</p> 
> // 定义过滤器
> filters：{
>    //  第一个参数永远是前面传递过来的过滤值
>     a:function(val,y){
>         // val 是count值
>         // y 是‘元’
>     }
> }
> ```
>
> **`任务`**:实现一个过滤器,假如是数字100过滤完出来是100元人民币
>
> **`要求:`** 
>
> ​	1.用到串行过滤器
>
> ​	2.用到过滤器参数传递
>
> **`路径`**参照实现代码

## 16.基础-表格案例-使用过滤器完成日期格式处理

> **`目标:`**利用所学过滤器知识 完成日期格式处理
>
> `路径`: 格式化需要借助第三方插件
>
> ​       1 . 引入第三方格式化日期插件  moment.js
>
> ​       2 . 定义格式化日期过滤器
>
> ​       3.  实现其格式化功能 
>
> ​       4 . 使用过滤器
>
> ```js
> // 全局过滤器代码
> Vue.filter("fmtDate", function (v) {
>    	return moment(v).format('YYYY-MM-DD h:mm:ss a')
> })
> ```
>
> **`路径`**: 参照实现代码

## 17.基础-ref属性-获取DOM

> **`目标:`**掌握如何通过ref来获取dom对象
>
> **`使用:`** 给元素定义ref属性, 然后通过$refs.名称 来获取dom对象
>
> ```html
> <input type="text" ref="txt">// 定义ref
> ```
>
> ```js
> // 获取DOM的value值
> methods: {
>     getVal() {
>        	//获取dom
>         console.log(this.$refs.txt)
>     }
> }
> ```
>
> **`任务`**  通过ref功能,点击按钮时获取input的value值 
>
> 1. 实例化Vue实例
> 2. 定义input的ref属性
> 3. 注册按钮事件
> 4. 按钮事件中通过ref获取input的value内容
>
> **`路径`**: 参照实现代码

## 18.基础-自定义指令-全局自定义指令

> **`目标：`**掌握如何全局自定义一个指令
>
> - 使用场景:需要对普通 DOM 元素进行操作，这时候就会用到自定义指令 
> - 分类:全局和局部
> - 全局自定义指令:
>
> 1. 在创建 Vue 实例之前定义全局自定义指令Vue.directive(参数1，参数2)
>
>    - 第一参数是指令名称
>    - 第二参数是一个对象
>      - 对象中要实现inserted方法
>      - inserted方法中的参数为当前指令 所在元素的DOM对象
>
>    ```js
>    // 1.注册一个自定义指令
>    Vue.directive( '指令名称' , { 
>         inserted(参数){  //参数为使用指令的DOM
>            //操作
>         }
>    })
>    // 2.使用自定义指令
>    <input type="text" v-指令名称>
>    ```
>
>    ```js
>    // 示例(全局自动聚焦的自定义指令)
>    Vue.directive("focus", {
>        inserted(dom) {
>            dom.focus();
>        }
>    });
>    // 使用自定义指令
>    <input type="text" v-focus>
>    ```
>
> **`任务`** 实现一个可以自动聚焦input的自定义指令v-focus
>
> **`路径`** 参照实现代码

## 19.基础-自定义指令-局部自定义指令

> **`目标:`**掌握如何自定义一个局部指令
>
> ```js
> //局部指令在vue实例内部定义
> directives: {
>     "focus": {
>           inserted(dom) {
>              dom.focus();
>           }
>     }
> }
> // 调用
> <input type="text" v-focus>
> ```
>
> **`任务`** 实现一个可以自动聚焦input的局部自定义指令v-focus
>
> **`路径`**参照实现代码

## 20.基础-表格案例-使用自定义指令完成自动获取焦点功能

> **`目标:`**根据所学自定义指定 实现表格案例 自动获取焦点功能
>
> **`路径:`**参照实现代码