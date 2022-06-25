<template>
  <div class="header-container">
    <div class="layout-title">
      <i class="el-icon-s-operation"
         @click="showCollapse"></i>
      <span>大学生体测数据分析系统</span>
    </div>
    <div class="layout-user-info">

      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user-avatar"
               :src="userInfo.photo"
               onerror="this.src='https://avatars2.githubusercontent.com/u/54710109?s=460&u=bd598d72ed9b95c170620e9ecd668c709b5f8c59&v=4'"
               alt="user avatar" />
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-setting"></i>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">
            <i class="el-icon-unlock"></i>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {},
  props: ['userInfo'],
  data () {
    return {
      isCollapse: false,// aside是否折叠，true：折叠，false：展开

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
  },
  methods: {
    // 展开或折叠左侧菜单栏
    showCollapse () {
      this.isCollapse = !this.isCollapse
      // 利用事件总线实现兄弟组件传参
      this.$bus.$emit('handleChangeCollapse', this.isCollapse)
    },

    // 退出登录
    handleLogout () {
      /*
        注意：这个点击事件是在el-dropdown-item组件上绑定的，
        该组件默认不支持click，我们需要通过@click.native修饰符来解决
        1. 清除localStorage中的user_token数据
        2. 重定向到登录页面
      */
      this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
        this.$message({
          type: 'info',
          message: '退出成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }

  }
}
</script>

<style scoped lang="less">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: 0;
  background-color: #ffff;
  .layout-title {
    margin-left: 0;
    font-size: 24px;
    i {
      color: #002033;
      margin-right: 20px;
    }
  }
  .layout-user-info {
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
      transition: all 1s;
      &:hover {
        // 头像360翻转
        transform: rotate(360deg);
      }
    }

    .el-dropdown-link {
      display: flex;
      // justify-content: center;
      align-items: center;
    }
  }
  .el-icon-s-operation:hover {
    cursor: pointer;
  }
}
</style>
