<template>
  <div>
    <h2>父组件(要引入使用子组件)</h2>
    <!--使用子组件-->
    <!--给命名插槽填充内容，具体需要通过"html标签"实现-->
    <!-- <my-button>
      <i>44444444444</i>
      aaaaaaaa
      <span slot="one" style="color:blue;">确</span>
      bbbbbbbbb
      <span slot="two" style="color:green;">定</span>
      cccccccccc
    </my-button>
    <my-button>取消</my-button>
    <my-button>重置</my-button>-->
    <!--作用域插槽应用-->
    <my-table>
      <!--接收插槽传递过来的数据并应用,通过slot-scope接收数据，具体是一个对象，成员就是插槽的属性名-->
      <template slot-scope="stData">
        <tr v-for="item in stData.movieList" :key="item.xu">
          <td>{{item.xu}}</td>
          <td>{{item.name}}</td>
          <td>{{item.country}}</td>
        </tr>
      </template>
    </my-table>
  </div>
</template>

<script>
// 引入Button.vue组件
import Button from './Button.vue'
import Table from './Table.vue'
export default {
  name: 'fatherCom',
  // 注册Button组件
  components: {
    'my-button': Button,
    'my-table': Table
  }
}
</script>

<style lang="less" scoped>
</style>
