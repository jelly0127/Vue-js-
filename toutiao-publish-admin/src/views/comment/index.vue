<template>
  <div class="comment-container">
    <el-card class="">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理

          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>

      <!-- 
  1.把数据列表绑定给表格的data
  2.设置表格列
  3.给表格列绑定要渲染的数据字段
  4.自定义表格  template
     -->
      <el-table class="table-list"
                :data="articles"
                style="width: 100%"
                stripe>
        <el-table-column prop="title"
                         label="标题">
        </el-table-column>
        <el-table-column prop="total_comment_count"
                         label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count"
                         label="粉丝评论数">
        </el-table-column>
        <el-table-column prop=""
                         label="评论状态">
          <template slot-scope="scope">
            {{scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column prop=""
                         label="操作">
          <template slot-scope="scope">

            <el-switch v-model="scope.row.comment_status"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       :disabled="scope.row.statusDisabled"
                       @change="onStatusChange(scope.row)">

            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 
  1.绑定页码
  2.绑定每页的大小
  current-page 控制激活的页码，初始肯定是第一页
  page-sizes 控制可选的每页大小
  page-size 控制每页显示个数
-->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="page"
                     :page-sizes="pageSizes"
                     :page-size.sync="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount" />
    </el-card>

  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from "../../api/article";
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [],//文章数据列表
      totalCount: 0,//总数据条数
      pageSize: 10,//每页展示条数
      pageSizes: [10, 15, 20, 50],//每页展示条数选择
      page: 1//当前激活的页码
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      //页码改变。加载指定页码数据
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      //让分页组件激活的代码和请求数据的页码保持一致
      this.page = page
      getArticles({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res);
        const { results } = res.data.data
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      //禁用开关
      article.statusDisabled = true
      //请求提交修改
      updateCommentStatus(article.id.toString(),
        article.comment_status).then(res => {
          //启用开关
          article.statusDisabled = false

          if (article.comment_status) {
            this.$message({
              type: 'success',
              message: '开启文章评论状态'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '关闭文章评论状态'
            })
          }
        })

    }

  }
}
</script>

<style lang="less" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>