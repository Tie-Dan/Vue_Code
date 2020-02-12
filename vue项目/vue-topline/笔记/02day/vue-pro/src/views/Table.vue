<template>
    <div>
      <table>
        <tr>
          <td>序号</td>
          <td>名称</td>
          <td>地方</td>
        </tr>
        <!--声明一个匿名插槽-->
        <!--给该插槽声明本身要使用的数据,具体通过“属性值”体现-->
        <!--注意：属性的名称不要使用name-->
        <slot :movieList="infos" id="301" ming="恶人传" :addr="dizhi"></slot>
      </table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      infos: [
        { xu: 1001, name: '第十二个人', country: '挪威' },
        { xu: 1002, name: '复联', country: '美国' },
        { xu: 1003, name: '狮子王', country: '美国' }
      ],
      dizhi: '北京'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
