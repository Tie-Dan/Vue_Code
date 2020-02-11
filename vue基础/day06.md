

## 01-基础-heroes-案例-json-server-启动接口服务器

> **`目标：`** 准备json-server服务器.启动实现 数据接口 增删改查的联通
>
> **`路径：`** 启动json-server服务器
>
> 1. 安装json-server  
>
> **`注意:`** json-server 是一个命令行工具,和vue以及vue-cli没有任何关系 所以安装在任何位置都可以
>
> ```bash 
> npm i -g json-server // 安装json-server 
> ```
>
> 2. 新建json文件 
>
> ```json
> {
> "heroes": [
>     { "name": "张三", "id": 1, "gender": "男" },
>     { "name": "李白", "id": 2, "gender": "女" },
>     { "name": "吕布", "id": 3, "gender": "男" }
> ]
> }
> 
> ```
>
> 3. 启动json-server
>
> ```js
> json-server --watch db.json 
> ```

## 02-基础-heroes-案例-列表渲染

注意接口有可能有问题

> **`目标：`**完成英雄列表的数据加载及渲染
>
> **`路径：`**
>
> 1. 安装axios 插件 
> 2. 英雄列表组件中引入 axios ,
> 3. 定义data选项定义list列表数据
> 4. 请求英雄列表的方法封装 获取数据赋值list列表
> 5. 在mounted事件(相当于window.onload)中调用获取数据方法
> 6. 根据数据渲染列表
>
> ```bash
> // 1.安装axios 插件 
> npm i axios 
> ```
>
> ```js 
> // 2.引入axios
> import axios from 'axios' 
> ```
>
> ```js
> // 3.定义数据
> data() {
>  return {
>  	list: []
>  };
> }
> ```
>
> ```js
> // 4.请求英雄列表的方法封装
> loadData() {
>  //restful规则
>  axios.get("http://localhost:3000/heroes").then(result => {
>  	this.list = result.data;
>  })
> }
> ```
>
> ```js
> // 5.实例完成事件
> mounted() {
> 	this.loadData();
> },
> ```
>
> ```html
> // 6.根据数据渲染列表
> <tr v-for="item in list" :key="item.id">
>     <td>{{item.id}}</td>
>     <td>{{item.name}}</td>
>     <td>{{item.gender}}</td>
>     <td>
>         <a href="javascript:;">edit</a> &nbsp;&nbsp;
>         <a href="javascript:;">delete</a>
>     </td>
> </tr>
> ```

## 03-基础-heroes-案例-删除功能

​	删除的时候注意 接口加/ 拼接ID

> **`目标:`**实现英雄列表的删除功能
>
> **`路径:`** 删除功能
>
> 1. 注册删除事件 
>    - 因为删除需要id  所以定义删除方法的时候 把id传进去
> 2. 定义删除方法  实现删除逻辑
> 3. 判断删除成功  刷新数据
>
> ```html
> // 1.注册删除事件 
> <a href="javascript:；" @click="delItem(item.id)">删除</a>
> ```
>
> ```js
> // 2.定义删除方法
> // id为要删除id的方法
> delItem(id) {
>  if (confirm("确认删除此条数据")) {
>      axios.delete("http://localhost:3000/heroes/" + id).then(result => {
>           // 3. 判断删除状态 是否成功
>          if (result.status === 200) {
>            this.getData(); // 刷新数据
>          }
>      });
>  }
> }
> ```
>

## 04-基础-heroes-案例-添加-渲染添加组件

> **`目标：`**添加组件功能的静态实现
>
> **`路径:`** 添加视图的实现
>
> 1. 新建add.vue组件 写入静态内容(拷贝静态资源)
>
> 2. 在路由表中配置添加功能的路由
> 3. 给列表组件的添加按钮  添加hash  以对应路由表
> 4. 根据业务场景调整页面模板
>
> ```js
> // 2.在路由表中配置添加功能的路由
> { path: "/add", component: Add }  // 引入组件 配置路由
> ```
>
> ```js
> // 3.给列表组件的添加按钮  添加hash  以对应路由表 
> <a class="btn btn-success" href="#/add">添加</a>
> ```
>
> ```html
> // 4.根据业务场景调整页面模板
> <div>
> <h2 class="sub-header">添加英雄</h2>
> <form>
> <div class="form-group">
> <label for="exampleInputEmail1">用户名</label>
> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="请输入姓名" />
> </div>
> <div class="form-group">
> <label for="exampleInputPassword1">性别</label>
> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入性别" />
> </div>
> <button type="submit" class="btn btn-success">添加英雄</button>
> </form>
> </div>
> ```

## 05-基础-heroes-案例-添加-功能完善

​	注意编程导航写法 和引入axios 

> **`目标:`** 实现添加英雄的功能
>
> **`路径:`** 添加功能的实现
>
> 1. 定义表单数据  和  表单进行绑定 
>
> 2. 给新增英雄按钮 添加点击事件和方法
> 3. 实现添加方法的逻辑
> 4. 判断填报信息是否为空
> 5. 发送axios请求以post方式  调用  添加英雄的接口地址 和 添加的英雄 信息
>    - 成功返回状态码是201
> 6. 成功以后 利用编程式导航 跳转到 ’/heroes‘
>
> ```js
> //1.添加数据
> data() {
>  return {
>  // 定义一个数据对象 存储 姓名和性别
>      formData: {
>          name: "", // 姓名
>          gender: "" // 性别
>      }
>  };
> } 
> ```
>
> ```html
> <!-- 2.给添加英雄按钮注册一个事件 -->
> <button type="submit" class="btn btn-success" @click="addHero">添加英雄</button>
> ```
>
> ```js
> // 3.添加英雄方法
> addHero() {
> // 4.判断填报信息是否为空
> if (this.formData.name && this.formData.gender) {
>     // 5.发送请求 添加英雄信息
>     axios.post("http://localhost:3000/heroes", this.formData)
>     .then(result => {
>     	// 注意这里添加成功的状态码 是 201
>     	if (result.status === 201) {
>              // 6. 添加成功之后 要跳转回列表页
>              // 编程式导航
>  			this.$router.push({ path: "/heroes" });
> 		} else {
>  			alert("添加失败");
> 		}
> 	});
> } else {
> 	alert("提交信息不能为空");
> }
> }
> ```

## 06-基础-heroes-案例-编辑-渲染编辑组件

> **`目标：`**实现英雄列表的编辑功能组件渲染
>
> **`路径:`** 编辑功能渲染
>
> **`注意:`** 由于编辑组件和添加组件页面结构基本一致  可以 直接拷贝添加组件的内容
>
> 

## 07-基础-heroes-案例-编辑-显示编辑数据

注意: 获取动态参数是 $route  不是$router

> **`目标：`**实现英雄列表的编辑功能
>
> **`路径`**:  实现编辑的显示数据 
>
> 1. 添加编辑路由  **注意** 由于需要拿到编辑数据的标识 所以需要动态路由
> 2. 给 编辑按钮 添加 跳转路由的属性 
> 3. 定义获取英雄数据方法
>    1. 通过$router.params来获取动态id 
>    2. 根据id发送axios请求 获取英雄数据
> 4. 在mounted事件中 调用加载英雄方法
>
> ```js
> // 1.添加动态路由
> { path: "/edit/:id", component: Edit } // 编辑组件 动态路由
> ```
>
> ```html
> // 2.编辑按钮添加跳转的属性
> <router-link :to="{path:'/edit/'+item.id }">编辑</router-link>
> ```
>
> ```js
> // 3.通过id获取英雄数据
> loadHero() {
> 	const { id } = this.$route.params; // 通过参数获取id
>  if (id) {
>      //判断id
>      axios.get("http://localhost:3000/heroes/" + id).then(result => {
>          this.formData = result.data; // 获取数据并赋值给表单对象
>      });
>  }
> }
> ```
>
> ```js
> // 4.调用获取英雄数据的方法
> mounted() {
> 	this.loadHero();
> }
> ```

## 08-基础-heroes-案例-编辑-提交功能

注意 获取动态参数  this.$route  不是 this.router 

> **`目标:`**实现英雄列表编辑数据的提交
>
> **`路径`**:
>
> 1. 定义提交方法
> 2. 实现提交方法的逻辑
>    1. 判断提交内容非空  
>    2. 获取动态参数id
>    3. 发送aixos请求put方式 拼接id  把修改的数据带上
>    4. 成功以后 利用编程式导航回到 "/heroes"
>
> ```js
> // 编辑英雄
> editHero() {
>     if (this.formData.name && this.formData.gender) {
>         const { id } = this.$route.params; 
>         axios
>             .put("http://localhost:3000/heroes/" + id, this.formData)
>             .then(result => {
>             if (result.status === 200) {
>                 this.$router.push({ path: "/heroes" });
>             } else {
>                 alert("编辑失败");
>             }
>         });
>     } else {
>         alert("提交内容不能为空");
>     }
> }
> ```

## 09-基础-heroes-案例-优化-axios 统一导入

> **`目标：`**实现axios的统一导入
>
> **`路径`**: axios的统一导入 和使用
>
> 1 在入口main.js文件中引入axios,并赋值给全局Vue对象的原型
>
> ```js
> Vue.prototype.$http = Axios; //所有的实例都直接共享拥有了 这个方法
> ```
>
> 2  调用接口时  采用 实例.属性的方式即可调用 
>
> ```JS
> // 把以前用到axios的地方 换成 this.$http
> ```

## 10-基础-heroes-案例-优化-设置 baseUrl

> **`目标:`**通过配置**`baseUrl`**将所有的请求地址进行优化 
>
> **`路径`**: axios中配置统一的**`请求路径头`**
>
> 1. 给axios中的baseUrl设置常态值
>
> ```js
> Axios.defaults.baseURL = "http://localhost:3000"; // 设置共享的方法
> ```
>
> 2. 改造所有的的请求
>
> ```js
> // 没改造之前
> 'http://localhost:3000/heroes/'
> // 设置完常态值
> '/heroes/'
> ```

## 11-基础-heroes-案例-优化-统一设置激活样式

> **`目标：`**统一当前路由的激活样式
>
> - router.js 的路由表上面加上
>
> ```js
> linkActiveClass: "active", // active为bootstrap中的 一个class样式
> ```
>

