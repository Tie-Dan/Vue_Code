<template>
  <el-card class="box-card2">
    <div slot="header" class="clearfix">
      <span>账户信息</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="editFormRef" :model="editForm">
          <el-form-item label="用户名">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="editForm.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="editForm.intro" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editAccount()">更新账户</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">

        <el-upload
          action=""
          :show-file-list="false"
          :http-request="httpRequest"
        >
          <img v-if="editForm.photo" :src="editForm.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'AccountCom',
  created () {
    this.getAccountInfo()
  },
  methods: {
    // 更新用户头像，自定义头像上传具体实现
    httpRequest (rst) {
      // rst:代表被上传头像的附件对象信息
      // rst.file 代表上传头像的附件对象
      // console.log(rst)
      // 1) 通过 FormData 收集上传附件信息
      //    new FormData(form元素对象)  // 收集全部form表单域信息
      var fd = new FormData()
      fd.append('photo', rst.file)

      // 2) axios发起请求，同时携带附件
      var pro = this.$http.patch('/user/photo', fd)
      pro
        .then(result => {
          // 3) 上传完毕，更新账户头像显示
          // 把上传完毕并通过result返回的新头像地址赋予给editForm.photo成员
          this.editForm.photo = result.data.data.photo
          // console.log(result)
          // 通过vuex实现头像更新
          this.$store.commit('upPhoto', result.data.data.photo)
          this.$message.success('更新账户头像成功')
        })
        .catch(err => {
          return this.$message.error('更新账户头像失败' + err)
        })
    },

    // 修改账户信息，存储入库
    editAccount () {
      // 自行完成表单校验逻辑
      var pro = this.$http.patch('/user/profile', this.editForm)
      pro
        .then(result => {
          // console.log(result)
          // 通过vuex更新名称信息
          this.$store.commit('upName', result.data.data.name)
          this.$message.success('更新账户信息成功')
        })
        .catch(err => {
          return this.$message.error('更新账户信息失败' + err)
        })
    },
    // 获得当前账户的基本信息
    getAccountInfo () {
      var pro = this.$http.get('/user/profile')
      pro
        .then(result => {
          // 把获得好的账户信息赋予给editForm
          this.editForm = result.data.data
          this.$store.commit('upPhoto', this.editForm.photo)
          this.$store.commit('upName', this.editForm.name)
        })
        .catch(err => {
          return this.$message.error('获取账户信息错误' + err)
        })
    }
  },
  data () {
    return {
      editForm: {
        name: '',
        intro: '',
        email: ''
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="less" scoped>
</style>
