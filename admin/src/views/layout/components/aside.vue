<template>
  <div class="aside-container">
    <div :class="isCollapse?'aside-logo aside-mini-logo': 'aside-logo'"></div>
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             background-color="#002033"
             text-color="#fff"
             active-text-color="#FFA500"
             :collapse="isCollapse"
             :collapse-transition="false"
             router>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">数据管理</span>
      </el-menu-item>
      <el-menu-item index="/material">
        <i class="el-icon-picture"></i>
        <span slot="title">数据上传</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-present"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布报告</span>
      </el-menu-item>

      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>

  </div>

</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: {},
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    this.$bus.$on('handleChangeCollapse', data => {
      this.isCollapse = data
    })
  },
  methods: {}
}
</script>

<style scoped lang="less">
.aside-logo {
  width: 200px;
  height: 60px;
  background: url("./数据分析.png") no-repeat center/28%;
}

.aside-mini-logo {
  width: 100%;
  background: url("./文化、体育和娱乐业.png") no-repeat center;
  background-size: 36px;
}

.el-menu {
  border-right: none;
}
</style>
