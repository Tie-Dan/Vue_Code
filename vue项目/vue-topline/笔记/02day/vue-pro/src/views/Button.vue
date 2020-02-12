<template>
    <div>
      <button>
        <!--给多个插槽都定义上名字，它们可以接收到特定的内容-->
        <slot name="one"></slot>
        <hr />
        <slot name="two"></slot>
        <hr />
        <slot></slot>
      </button>
    </div>
</template>

<script>
export default {
  name: 'buttonCom'
}
</script>

<style lang="less" scoped>
</style>
