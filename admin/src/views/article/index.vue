<template>
  <div class="artilce-container">
    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form"
               :model="form"
               label-width="50px"
               size="small">
        <el-form-item label="姓名">
          <el-input v-model="form.name"
                    style="width:120px"></el-input>
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
        <el-form-item>
          <!-- button按钮的click时间有个默认参数，
          当你没有指定参数时候，会默认传递一个没用的参数 -->
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单 -->
    </el-card>

    <el-card class="filter-card">
      <div slot="header"
           class="clearfix">
        根据筛选条件共查询到{{12}}条结果：
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
                size="mini"
                class="list-table"
                :data="tableData"
                style="width: 100%">
        <el-table-column prop="name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="project"
                         label="体测项目">
        </el-table-column>
        <el-table-column prop="data"
                         label="体测分析">
        </el-table-column>
        <el-table-column prop="date"
                         label="分析时间">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini"
                       type="primary"
                       circle
                       icon="el-icon-edit"></el-button>
            <el-button size="mini"
                       type="danger"
                       circle
                       icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 数据列表 -->

      <!-- 列表分页 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :page-size="pageSize"
                     :total="totalCount"
                     :current-page.sync="page" />
      <!-- :current-page.sync="page"会绑定当前所在的页面
      需加.sync -->
      <!-- 列表分页 -->

    </el-card>

  </div>
</template>

<script>

export default {
  name: 'ArticleIndex',
  data () {
    return {
      form: {
      },
      tableData: [{
        name: '王雷',
        project: '1000',
        data: '天气，温度高，人体水分消耗大原因导致1000米体测时间增加',
        date: '2016-05-02',
      }],
      totalCount: 0,//总数据条数
      pageSize: 10,//每页大小
      rangeDate: null,//筛选的范围日期
      page: 1,//默认页码

    }
  },
  created () {

  },
  methods: {


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