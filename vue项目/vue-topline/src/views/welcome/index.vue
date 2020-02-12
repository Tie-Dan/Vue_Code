<template>
    <div>
        欢迎访问黑马头条后台系统
        <com-one/>
        <com-two/>
    </div>
</template>

<script>
import One from './com/one.vue'
import Two from './com/two.vue'
export default {
  components: {
    'com-one': One,
    'com-two': Two
  }
}
</script>

<style lang="less" scoped>
</style>
