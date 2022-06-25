<template>
  <div class="data-container">
    <el-card class="">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据分析
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      数据可视化页面
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'dataIndex',
  data () {
    return {
    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>