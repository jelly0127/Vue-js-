<template>
  <div class="material-container">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ?
            '修改文章' : '数据上传'}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      <!-- 图片列表 -->
      <ImageList></ImageList>
      <!-- 图片列表 -->
    </el-card>
  </div>
</template>

<script>
import ImageList from "../image/components/image-list.vue"
export default {
  name: 'MaterialIndex',
  components: {
    ImageList
  }
}
</script>

<style lang="less" scoped>
</style>