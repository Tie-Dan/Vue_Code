<template>
  <div>
    <!--筛选文章卡片区-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="searchFormRef" :model="searchForm">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchForm.status" @change="getArticleList()">
            <el-radio label>全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select
            v-model="searchForm.channel_id"
            clearable
            @change="getArticleList()"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            v-model="timetotime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <!--文章列表卡片去-->
    <el-card class="box-card2">
      <div slot="header" class="clearfix">
        <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" style="width:100%;">
        <el-table-column label="图标">
          <!-- <span slot-scope="stData">{{stData.row}}</span> -->
          <!-- { "id": 1154395733458157600, "title": "炸醒2万小股东！身家120亿的河南首富，只能拿出300万", "status": 1, "cover": { "type": 1, "images": [ "http://toutiao.meiduo.site/FqYFidjiOLkvWTKnSIgkp6tRmTSG" ] }, "pubdate": "2019-07-25 22:19:25" } -->
          <img :src="stData.row.cover.images[0]" alt width="150" height="100" slot-scope="stData">
        </el-table-column>
        <el-table-column label="标题" prop="title" width="290"></el-table-column>
        <el-table-column label="状态" width="150">
          <!--如果当前内容区域 有许多标签都要使用作用域插槽，那么就通过统一的父标签template使用即可-->
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status=='0'">草稿</el-tag>
            <el-tag type="success" v-else-if="stData.row.status=='1'">待审核</el-tag>
            <el-tag type="info" v-else-if="stData.row.status=='2'">审核通过</el-tag>
            <el-tag type="warning" v-else-if="stData.row.status=='3'">审核失败</el-tag>
            <el-tag type="danger" v-else>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="stData">
            <el-button type="primary" size="mini" @click="$router.push(`/articleedit/${stData.row.id}`)">修改</el-button>
            <el-button type="danger" size="mini" @click="del(stData.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页效果-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="searchForm.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleCom', // 方便在devtools调试工具中寻找当前的组件
  // 设置监听器
  watch: {
    // timetotime的成员发生变化随时可以被监测到
    timetotime (newval) {
      if (newval) {
        // 把newval的两个数组单元获得出来，分别赋予给begin_pubdate和end_pubdate连个成员
        this.searchForm.begin_pubdate = newval[0]
        this.searchForm.end_pubdate = newval[1]
      } else {
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
      // 根据变化的时间范围重新获得数据
      this.getArticleList()
    }
  },
  created () {
    this.getChannelList() // 获取频道信息
    this.getArticleList() // 获得用于显示的文章列表信息
  },
  methods: {
    // 删除文章
    del (id) {
      this.$confirm('确认要删除该文章么?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // axios请求服务器端删除数据，服务器并没有返回任何信息，因此pro接收没有任何意思
          this.$http.delete(`/articles/${id}`)
          this.$message.success('文章删除成功')
          // 更新文章
          this.getArticleList()
        })
        .catch(() => {})
    },

    // 每页显示条数变化的回调处理
    handleSizeChange (val) {
      // val: 变化后的每页显示条数
      // console.log(val)
      // 把val赋予给searchForm.per_page成员
      this.searchForm.per_page = val
      // 根据新的每页显示条数重新获得数据
      this.getArticleList()
    },
    // 当前页码变化的回调处理
    handleCurrentChange (val) {
      // val：变化后的页码信息
      // console.log(val)
      // 把变化后的到页码val赋予给searchForm.page成员
      this.searchForm.page = val
      // 根据变化后条件，重新获得文章列表数据
      this.getArticleList()
    },

    // 获得文章列表信息,同时注意要传递各种查询条件
    getArticleList () {
      // 对参数信息进行过滤处理，删除没有值的参数
      var cdtData = {}
      for (var i in this.searchForm) {
        if (this.searchForm[i]) {
          cdtData[i] = this.searchForm[i]
        }
      }

      var pro = this.$http.get('/articles', { params: cdtData })
      pro
        .then(result => {
          // console.log(result)
          // 把获得到的文章列表信息赋予给articleList成员
          this.articleList = result.data.data.results
          // 把总记录条数接收赋予给tot成员
          this.tot = result.data.data.total_count
        })
        .catch(err => {
          return this.$message.error('获取文章列表错误' + err)
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
  data () {
    return {
      // 文章列表信息
      articleList: [],
      // 用户使用的频道列表信息
      channelList: [],
      timetotime: '', // 用于接收 开始和结束日期  大字符串的
      tot: 0, // 记录总条数
      // 查询表单
      searchForm: {
        status: '', // 文章状态
        channel_id: '', // 频道
        begin_pubdate: '', // 开始日期
        end_pubdate: '', // 结束日期
        page: 1, // 当前页码
        per_page: 10 // 每页显示条数
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card2 {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
