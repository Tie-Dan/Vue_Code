const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js', // 以我们的src的index.js 作为入口进行打包
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map', // 可以产生source-map
    resolve: { // 更改解析模块的查找方式
        modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}