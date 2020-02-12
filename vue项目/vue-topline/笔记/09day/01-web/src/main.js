// 引入jquery
import $ from 'jquery'

// 引入css文件
import './css/1.css'

// 引入less文件
import './css/1.less'

// 对es6高级内容做应用
let age = 20
var getinfo = ()=>{
  return 'hello'
}

// 实现li标签隔行换色
$(function(){
  $('li:odd').css('background-color','lightblue')
})
