<template>
  <div>
    <!--选取素材图片的对话框-->
    <el-dialog title="素材图片" :visible.sync="dialogVisible" width="60%" @close="clearImage()">
      <ul>
        <li class="image-box" v-for="item in imageList" :key="item.id">
          <img :src="item.url" alt @click="clkImage" />
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="imageOK">确 定</el-button>
      </span>
    </el-dialog>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
        <el-button @click="addArticle(true)" style="float:right;" type="danger">存入草稿</el-button>
        <el-button
          @click="addArticle(false)"
          style="float:right;margin-right:10px;"
          type="primary"
        >发布</el-button>
      </div>
      <el-form ref="addFormRef" :model="addForm" label-width="120px" :rules="addFormRules">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <quillEditor v-model="addForm.content"></quillEditor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="addForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <ul>
            <li class="uploadbox" v-for="item in covernum" :key="item" @click="showDialog(item)">
              <span>点击图标选择图片</span>
              <img v-if="addForm.cover.images[item-1]" :src="addForm.cover.images[item-1]" alt />
              <div v-else class="el-icon-picture-outline"></div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="频道：" prop="channel_id">
          <el-select v-model="addForm.channel_id" placeholder="请选择" clearable>
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
  name: 'ArticleAddCom',
  components: {
    // 私有方式注册 富文本编辑器
    quillEditor
  },
  created () {
    this.getChannelList() // 获取频道信息
  },
  methods: {
    // 清除全部选中效果，和对应的图片地址
    clearImage () {
      // 图片选中清除
      var lis = document.querySelectorAll('.image-box')
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.border = ''
      }
      // 之前选中图片的地址也清除
      this.materialUrl = ''
    },
    // 确定选中素材图片了
    imageOK () {
      if (this.materialUrl) {
        // 把选择好的图片的地址赋予给 addForm.cover.images成员里边
        this.addForm.cover.images[this.xu] = this.materialUrl
        // 关闭对话框
        this.dialogVisible = false
        // 清除全部都不选中
        this.clearImage()
      }
    },
    // 单击选取当前的图片
    clkImage (evt) {
      // evt是事件对象
      // console.log(evt) // MouseEvent
      // console.log(evt.target) // 触发当前事件的dom对象(img)
      // 先把全部项目的bordr边框都去除选中效果
      this.clearImage()
      // 给当前选中的img外部的li设置边框高亮样式，表示被激活
      evt.target.parentNode.style.border = '2px solid red'
      // 把当前图片的url地址赋予给materialUrl
      this.materialUrl = evt.target.src
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
    },
    // 控制素材图片对话框显示
    showDialog (n) {
      // n:代表被单击选择框的序号，请把这个n赋予给xu
      // 注意：要自动减少一位
      this.xu = n - 1

      // 显示对话框
      this.dialogVisible = true
      // 获取供展示图片
      this.getImageList()
    },
    // 添加文章收集数据存储
    addArticle (flag) {
      // 表单校验
      this.$refs.addFormRef.validate(valid => {
        // axios.post(地址, 请求体数据, 请求字符串)
        var pro = this.$http.post('/articles', this.addForm, {
          params: { draft: flag }
        })
        pro
          .then(result => {
            this.$message.success('添加文章成功!')
            // 导航到 文章列表页面
            this.$router.push({ name: 'article' })
          })
          .catch(err => {
            return this.$message.error('添加文章错误' + err)
          })
      })
    },
    // 获取频道列表信息
    getChannelList333 () {
      var pro = this.$http.get('/channelsdsdsdsdsds')
      pro
        .then(result => {
          // console.log(result)
          // 把获得好的频道信息赋予给 channelList 成员
          this.channelList = result.data.data.channels
        })
        .catch(err => {
          return this.$message.error('获得频道失败' + err)
        })
    },
    // 获取频道列表信息
    async getChannelList () {
      try {
        // 放置有可能产生错误的代码
        var rst = await this.$http.get('/channels') // 具体的result结果
        this.channelList = rst.data.data.channels
      } catch (err) {
        // 捕捉并处理错误
        this.$message.error('获得频道错误' + err)
      }
      // 后续无论如何都会执行
      console.log(55556677)
    }
  },
  data () {
    return {
      // 记录当前选中好的素材图片路径名
      materialUrl: '',
      // 记录当前操控的选择框序号(0/1/2)
      xu: 0,
      // 可供选取的素材图片列表
      imageList: [],
      querycdt: {
        collect: false, // 获取全部类型图片（非收藏的）固定的
        page: 1, // 当前页码
        per_page: 15 // 每页显示20条记录
      },
      // 素材图片对话框控制是否显示
      dialogVisible: false,
      // 用户使用的频道列表信息
      channelList: [],
      // 表单校验规则制定
      addFormRules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '标题内容介于5到30个字符之间',
            trigger: 'blur'
          }
        ],
        content: [
          // 该项目需要通过validate方法校验才ok(自然失去焦点校验不灵)
          { required: true, message: '内容必填', trigger: 'blur' }
        ],
        channel_id: [{ required: true, message: '频道必选', trigger: 'change' }]
      },
      // 添加文章表单对象
      addForm: {
        title: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: '',
        content: ''
      }
    }
  },
  computed: {
    // 设定"选择图片框"个数的
    covernum () {
      if (this.addForm.cover.type >= 0) {
        return this.addForm.cover.type
      }
      return 0
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
// 对话框内部素材图片展示css样式
.image-box {
  list-style: none;
  width: 200px;
  height: 140px;
  background-color: #fff;
  margin: 10px;
  float: left;
  border: 1px solid #eee;
  cursor: pointer;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
}
// 选择框样式
.uploadbox {
  list-style: none;
  width: 200px;
  height: 200px;
  margin: 10px;
  float: left;
  cursor: pointer;
  border: 1px solid #eee;
  span {
    width: 200px;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align: center;
  }
  div {
    width: 200px;
    height: 150px;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  img {
    width: 200px;
    height: 150px;
  }
}
</style>
