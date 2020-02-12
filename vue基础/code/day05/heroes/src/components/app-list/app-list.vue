<template>
  <div>
    <h2 class="sub-header">Hero List</h2>
    <router-link class="btn btn-success" to="/add">添加</router-link>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>姓名</th>
            <th>性别</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- item.id也是唯一的 -->
          <tr v-for="item in list" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <td>
              <router-link :to="{path:'/edit/'+item.id }">编辑</router-link>&nbsp;&nbsp;
              <a @click="delItem(item.id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// import axios from "axios"; // 引入axios
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    //加载数据
    loadData() {
      this.$https.get("http:localhost:3000/heroes").then(result => {
        this.list = result.data;
      });
    },
    // 删除数据 restful
    delItem(id) {
      if (confirm("是否删除此数据?")) {
        this.$https.delete(`/heroes/${id}`).then(result => {
          if (result.status === 200) {
            this.loadData(); // 重新刷新
          }
        });
      }
    }
  },
  //首次渲染完成事件 只会执行一次
  mounted() {
    this.loadData();
  }
  // beforeMount() {

  // },
  // mounted () {

  // }
};
</script>

<style>
</style>
