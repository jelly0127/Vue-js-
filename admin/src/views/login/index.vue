<template>
  <div class="login-container">

    <!-- 配置form表单验证：
      1.必须给el-from组件绑定model为表单数据对象
      2.给需要验证的表单项 el-from 绑定prop属性
      注意：prop属性需要指定表单对象中的数据名称
      3.通过el-from组件的rules配置验证规则

      手动触发表单验证
      1.给el-from 设置ref   
      2.通过ref获取el-from组件，调用组件的validate进行验证
       -->

    <el-form class="login-form"
             ref="login-form"
             :model="user"
             :rules="formRules">

      <div class="login-head">
        <div class="logo">
          <h2>大学生体测数据分析系统</h2>
        </div>
      </div>

      <el-form-item prop="mobile">
        <el-input v-model="user.mobile"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input v-model="user.code"
                  placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"> 我已阅读并同意用户协议和隐私条款</el-checkbox>

      </el-form-item>
      <el-form-item>
        <el-button class="login-btn"
                   type="primary"
                   @click="onLogin"
                   :loading="LoginLoading"
                   :disabled="hide">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

import { login } from "../../api/user"
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',//手机号
        code: '246810',//验证码
        agree: false
      },
      LoginLoading: false,//登录的loading状态
      hide: false,//登录按钮禁用
      formRules: {//表单验证规则配置
        //要验证的数据名称
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          {
            //自定义校验规则
            //验证通过：callback()
            //验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          },
        ]
      }
    }
  },
  methods: {
    onLogin () {
      //获取表单数据（根据接口绑定数据）
      const user = this.user
      //表单验证
      this.$refs['login-form'].validate((valid) => {
        //如果表单验证失败，停止请求
        if (!valid) {
          return
        }
        //验证通过，请求登录
        this.login()
      })
    },
    login () {
      this.LoginLoading = true
      this.hide = true
      // if (this.user.mobile == 'admin' && this.user.code == 'admin') {
      // this.$message({
      // message: '登录成功',
      // type: 'success'
      // })
      // this.LoginLoading = false
      // this.hide = false
      // this.$router.push('/')
      // } else {
      // console.log('登录失败', err)
      // this.$message.error('登录失败，手机号或验证码错误')
      // this.LoginLoading = false
      // this.hide = false
      // } -->
      //1.接口可能需要重用
      //2.接口容易变动，盖起来麻烦
      //3.建议将所有请求封装成函数然后统一的组织到模块中进行
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.LoginLoading = false
        this.hide = false
        //将接口返回的用户相关数据放到本地存储,方便应用数据共享
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        console.log(res);
        //登录成功。跳转到首页
        this.$router.push('/')
        // this.$router.push({
        //   name: 'home'
        // })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
        this.LoginLoading = false
        this.hide = false
      })

    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
  .login-head {
    display: flex;
    justify-content: center;
    .logo {
      width: 280px;
      height: 57px;
      margin-bottom: 30px;

      background-size: contain;
    }
  }
  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
    .login-btn {
      width: 100%;
    }
  }
}
</style>

vue