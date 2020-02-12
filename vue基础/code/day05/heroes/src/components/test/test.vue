<template>
  <div>
    {{name}}
    <button @click="name='李四'">修改</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "张三"
    };
  },
  //实例创建前
  beforeCreate() {
    // 一般什么都不做
    console.log("实例创建前beforeCreate");
    //console.log(this);
  },
  //创建实例之后
  created() {
    // 一般用来做 请求数据 列表数据 默认数据 但是不能获取dom
    console.log("实例创建后created");
    // 注意 实例上取dom此时取不到
  },
  // 挂载页面前 渲染
  beforeMount() {
    // 一般用来做 请求数据 列表数据 默认数据 但是不能获取dom
    console.log("首次渲染前beforemount");
  },
  //首次渲染后
  mounted() {
    // 一般可以做加载数据 但是可以获取dom了
    // 如果 我们需要做定时器 一般在这里做
    console.log("首次渲染后mounted");
    //setTimeout(,1000)定时器是全局作用域
  },
  // 数据更新前
  beforeUpdate() {
    console.log("数据更新前执行");
  },
  // 数据更新后
  updated() {
    console.log("数据更新后执行");
  },
  // 销毁前
  beforeDestroy() {
    // 非常有用
    // 一般在这里去销毁 定时器
    // 离开之前把定时器销毁掉 防止出现错误
    console.log("销毁组件前");
  },
  //销毁后
  destroyed() {
    // 一般不做任何处理
  }
};
</script>

<style>
</style>
