<template>
  <el-card class="box-card2">
    <div slot="header" class="clearfix">
      <span>粉丝概况</span>
    </div>
    <!--绘制图像显示的区域容器-->
    <div ref="fensstat" id="main" style="width:750px;height:400px;"></div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from 'echarts'

export default {
  // mounted钩子函数执行，调用paintPic()方法，因为需要操作原生div
  // 如果只是对data数据进行操作，就使用created
  // mounted代表页面上全部内容都已经解析完毕并完成了渲染
  mounted () {
    this.paintPic()
  },
  methods: {
    // 绘制图像
    paintPic () {
      // 创建echarts对象
      // 如下两种方式都可以获得页面div节点，并且效果完全一致
      // var myChart = echarts.init(document.getElementById('main'))
      var myChart = echarts.init(this.$refs.fensstat)
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>
