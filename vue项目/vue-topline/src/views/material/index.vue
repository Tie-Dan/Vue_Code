<template>
  <el-card class="box-card2">
    <div slot="header" class="clearfix">
      <span>素材管理</span>
      <div style="float:right;margin-right:40px;">
        <!--此处图片上传不要定义http-request自定义实现了，就走el-upload的默认实现即可-->
        <el-upload
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :headers="upHeaders"
          name="image"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </div>
    <ul>
      <li class="image-box" v-for="item in imageList" :key="item.id">
        <img :src="item.url" alt>
        <div class="image-bot">
          <el-button type="success" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'MaterialCom',
  created () {
    // 获得图片列表
    this.getImageList()
  },
  methods: {
    // 上传成功后的处理
    uploadSuccess (rst) {
      // rst是被上传图片的对象信息
      this.$message.success('图片上传成功！')
      // 更新素材图片列表
      this.getImageList()
    },
    // 获得全部的素材图片
    getImageList () {
      var pro = this.$http.get('/user/images', { params: this.querycdt })
      pro
        .then(result => {
          // 把获得好的图片列表赋予个imageList成员
          this.imageList = result.data.data.results
          // this.$message.success('获得图片列表成功!')
        })
        .catch(err => {
          return this.$message.error('获得图片列表失败' + err)
        })
    }
  },
  data () {
    return {
      // 上传图片的token定义
      upHeaders: {
        Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
      },
      // 全部素材图片成员
      imageList: [],
      // 获得图片的条件
      querycdt: {
        collect: false, // 获取全部类型图片（非收藏的）固定的
        page: 1, // 当前页码
        per_page: 20 // 每页显示20条记录
      }
    }
  }
}
</script>

<style lang="less" scoped>
.image-box {
  list-style: none;
  width: 200px;
  height: 200px;
  background-color: #fff;
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  img {
    width: 200px;
    height: 140px;
  }
  .image-bot {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
