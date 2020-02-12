<template>
  <div>
    <h2 class="sub-header">Add Hero</h2>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">名字</label>
        <input
          type="text"
          v-model="formData.name"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="请输入名字"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">性别</label>
        <input
          type="text"
          v-model="formData.gender"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="请求输入性别"
        />
      </div>

      <button type="submit" class="btn btn-success" @click.prevent="addHero()">添加英雄</button>
    </form>
  </div>
</template>

<script>
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
    addHero() {
      this.$http.post("heroes/", this.formData).then(res => {
        if (res.status == 201) {
          this.$router.push({
            name: "list"
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
