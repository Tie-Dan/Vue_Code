var ph = require("path");
// 注意：webpack中引入其他的模块要使用commonjs模块化require导入，因为webpack是nodejs开发的
//       不能使用import导入
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 各种loader配置段
  module: {
    rules: [
      {
        // 4) es6等高级内容对应的loader配置
        test: /\.js$/,
        // 给node_modules目录做排除处理，不要处理
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        // 3) less处理loader配置
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        // 2) 图片处理loader配置
        test: /\.(png|jpg|gif)$/i, // 正则匹配图片文件
        // 遇到图片文件就交给如下loader处理
        use: [
          {
            loader: "url-loader",
            options: {
              // limit:设定大小阀值
              // a. 被处理图片大小 大于该阀值，就通过物理文件重新生成该图片
              // b. 被处理图片大小 小于等于该阀值，就把图片变为字符串(嵌入到应用文档中，好处是节省一个http资源)
              limit: 8192,
              // 做配置，使得生成的物理图片被存储在dist/images里边
              outputPath: "images"
            }
          }
        ]
      },
      {
        // 1) css内容处理loader配置
        test: /\.css$/, // 通过正则表达式匹配css文件
        // 遇到css文件要交给如下的loader处理
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // webpack-dev-server配置段
  devServer: {
    host: "127.0.0.1", // http服务主机名地址
    port: 10086, // 服务端口号码
    open: true, // 自动开启浏览器查看效果
    compress: true // 对网络请求的文件进行压缩处理
  },

  plugins: [
    new HtmlWebpackPlugin({
      // 配置被打包的目标模板文件的(如果不配置下述template，会给我们生成一个空的html文件)
      template: ph.resolve("./src/index.html")
    })
  ],

  mode: "development", // development  production
  // 配置入口文件为src/main.js
  // entry: ph.join(__dirname,'./src/main.js') // 绝对路径
  entry: ph.resolve("./src/main.js"), // 绝对路径
  // resolve较比join好的地方：不用__dirname也可以拼装绝对路径出来

  // 配置出口文件为dist/chunk.js
  output: {
    path: ph.resolve("./dist"), // 配置出口目录
    filename: "chunk.js" // 配置出口文件名称
  }
};
