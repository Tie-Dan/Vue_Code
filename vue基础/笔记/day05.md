## 01-基础-路由-vue-router-嵌套路由

> **`目标`** 掌握如何实现一个嵌套路由
>
> - 如果存在**`组件嵌套`**,就需要提供多个视图容器<router-view></router-view>
> - 同时,router-link和router-view 都可以添加类名、设定样式
>
> 
>
> ![路由嵌套](路由嵌套.png)
>
> **`路径:`**
>
> 1. 在原有的一级导航的template里面 配置 二级导航的router-link和router-view
> 2. 在相对应的一级导航路由配置选项children里面 配置 二级导航的路由和模板
>
> ```js
> path: '/music',
> component: Music,
> //子路由配置 在children选项
> children: [{
>     path: 'lx',
>     component: Lx
> },...]
> ```
>
> **`任务`** 
>
> 1. 实现一个嵌套路由   
> 2. 第一级路由为 首页 、音乐、体育
> 3. 音乐下 二级路由为古典、 流行、爵士

## 02.过度动画

> **`目标`**掌握过渡动画的基本使用
>
> - 基本用法就是给我们需要动画的标签外面嵌套**`transition`**标签 ,并且设置name属性
> - Vue 提供了 `transition` 的封装组件，列表中更新,移除，新增 情形中，可以给任何元素和组件添加进入/离开过渡
>
> > ```html
> > <transition name="fade"> 
> > 	<div v-show="isShow" class="box"></div>
> > </transition>
> > ```
>
> 6中class状态 ：
>
> 进入:
>
> 1. fade-enter：进入的 初始状态
> 2. fade-enter-to:  进入的 过渡结束状态（2.1.8版及以上）
> 3. fade-enter-active：进入的 过渡效果
>
> 离开:
>
> 1. fade-leave: 离开的 初始状态
> 2. fade-leave-to: 离开的 过渡结束状态（2.1.8版及以上）
> 3. fade-leave-active：离开的 过渡效果
>
> **`任务`**
>
> 1. 实现一个div 显示时 从小到大过渡
> 2. 实现该div隐藏时 从大到小

## 03-基础-vue-cli 工具-介绍

> **`目标:`**了解vue-cli是什么东西
>
> - 介绍: **`vue-cli`**是一个**`辅助开发工具`**=> **`代码编译`** + **`样式`** + 语法校验 + 输出设置 + 其他 ...
> - 作用: 可以为开发者提供一个**`标准的项目开发结构`** 和配置  **开发者**不需要再关注其他
> - vue-cli 一个**`命令行`**工具,最新版本也支持**`图形化`**操作,可快速搭建大型网页应用

## 04-基础-vue-cli-安装

> **`目标：`**掌握vue-cli的安装
>
> **`说明:`**vue-cli本质上是一个npm包,也需要通过npm去安装下载
>
> ```bash 
> npm i -g @vue/cli  // 全局安装脚手架  默认安装的最新版本 3.0+
> ```
>
> 安装完成后  可通过 **`vue命令`**来进行检查 脚手架是否安装成功
>
> 查看版本
>
> ```bash
> vue -V  // 查看脚手架版本号
> or 
> vue --version // 和上面等价 
> ```
>
> **`问题`:** 默认安装的3.0+ 版本,但是企业很多还在用2.0+版本 怎么破?
>
> 执行以下命令就可以 2.0 和 3.0 兼得 
>
> **`2.0和3.0创建项目的命令是不一样的`**
>
> ```bash
> npm install -g @vue/cli-init  // 安装桥接工具 将2.0的功能补齐到目前的脚手架上
> ```
>
> **`注意`:**  vue生成的模板的有难有易 
>
> - 简单业务 => 简易模板 
> - 复杂业务 => 内容丰富模板
>
> **`任务`**
>
> 1. 安装vue-cli

## 05-基础-vue-cli-创建项目

> **`目标:`** 学会使用vue-cli 创建项目
>
> **`注意:`**文件目路径不能有中文
>
> `创建:` 采用 cli 2.0的特性 (生成简易模板)
>
> ```bash
> # 1.heroes 创建的项目名称
> $ vue init webpack-simple heroes //  webpack-simple 为模板名称 固定写法
> # 2.切换到当前目录
> $ cd  heroes 
> # 3.安装依赖
> $ npm install  
> # 4.启动运行项目
> $ npm run dev
> ```
>
> **`创建：`**采用 cli 3.0 特性 (两种 默认 /选填)
>
> ```bash 
> # 3.0下创建项目
> $ vue create heroes // create(创建) 为关键字
> # 切换到当前目录
> $ cd  heroes 
> # 在开发模式下 启动运行项目
> $ npm run serve
> ```
>
> **注意** 3.0 +创建项目时  有两种模式, 一种**`默认模式`**, 一种选择模式,
>
> 默认模式:一种标准的模板
>
> 选择模式 可以根据自己的需求选择需要的工具和模式
>
> **`任务`**
>
> 1. 分别使用vue-cli 2.0 和 3.0特性创建一个叫做heroes的项目 
> 2. 分别启动运行

## 06-基础-vue-cli-项目目录解释

> **`目标:`**对2.0项目目录生成的模板文件进行识别认识
>
> .bablelrc=> 存放 babel编译的配置信息 () => es6 => es5 
>
> .editorconfig =>  存放编辑器的配置信息
>
> .gitignore =>  git忽略文件
>
> index.html =>  单页应用的html
>
> package.json =>  用于存放依赖信息 及 其他项目信息
>
> README.md =>  项目介绍信息 github上的页面信息
>
> webpack.config.js => wepack工具的配置文件 => webpack是一个前端工程化的工具  编译代码 -压缩代码- 处理代码,其他....
>
> **`注意:`**
>
> 一个vue页面通常由三部分组成:模板(template)、js(script)、样式(style)
>
> 我们关心的重点是src中的文件夹

## 07-基础-回顾-ES6 模块导入和导出

​	require和Es模块化的区别

## 08-基础-vue-cli-简化模板代码

> **`目标:`** 掌握认识 Vue-cli里面组件基本使用
>
> **`介绍:`** 在cli开发模式下, 一个*.vue文件就是一个组件
>
> - template 组件的页面结构 代表它的 html 结构 
>   - 必须在里面放置一个 html 标签来包裹所有的代码 
>   - 我们在其他地方写好了一个组件，然后就可以在当前template中引入
> - script  组件的逻辑结构及数据对象
>
> - style 组件的样式
>   - 就是针对我们的 template 里内容出现的 html 元素写一些样式 
>
> **`注意`**: vue-cli的作用就是让我们把精力放在业务编码上,一切准备的工作交给vue-cli去做
>
> **`任务`** 
>
> 1. 新建一个名为 Menu的组件 
> 2. 内容为 一个横向菜单   首页 新闻 体育 音乐
> 3. 菜单高60px  水平居中  字体大小为20px  颜色为 red  背景色 为 #CCCCCC
> 4. 实现组件在页面上展示

## 09-基础-heroes 案例-效果演示 

> **`目标`**演示示例项目的最终效果 拆分功能
>
> 英雄项目演示 =>  功能拆分 => 路由 => 嵌套路由 =>  列表 =>  新增 修改 删除  更新  

## 10-基础-heroes 案例-导入素材

> **`目标`**:将项目所需样式导入到项目中 
>
> - 安装 bootstrap固定版本
>
>   ```js
>   npm i  bootstrap@3.3.7
>   ```
>
> - 安装完成之后 ,在入口处引入js文件
>
>   ```js
>   import "./../node_modules/bootstrap/dist/css/bootstrap.css"; // 引入 
>   import "./assets/index.css"; // 引入index.css
>   ```

> **`问题:`**重启运行,发现bootstrap.css文件 运行报错 
>
> ```js
> //根据错误 需要在webpack.config.js增加对不识别文件的处理
> {
>     test: /.(ttf|woff2|woff|eot)$/,
>         loader: 'file-loader',
>             options: {
>                 name: '[name].[ext]?[hash]'
>             }
> }
> ```

## 11-基础-heroes 案例-提取公共组件-头部-侧边栏-列表

> **`目标`**:将静态内容的 头部 侧边栏 , 列表分别封装成Vue组件 ,并在视图中显示
>
> **`路径`** 提取组件
>
> 1. 新建vue文件
> 2. 拷贝html静态内容到 template中
> 3. 在app.vue中引入组件
> 4. 注册在app.vue的组件中 
> 5. 在app.vue的模板中使用注册组件 

## 12-基础-heroes 案例-路由功能

> **`目标:`**  在示例项目中 应用路由 并显示视图
>
> **`路径:`**
>
> 1. 安装路由 
> 2. 在main.js中引入 路由模块
> 3. 在vue-cli中使用router 
> 4. 配置router-link
>    - router-link上的tag属性 可以指定渲染成什么html元素
> 5. 实例化router 完善路由表
>    - 路由表需要的组件从外部引入
> 6. 在App.vue中加入路由承载视图（router-view）
>
> ```bash 
> 1. npm i vue-router // 安装路由模块
> ```
>
> ```js
> 2. import VueRouter from 'vue-router ' // 引用router
> ```
>
> ```js 
> 3. Vue.use(VueRouter) // 使用router
> ```
>
> ```html
> 4. <router-link tag="li" to="/heroes">
>         <a href="#">英雄列表</a>
>    </router-link>
>     ....
> ```
>
> ```js
> 5.
> import AppList from "./app-list.vue";
> import Foo from "./foo.vue";
> import Bar from "./bar.vue";
> const router = new VueRouter({
>   // 路由表
>  routes: [
>      { path: "/heroes", component: AppList },
>      { path: "/foo", component: Foo },
>      { path: "/bar", component: Bar }
>  ]
> }); 
> // router加入实例
> new Vue({
>   el: '#app',
>   render: h => h(App),
>   router
> })
> ```
>
> ```html
> 6.
> <div>
> <AppHeader></AppHeader>
> <div class="row">
> <AppSilder></AppSilder>
>  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
>      <!--加入承载视图-->
>      <router-view></router-view>
> </div>
> </div>
> </div>
> ```

## 13-基础-heroes 案例-提取路由模块

> **`目标:`** 把路由功能提取到单独的router.js文件
>
> **`路径:`** 
>
> 1. 把路由业务抽取到router.js
>    - 注意要引入vue
>
> 2. 在最后一行把router对象暴露出去
>
>    ```js
>    export default router
>    ```
>
> 3. 在main.js中引入router.js

