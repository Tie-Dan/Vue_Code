# Yarn

快速、可靠、安全的依赖管理工具。

Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的





## 速度超快

Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。

## 超级安全

在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。

## 超级可靠

使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。



## 离线模式

如果你以前安装过某个包，再次安装时可以在没有任何互联网连接的情况下进行



## 确定性

不管安装顺序如何，相同的依赖关系将在每台机器上以相同的方式安装



## yarn与npm区别

yarn安装更快，会同时安装多个，而npm按照队列一个一个顺序去安装，必须等到当前的package安装完毕后才能去安装下一个



## yarn使用步骤

在已经具备node和npm的windows系统中执行如下指令

```
npm i -g yarn
```

执行如下指令查看yarn版本

```
yarn --version
1.16.0
```

yarn与npm针对各个指令的执行

|     **对比**     |             **yarn**              |             **npm**             |
| :--------------: | :-------------------------------: | :-----------------------------: |
| 初始化package.js |           yarn init -y            |           npm init -y           |
|   安装全部依赖   |      yarn install 或者 yarn       |           npm install           |
|     新增依赖     |          yarn add 依赖包          |       npm install 依赖包        |
|                  |       yarn add react --dev        |  npm install react --save-dev   |
|     删除依赖     |        yarn remove 依赖包         |      npm uninstall 依赖包       |
|     更新依赖     |           yarn upgrade            |           npm update            |
|  全局安装或删除  | yarn global add/remove 依赖包名字 | npm install/uninstall 依赖包 -g |
|   同时下载多个   |         yarn add 包1 包2          |      npm install  包1 包2       |

> --dev: 简写为-D



给yarn修改镜像 ，安装源和原来 npm 是一样的，可以通用

```
yarn config get registry				// 查看当前使用的源
yarn config set registry https://registry.npm.taobao.org		// 配置为taobao的镜像源
```

> 一定注意配置的源地址不能带引号

