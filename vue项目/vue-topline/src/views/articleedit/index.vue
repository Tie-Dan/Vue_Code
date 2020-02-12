<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改文章{{editFormDirty}}</span>
        <el-button  @click="editArticle(true)" style="float:right;" type="danger">存入草稿</el-button>
        <el-button @click="editArticle(false)" style="float:right;margin-right:10px;" type="primary">修改</el-button>
      </div>
      <el-form ref="editFormRef" :model="editForm" label-width="120px" :rules="editFormRules">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <quillEditor v-model="editForm.content"></quillEditor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="editForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：" prop="channel_id">
          <el-select v-model="editForm.channel_id" placeholder="请选择"
          clearable
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本编辑器css文件引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 主功能模块引入
import { quillEditor } from 'vue-quill-editor'

export default {

  // 离开当前路由的守卫
  beforeRouteLeave (to, from, next) {
    if (this.editFormDirty) {
    // 如果form表单被修改了，本身不保存，发生离开动作就要给与提示
      this.$confirm('当前表单已经被修改了，确认不保存要离开么?', '离开', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return next() // 放行
      }).catch(() => {
        return next(false) // 阻止执行
      })
    } else {
      return next() // 放行
    }
  },

  name: 'ArticleEditCom',
  components: {
    // 私有方式注册 富文本编辑器
    quillEditor
  },
  created () {
    this.getChannelList() // 获取频道信息
    this.getArticle() // 获取被修改文章的信息
  },
  methods: {
    // 设置watch开始监听
    editFormWatch () {
      this.$watch(
        'editForm',
        function () {
          this.editFormDirty = true
        },
        { deep: true }
      )
    },
    // 根据aid获取被修改的文章信息
    getArticle () {
      var pro = this.$http.get(`/articles/${this.aid}`)
      pro
        .then(result => {
          // console.log(result)
          // 把获得好的被修改文章信息 赋予 给editForm对象
          this.editForm = result.data.data
          // 服务器端返回的数据量有大有小
          // a.数量量小：editForm表单很快完成了填充和页面显示工作
          // b.数据量多：editForm表单填充  和  页面显示之间就有一定的明显的时间间隔
          // watch监听的是"页面上数据"发生变化，因此默认情况b被监听到的几率会更大
          // 设置监听要在editForm的数据更新到页面上之后才进行,具体要使用$nextTick
          this.$nextTick(() => {
            this.editFormWatch()
          })
        })
        .catch(err => {
          return this.$message.error('获取文章错误' + err)
        })
    },
    // 修改文章收集数据存储
    editArticle (flag) {
      // 表单校验
      this.$refs.editFormRef.validate(valid => {
        // axios.post(地址, 请求体数据, 请求字符串)
        var pro = this.$http.put(`/articles/${this.editForm.id}`, this.editForm, { params: { draft: flag } })
        pro
          .then(result => {
            this.$message.success('修改文章成功!')
            // 导航到 文章列表页面
            // 把表单的状态改为false
            this.editFormDirty = false
            this.$router.push({ name: 'article' })
          })
          .catch(err => {
            return this.$message.error('修改文章错误' + err)
          })
      })
    },
    // 获取频道列表信息
    getChannelList () {
      var pro = this.$http.get('/channels')
      pro
        .then(result => {
          // console.log(result)
          // 把获得好的频道信息赋予给 channelList 成员
          this.channelList = result.data.data.channels
        })
        .catch(err => {
          return this.$message.error('获得频道失败' + err)
        })
    }
  },
  // watch: {
  //   editForm: {
  //     handler: function (newval, oldval) {
  //       this.editFormDirty = true
  //     },
  //     deep: true
  //   }
  // },
  data () {
    return {
      // 获取路由参数(文章id)
      aid: this.$route.params.aid,
      // 用户使用的频道列表信息
      channelList: [],
      // 表单校验规则制定
      editFormRules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { min: 5, max: 30, message: '标题内容介于5到30个字符之间', trigger: 'blur' }
        ],
        content: [
          // 该项目需要通过validate方法校验才ok(自然失去焦点校验不灵)
          { required: true, message: '内容必填', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '频道必选', trigger: 'change' }
        ]
      },
      editFormDirty: false, // 当前表单是否有发生变化
      // 修改文章表单对象
      editForm: {
        title: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: '',
        content: ''
      }
    }
  }
}
</script>

<style lang="less">
// 给富文本编辑器设置高度
.ql-editor {
  height: 200px;
}
</style>

<style lang="less" scoped>
</style>
