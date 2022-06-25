<template>
  <div class="layout-container">
    <el-container class="layout-wrap">
      <el-aside class="layout-aside"
                width="auto">
        <app-aside />
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <AppHeader :userInfo="userInfo" />
        </el-header>
        <el-main class="layout-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from './components/header'
import AppAside from './components/aside'
import { userInfo } from '@/api/user'
import globalBus from '../../utils/global-bus'

export default {
  name: 'LayoutIndex',
  components: { AppAside, AppHeader },
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
    //注册自定义事件
    //当这个事件触发以后，这个注册函数就会被调用到
    globalBus.$on('update-user', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  mounted () { },
  methods: {
    getUserInfo () {
      userInfo().then(({ data: res }) => {
        this.userInfo = res.data
      }).catch(error => {
        console.log(error)
        this.$message.error('您还没有登录!')
        setTimeout(_ => {
          this.$router.push('/login')
        }, 2000)
      })
    }
  }
}
</script>

<style scoped lang="less">
/* scoped限制当前组件内的样式是否会影响其他组件的样式 */
.layout-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .layout-wrap {
    width: 100%;
    height: 100%;
  }
}
.layout-aside {
  background-color: #002033;
}
.layout-header,
.layout-main {
  background-color: #fff;
}

.layout-header {
  border-bottom: 1px solid #ddd;
}
</style>
