<template>
  <div>
    <h2 class="sub-header">Hero List</h2>
    <a class="btn btn-success" href="add.html" @click.prevent="showAddHtml()">Add</a>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
            <th>性别</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in list" :key="i">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.gender}}</td>
            <td>
              <a href="javascript:;" @click.prevent="showEditHtml(item.id)">编辑</a> &nbsp;&nbsp;
              <a href="javascript:;" @click.prevent="deleteHero(item.id)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 发送axios请求 获取数据
    getData() {
      this.$http.get("heroes").then(res => {
        console.log(res);
        const { status, data } = res;
        if (status == 200) {
          this.list = data;
        }
      });
    },
    // 删除功能
    deleteHero(ID) {
      console.log(ID);
      if (confirm("是否删除")) {
        this.$http.delete("heroes/" + ID).then(res => {
          this.getData();
        });
      }
    },
    //添加
    showAddHtml() {
      this.$router.push({
        name: "add"
      });
    },
    // 修改
    showEditHtml(ID) {
      this.$router.push({
        name: "edit",
        params: {
          id: ID
        }
      });
    }
  }
};
</script>

<style>
</style>
