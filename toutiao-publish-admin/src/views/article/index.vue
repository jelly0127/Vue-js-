<template>
  <div class="artilce-container">
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form"
               :model="form"
               label-width="50px"
               size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <!-- 默认把label作为文本和value值 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
          <el-form-item label="频道">
            <el-select v-model="channelId"
                       placeholder="请选择频道">
              <el-option label="全部"
                         :value="null"></el-option>

              <el-option :label="channel.name"
                         :value="channel.id"
                         v-for="(channel,index) in channels"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="rangeDate"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss" />
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <!-- button按钮的click时间有个默认参数，
          当你没有指定参数时候，会默认传递一个没用的参数 -->
          <el-button type="primary"
                     :disabled="loading"
                     @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单 -->
    </el-card>

    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到{{totalCount}}条结果：
      </div>

      <!-- 数据列表 
       1.把需要展示的数组列表数据绑定给table
      组件的data属性 
      注意：不用v-for遍历。会自己遍历
      2.设置表格列
      prop  用来设定要渲染的列表项数据字段
      3.表格列默认只能渲染普通文本，如果需要展示
      其他内容例如按钮、图片，那就需要自定义表格列模板
      -->
      <el-table stripe
                v-loading="loading"
                size="mini"
                class="list-table"
                :data="articles"
                style="width: 100%">
        <el-table-column prop="images"
                         label="封面">
          <template slot-scope="scope">
            <img v-if="scope.row.cover.images[0]"
                 class="article-cover"
                 :src="scope.row.cover.images[0]">
            <img class="article-cover"
                 v-else
                 src="./no-cover.gif">
            <!-- 下面这种情况是在运行期间动态改变处理的。
                 而本地图片必须是在打包的时候就存在 -->
            <!-- <img class="article-cover"
                 :src="scope.row.cover.images[0] 
                 || 'no-cover.gif'"> -->
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据。
          那么就在 template 声明 slot-scope=“scope” -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">
              {{articleStatus[scope.row.status].text}}
            </el-tag>
            <!-- <el-tag type="warning"
                    v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success"
                    v-else-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="danger"
                    v-else-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="info"
                    v-else-if="scope.row.status===4">已删除</el-tag> -->

          </template>
        </el-table-column>
        <el-table-column prop="pubdate"
                         label="发布时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       circle
                       icon="el-icon-edit"
                       @click="$router.push('/publish?id=' + 
                       scope.row.id.toString())"></el-button>
            <el-button size="mini"
                       type="danger"
                       circle
                       icon="el-icon-delete"
                       @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据列表 -->

      <!-- 列表分页 -->
      <el-pagination background
                     :disabled="loading"
                     layout="prev, pager, next"
                     :page-size="pageSize"
                     :total="totalCount"
                     :current-page.sync="page"
                     @current-change="onCurrentChange" />
      <!-- :current-page.sync="page"会绑定当前所在的页面
      需加.sync -->
      <!-- 列表分页 -->

    </el-card>

  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticle }
  from "../../api/article"

export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
        delivery: false,
        desc: ''
      },
      articles: [],//文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' },
      ],
      totalCount: 0,//总数据条数
      pageSize: 10,//每页大小
      status: null, //查询文章的状态，不传就是全部
      channels: [],//文章频道列表
      channelId: null,//查询文章的频道
      rangeDate: null,//筛选的范围日期
      loading: true,//加载状态
      page: 1,//默认页码

    }
  },
  created () {
    this.loadArticles(),
      this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      //展示加载中 loading
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,

        begin_pubdate: this.rangeDate ?
          this.rangeDate[0] : null,//开始日期
        end_pubdate: this.rangeDate ?
          this.rangeDate[1] : null,//截止日期 
      }).then(res => {
        const { results, total_count: totalCount }
          = res.data.data
        this.articles = results
        this.totalCount = totalCount

        //关闭加载loading状态
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      console.log(articleId.toString())
      this.$confirm('此操作将删除该数据, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          //删除成功,更新文章数据列表
          // this.loadArticles(页码)
          this.loadArticles(this.page)
          this.$message({
            type: 'info',
            message: '删除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      //找接口 

      //封装请求方法
      //删除请求调用
      //处理响应结果

    }
  }
}
</script>
<style lang="less" scoped>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>