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
      <button @click="addItem" type="submit" class="btn btn-success">新增</button>
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
    // 新增数据 restful
    addItem() {
      if (this.formData.name && this.formData.gender) {
        // 如果两者皆不为空 才去提交数据
        this.$https.post("/heroes", this.formData).then(result => {
          if (result.status === 201) {
            this.$router.push({
              path: "/heroes"
            }); //编程式导航
          }
        });
      } else {
        alert("姓名和性别不能为空");
      }
    }
  }
};
</script>

<style>
</style>
