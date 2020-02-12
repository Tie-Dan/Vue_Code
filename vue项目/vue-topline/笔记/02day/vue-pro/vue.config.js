module.exports = {
  lintOnSave: true, // 文件保存时就做eslint规范检测
  devServer: {// 实时保存、编译的配置段
    open: true, // 自动开启浏览器
    port: 12306, // 服务运行端口
    host: '127.0.0.1' // 运行服务的主机名
  }
}
