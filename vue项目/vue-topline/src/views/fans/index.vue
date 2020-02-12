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

      // 图表参数
      var option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'right'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        // 系列
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
