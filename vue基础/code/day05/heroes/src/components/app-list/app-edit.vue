<template>
  <div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">姓名</label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="姓名"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">性别</label>
        <input
          v-model="formData.gender"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="性别"
        />
      </div>
      <button @click="editItem" type="submit" class="btn btn-success">提交修改</button>
    </form>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      formData: {
        name: "",
        gender: ""
      }
    };
  },
  methods: {
    // restful规则
    // crud  c (增)post r (查)get  u(改) put  d (删)delete
    // 提交修改
    editItem() {
      if (this.formData.name && this.formData.gender) {
        var id = this.$route.params.id;
        //都不为空的前提下
        this.$https.put(`/heroes/${id}`, this.formData).then(result => {
          if (result.status === 200) {
            //编程式导航
            this.$router.push({ path: "/heroes" }); // 回到列表页
          } else {
            alert("修改失败");
          }
        });
      }
    },
    queryItem() {
      var id = this.$route.params.id;
      this.$https.get(`/heroes/${id}`).then(result => {
        this.formData = result.data;
      });
    }
  },
  //首次渲染事件
  mounted() {
    this.queryItem();
  }
};
</script>

<style>
</style>
