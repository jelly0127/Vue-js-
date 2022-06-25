<template>
  <div class="aside-container">
  <h2>Beta版</h2>
  <!-- <div :class="isCollapse?'aside-logo aside-mini-logo': 'aside-logo'"></div> -->
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             background-color="#002033"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse="isCollapse"
             :collapse-transition="false"
             router>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/material">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-present"></i>
        <span slot="title">粉丝管理</span>
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
  background: url("./logo_admin.png") no-repeat center/70%;
}

.aside-mini-logo {
  width: 100%;
  background: url("./logo_admin_mini.png") no-repeat center;
  background-size: 36px;
}

.el-menu {
  border-right: none;
}
h2{
  color: #ffffff;
  text-align: center;
}
</style>
